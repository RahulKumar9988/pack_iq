"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import ProductSkeleton from "@/components/ProductSkeleton";
import Recomended_product from "@/components/Recomended_product";
import { useDispatch } from "react-redux"; // Import useDispatch
import { addToCart } from "@/redux/features/cart/cartSlice"; // Import your addToCart action

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch(); // Initialize dispatch
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  // Form states
  const [materials, setMaterials] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [addons, setAddons] = useState([]);
  
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [selectedAddon, setSelectedAddon] = useState("");
  const [selectedSizeId, setSelectedSizeId] = useState("");

  useEffect(() => {
    if (params.id) getProductDetails();
  }, [params.id]);

  // When size is selected, fetch quantities
  useEffect(() => {
    if (selectedSize && product) {
      fetchQuantities(selectedSizeId);
    }
  }, [selectedSize, selectedSizeId, product]);

  async function getProductDetails() {
    setLoading(true);
    try {
      // Get the product data
      const response = await axios.get(`${baseUrl}/api/v1/resources/packaging-type`);
      if (response.status === 200) {
        const productData = response.data.data.find(
          item => item.packaging_id.toString() === params.id
        );
        
        if (productData) {
          setProduct({
            ...productData,
            thumbnails: [
              productData.packaging_image_url,
              productData.packaging_image_icon_url || productData.packaging_image_url,
              productData.packaging_image_url,
            ]
          });
          
          // Once we have the product data, fetch all related options
          await fetchFormOptions(productData.packaging_id);
        } else {
          // Handle case where product is not found
          console.error("Product not found");
        }
      }
    } catch (error) {
      console.error("Product fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchFormOptions(packagingId) {
    try {
      // Fetch materials and sizes in parallel
      const [materialsRes, sizesRes, addonsRes] = await Promise.all([
        axios.get(`${baseUrl}/api/v1/resources/material`),
        axios.get(`${baseUrl}/api/v1/resources/list-packaging-type-size/${packagingId}`),
        axios.get(`${baseUrl}/api/v1/resources/list-additions/${packagingId}`),
      ]);

      setMaterials(materialsRes.data?.data || []);
      setSizes(sizesRes.data?.data || []);
      setAddons(addonsRes.data?.data || []);

    } catch (error) {
      console.error("Form options error:", error);
    }
  }

  async function fetchQuantities(sizeId) {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/resources/list-packaging-type-size-quantity/${selectedSizeId}`
      );
      
      if (response.status === 200) {
        const quantitiesData = response.data.data.map(item => ({
          quantity_id: item.quantityId.quantity_id,
          quantity: item.quantityId.quantity,
          price: item.quantityId.price,
          design_number: item.quantityId.design_number
        }));
        setQuantities(quantitiesData);
      }
    } catch (error) {
      console.error("Quantities fetch error:", error);
    }
  }
  
  // In the handleSizeChange function
  const handleSizeChange = (e) => {
    const sizeValue = e.target.value;
    setSelectedSize(sizeValue);
    
    // Find the corresponding size object
    const sizeObj = sizes.find(s => 
      s.size_id?.toString() === sizeValue || 
      s.sizeId?.size_id?.toString() === sizeValue
    );
  
    if (sizeObj) {
      // Extract packaging_type_size_id from nested structure
      const packagingTypeSizeId = sizeObj.packaging_type_size_id || sizeObj.sizeId?.packaging_type_size_id;
      if (packagingTypeSizeId) {
        setSelectedSizeId(packagingTypeSizeId);
      }
    }
    
    setSelectedQuantity("");
  };

  const handleAddToCart = () => {
    if (!product) return;

    // Find the selected items from their respective arrays
    const selectedMaterialItem = materials.find(m => m.material_id.toString() === selectedMaterial);
    const selectedSizeItem = sizes.find(s => (s.size_id || s.sizeId?.size_id).toString() === selectedSize);
    const selectedQuantityItem = quantities.find(q => q.quantity_id.toString() === selectedQuantity);
    const selectedAddonItem = addons.find(a => a.additions_id.toString() === selectedAddon);
    
    // Get proper price from selected quantity
    const price = selectedQuantityItem?.price || product.price;
    
    // Create proper addon object format as expected by Cart component
    let addonFormatted = null;
    if (selectedAddonItem) {
      addonFormatted = {
        id: selectedAddonItem.additions_id,
        name: selectedAddonItem.additions_title,
        price: selectedAddonItem.additions_price || 0
      };
    }

    const cartItem = {
      packaging_id: product.packaging_id,
      name: product.name,
      image: product.packaging_image_url,
      material: selectedMaterialItem?.name || "",
      material_id: selectedMaterial,
      size: selectedSizeItem?.name || selectedSizeItem?.sizeId?.name || "",
      size_id: selectedSize,
      packaging_type_size_id: selectedSizeId,
      quantity: selectedQuantityItem?.quantity || "",
      quantity_id: selectedQuantity,
      packaging_type_size_quantity_id: selectedQuantity,
      price: price,
      design_number: selectedQuantityItem?.design_number,
      // Format addons correctly for cart component
      addons: selectedAddonItem ? [addonFormatted] : []
    };

    // Dispatch to Redux store
    dispatch(addToCart(cartItem));
    
    // Also save to localStorage as backup
    localStorage.setItem("lastOrder", JSON.stringify(cartItem));
    
    // Navigate to cart page
    router.push("/cart");
  };

  // Add to cart button is disabled if required fields are not selected
  const isAddToCartDisabled = !selectedMaterial || !selectedSize || !selectedQuantity;

  if (loading) return <ProductSkeleton />;
  if (!product) return <div className="w-full text-center py-12 text-lg">Product Not Found</div>;

  return (
    <div className="w-full bg-white max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Image Gallery */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-row sm:flex-col md:flex-col gap-2 sm:gap-3 order-2 sm:order-1">
            {product.thumbnails.map((thumbnail, index) => (
              <div 
                key={index} 
                className={`min-w-16 w-16 h-26 sm:w-20 sm:h-30 border cursor-pointer ${selectedImage === index ? 'border-blue-500' : 'border-gray-200'}`}
                onClick={() => setSelectedImage(index)}
              >
                <Image 
                  src={thumbnail} 
                  alt={`Thumbnail ${index + 1}`} 
                  width={70}
                  height={80}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
          <div className="relative w-full h-96 order-1 sm:order-2">
            <Image 
              src={product.thumbnails[selectedImage]} 
              alt={product.name} 
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Product Form */}
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          
          <div className="space-y-4">
            {/* Material Select */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">Select Material</label>
              <select
                className="p-2 border rounded-md"
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
              >
                <option value="">Choose material</option>
                {materials.map((material) => (
                  <option key={material.material_id} value={material.material_id}>
                    {material.name} (₹{material.price})
                  </option>
                ))}
              </select>
            </div>

            {/* Size Select */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">Choose Size</label>
              <select
                className="p-2 border rounded-md"
                value={selectedSize}
                onChange={handleSizeChange}
              >
                <option value="">Select size</option>
                {sizes.map((size) => (
                  <option key={size.size_id || size.sizeId?.size_id} value={size.size_id || size.sizeId?.size_id}>
                    {size.name || size.sizeId?.name}
                  </option>
                ))}
              </select>
              {selectedSize && (
                <p className="text-sm text-gray-500">
                  {sizes.find(s => s.size_id?.toString() === selectedSize || s.sizeId?.size_id?.toString() === selectedSize)?.dimensions || 
                  sizes.find(s => s.size_id?.toString() === selectedSize || s.sizeId?.size_id?.toString() === selectedSize)?.sizeId?.dimensions}
                </p>
              )}
            </div>

            {/* Quantity Select */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">Set Quantity</label>
              <select
                className="p-2 border rounded-md"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(e.target.value)}
                disabled={!selectedSize}
              >
                <option value="">Select quantity</option>
                {quantities.map((qty) => (
                  <option key={qty.quantity_id} value={qty.quantity_id}>
                    {qty.quantity} units - ₹{Number(qty.price).toFixed(2)}
                    {qty.design_number && ` (${qty.design_number} designs included)`}
                  </option>
                ))}
              </select>
              {!selectedSize && quantities.length === 0 && (
                <p className="text-sm text-gray-500">Please select a size first</p>
              )}
            </div>

            {/* Addons Select */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">Add-Ons (optional)</label>
              <select
                className="p-2 border rounded-md"
                value={selectedAddon}
                onChange={(e) => setSelectedAddon(e.target.value)}
              >
                <option value="">Select add-on</option>
                {addons.map((addon) => (
                  <option key={addon.additions_id} value={addon.additions_id}>
                    {addon.additions_title} {addon.additions_price && `(+₹${addon.additions_price})`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button
            className={`w-full py-4 font-medium text-lg ${isAddToCartDisabled 
              ? "bg-gray-300 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            onClick={handleAddToCart}
            disabled={isAddToCartDisabled}
          >
            Add to Cart
          </Button>

          <div className="mt-4 space-y-2 p-4 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold">Price Summary</p>
            <p className="text-gray-600">Base Price: {product.price}</p>
            <p className="text-gray-600">Production Time: {product.delivery_time}</p>
            <p className="text-gray-600">Minimum Quantity: {product.minimum_qty}</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-bold text-[#143761] mb-6">Recommended Products</h2>
        <Recomended_product />
      </div>
    </div>
  );
}