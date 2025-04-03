"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ChevronDown, ChevronUp, Check, Loader2, AlertTriangle } from 'lucide-react';
import { 
  setFilter, 
  clearFilter, 
  clearAllFilters 
} from '@/redux/features/filter/productFilterSlice';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const DEFAULT_IMAGE = '/default-image.png';

const FilterSidebar = ({ cartItem }) => {
  const dispatch = useDispatch();
  const [materials, setMaterials] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [packagingTypes, setPackagingTypes] = useState([]);
  
  const [loading, setLoading] = useState({
    materials: false,
    sizes: false,
    quantities: false,
    packagingTypes: false
  });
  const [error, setError] = useState({
    materials: null,
    sizes: null,
    quantities: null,
    packagingTypes: null
  });

  const [openFilter, setOpenFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    'Packaging Form': null,
    'Material': null,
    'Size': null,
    'Quantity': null
  });

  // Fetch Materials
  const fetchMaterials = async () => {
    setLoading(prev => ({ ...prev, materials: true }));
    try {
      const response = await axios.get(`${baseUrl}/api/v1/resources/material`);
      if (response.data.status === 200) {
        const responseData = response.data.data.map((ele) => ({
          name: ele.name,
          material_id: ele.material_id,
          image: ele.material_image_url || "/Material.png",
        }));
        setMaterials(responseData);
      }
    } catch (err) {
      setError(prev => ({ ...prev, materials: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, materials: false }));
    }
  };

  // Fetch Sizes (based on packaging type)
  const fetchSizes = async (packagingId) => {
    // Reset sizes and clear previous errors
    setSizes([]);
    setError(prev => ({ ...prev, sizes: null }));
    setLoading(prev => ({ ...prev, sizes: true }));

    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/resources/list-packaging-type-size/${packagingId}`
      );
      
      console.log('Sizes Response:', response.data); // Debug log

      if (response.data.status === 200 && response.data.data && response.data.data.length > 0) {
        const responseData = response.data.data.map((ele) => ({
          size: ele.sizeId?.name || ele.name,
          dimension: ele.sizeId?.dimensions || '',
          image: ele.sizeId?.size_image_link || DEFAULT_IMAGE,
          size_id: ele.sizeId?.size_id || ele.size_id,
        }));
        setSizes(responseData);
      } else {
        // Explicitly set an empty array and show a specific error
        setSizes([]);
        setError(prev => ({ 
          ...prev, 
          sizes: 'No size options available for the selected packaging type' 
        }));
      }
    } catch (err) {
      console.error('Error fetching sizes:', err);
      setError(prev => ({ 
        ...prev, 
        sizes: err.response?.data?.message || err.message || 'Failed to fetch sizes' 
      }));
    } finally {
      setLoading(prev => ({ ...prev, sizes: false }));
    }
  };

  // Fetch Quantities (based on packaging type and size)
  const fetchQuantities = async (packagingTypeSizeId) => {
    setLoading(prev => ({ ...prev, quantities: true }));
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/resources/list-packaging-type-size-quantity/${packagingId}`
      );
      if (response.data.status === 200) {
        const responseData = response.data.data.map((ele) => ({
          quantity: ele.quantityId.quantity,
          price: ele.quantityId.price,
          quantity_id: ele.quantityId.quantity_id,
        }));
        setQuantities(responseData);
      }
      console.log(response.data);
      
    } catch (err) {
      setError(prev => ({ ...prev, quantities: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, quantities: false }));
    }
  };

  // Fetch Packaging Types
  const fetchPackagingTypes = async () => {
    setLoading(prev => ({ ...prev, packagingTypes: true }));
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/resources/packaging-type`
      );
      if (response.data.status === 200) {
        const responseData = response.data.data.map((ele) => ({
          packaging_id: ele.packaging_id,
          name: ele.name,
          icon: ele.packaging_image_icon_url,
          description: ele.description,
        }));
        setPackagingTypes(responseData);
      }
    } catch (err) {
      setError(prev => ({ ...prev, packagingTypes: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, packagingTypes: false }));
    }
  };

  // Fetch initial data
  useEffect(() => {
    fetchPackagingTypes();
    fetchMaterials();
  }, []);

  // Conditional fetching of sizes
  useEffect(() => {
    // Reset sizes when packaging type changes
    if (cartItem?.packaging_id) {
      fetchSizes(cartItem.packaging_id);
    }
  }, [cartItem?.packaging_id]);

  // Toggle filter dropdown
  const toggleFilter = (filterName) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  // Handle filter selection
  const handleFilterSelection = (filterName, option) => {
    // Normalize filter name to match Redux slice
    const filterTypeMap = {
      'Packaging Form': 'packagingForm',
      'Material': 'material',
      'Size': 'size',
      'Quantity': 'quantity'
    };

    const normalizedFilterType = filterTypeMap[filterName];

    // Toggle filter selection
    const newSelectedValue = selectedFilters[filterName] === option ? null : option;
    
    // Update local state
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: newSelectedValue
    }));

    // Dispatch to Redux
    if (newSelectedValue) {
      dispatch(setFilter({ 
        filterType: normalizedFilterType, 
        value: newSelectedValue 
      }));
    } else {
      dispatch(clearFilter({ filterType: normalizedFilterType }));
    }
  };

  // Clear all selected filters
  const clearAllSelectedFilters = () => {
    // Reset local state
    setSelectedFilters({
      'Packaging Form': null,
      'Material': null,
      'Size': null,
      'Quantity': null
    });

    // Reset open filter
    setOpenFilter(null);

    // Dispatch clear all filters action to Redux
    dispatch(clearAllFilters());
  };

  // Render filter section
  const renderFilterSection = (name, items, loading, error) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="animate-spin text-gray-500" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center text-red-500 py-4">
          <AlertTriangle className="mr-2" />
          <span>{error}</span>
        </div>
      );
    }

    // Check if no items are available
    if (!items || items.length === 0) {
      return (
        <div className="flex items-center text-yellow-600 py-4">
          <AlertTriangle className="mr-2" />
          <span>No {name.toLowerCase()} options available</span>
        </div>
      );
    }

    return (
      <div className="mt-2 space-y-2">
        {items.map((item) => (
          <div 
            key={item.name || item.size || item.packaging_id}
            onClick={() => handleFilterSelection(name, item.name || item.size || item.quantity)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div 
              className={`w-5 h-5 border rounded 
                ${selectedFilters[name] === (item.name || item.size || item.quantity)
                  ? 'bg-blue-500 border-blue-500' 
                  : 'border-gray-300'}`}
            >
              {selectedFilters[name] === (item.name || item.size || item.quantity) && (
                <Check className="text-white w-4 h-4" />
              )}
            </div>
            <span className="text-gray-700">{item.name || item.size || item.quantity}</span>
          </div>
        ))}
      </div>
    );
  };

  // Filter sections configuration
  const filterSections = [
    { 
      name: 'Packaging Form', 
      items: packagingTypes, 
      loading: loading.packagingTypes, 
      error: error.packagingTypes 
    },
    { 
      name: 'Material', 
      items: materials, 
      loading: loading.materials, 
      error: error.materials 
    },
    { 
      name: 'Size', 
      items: sizes, 
      loading: loading.sizes, 
      error: error.sizes 
    },
    { 
      name: 'Quantity', 
      items: quantities, 
      loading: loading.quantities, 
      error: error.quantities 
    }
  ];

  return (
    <div className="w-full bg-white shadow rounded-lg p-4 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        <button 
          onClick={clearAllSelectedFilters}
          className="text-sm text-blue-600 hover:underline"
        >
          Clear All
        </button>
      </div>
      
      {filterSections.map((section) => (
        <div key={section.name} className="mb-4">
          <div 
            onClick={() => toggleFilter(section.name)}
            className="flex justify-between items-center cursor-pointer"
          >
            <p className="font-medium text-gray-700">{section.name}</p>
            {openFilter === section.name ? <ChevronUp /> : <ChevronDown />}
          </div>

          {openFilter === section.name && (
            renderFilterSection(
              section.name, 
              section.items, 
              section.loading, 
              section.error
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;