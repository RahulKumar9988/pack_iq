import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

// Define the base URL with a fallback
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.yoursite.com";

export default function PackagingSolutions() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [packagingTypes, setPackagingTypes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    getPackagingTypes();
    getMaterials();
  }, []);

  // Fetch packaging types from the API
  const getPackagingTypes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/v1/resources/packaging-type`);
      if (response.ok) {
        const data = await response.json();
        const responseData = data.data.map((ele) => ({
          id: ele.packaging_id,
          icon: ele.packaging_image_icon_url,
          // description: ele.description,
          name: ele.name,
          time: "4-7 weeks",
          minimumQty: ele.minimum_qty,
          imageUrl: ele.packaging_image_url,
          quantity: ele.minimum_qty,
        }));
        setPackagingTypes(responseData);
      }
    } catch (error) {
      console.error("Error fetching packaging types:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch materials from the API
  const getMaterials = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/v1/resources/material`);
      if (response.ok) {
        const data = await response.json();
        if (data.status === 200) {
          const responseData = data.data.map((ele) => ({
            id: ele.material_id,
            imageUrl: ele.material_image_url || "/Material.png",
            name: ele.name,
            description: ele.description,
            price: "₹" + ele.price,
          }));
          setMaterials(responseData);
        }
      }
    } catch (error) {
      console.error("Error fetching materials:", error.message);
    }
  };

  // Handle navigation to detail pages
  const handleNavigate = (itemId, type) => {
    if (type === "packaging") {
      router.push(`/products/${itemId}`);
    } else {
      router.push(`/`);
    }
    setIsOpen(false);
  };

  // Fallback images in case the API data doesn't include images
  const fallbackPackagingImages = {
    "Stand-up pouch": "/packaging-images/standup-pouch.png",
    "Flat bottom pouch": "/packaging-images/flat-bottom-pouch.png",
    "Flat pouch": "/packaging-images/flat-pouch.png",
    "Flow pack": "/packaging-images/flow-pack.png",
    "Rollstock": "/packaging-images/rollstock.png",
  };

  const fallbackMaterialImages = {
    "Transparent Toni": "/material-images/transparent-toni.png",
    "Metallised Martha": "/material-images/metallised-martha.png",
    "Robust Robin": "/material-images/robust-robin.png",
    "Biobased Ben": "/material-images/biobased-ben.png",
  };

  // Generate placeholder packaging types when API data is not available
  const placeholderPackagingTypes = [
    { id: "standup", name: "Stand-up pouch", isNew: false },
    { id: "flatbottom", name: "Flat bottom pouch", isNew: false },
    { id: "flat", name: "Flat pouch", isNew: false },
    { id: "flowpack", name: "Flow pack", isNew: false },
    { id: "rollstock", name: "Rollstock", isNew: true },
  ];

  // Generate placeholder materials when API data is not available
  const placeholderMaterials = [
    { id: "toni", name: "Transparent Toni", isBestseller: false },
    { id: "martha", name: "Metallised Martha", isBestseller: true },
    { id: "robin", name: "Robust Robin", isBestseller: false },
    { id: "ben", name: "Biobased Ben", isBestseller: false },
  ];

  return (
    <div className="relative inline-block w-full">
      {/* Dropdown Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="flex items-center text-base font-medium text-gray-800 hover:text-gray-600 focus:outline-none"
      >
        <span>Packaging Solutions</span>
        <ChevronDown className="w-4 h-4 ml-1" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className=" absolute z-50 mt-2 w-screen max-w-2xl bg-white rounded-md shadow-lg overflow-hidden">
          <div className="flex">
            {/* Right Column - Preview */}
            <div className="w-1/2 bg-gray-50 p-4 flex items-center justify-center">
              {activeItem ? (
                <div className="text-center">
                  <div className="h-48 w-48 mx-auto mb-4 flex items-center justify-center">
                    <img
                      src={
                        activeItem.type === "packaging"
                          ? activeItem.item.imageUrl ||
                            fallbackPackagingImages[activeItem.item.name] ||
                            "/api/placeholder/200/200"
                          : activeItem.item.imageUrl ||
                            fallbackMaterialImages[activeItem.item.name] ||
                            "/api/placeholder/200/200"
                      }
                      alt={activeItem.item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">{activeItem.item.name}</h3>
                  {activeItem.item.description && (
                    <p className="text-sm text-gray-600 mt-1">{activeItem.item.description}</p>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <div className="h-48 w-48 mx-auto mb-4 flex items-center justify-center">
                    <img
                      src="/api/placeholder/200/200"
                      alt="Hover over options to preview"
                      className="max-h-full max-w-full object-contain opacity-50"
                    />
                  </div>
                  <p className="text-gray-500">Hover over options to preview</p>
                </div>
              )}
            </div>

            {/* Left Column - Menu Items */}
            <div className="w-full py-2 flex border-r border-gray-200">
              <div className="flex  flex-col h-full w-full border-r border-gray-200">
                <div className="px-4 py-3 w-full border-b border-gray-200">
                  <h3 className="font-semibold text-lg text-gray-800">Packaging Shapes</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {packagingTypes.length > 0
                    ? packagingTypes.map((item) => (
                        <div
                          key={item.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                          onMouseEnter={() => setActiveItem({ type: "packaging", item })}
                          onClick={() => handleNavigate(item.id, "packaging")}
                        >
                          <span>{item.name}</span>
                          {item.name.toLowerCase().includes("rollstock") && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              New
                            </span>
                          )}
                        </div>
                      ))
                    : placeholderPackagingTypes.map((item) => (
                        <div
                          key={item.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                          onMouseEnter={() =>
                            setActiveItem({
                              type: "packaging",
                              item: {
                                name: item.name,
                                imageUrl: fallbackPackagingImages[item.name],
                              },
                            })
                          }
                          onClick={() => router.push(`/packaging-solutions/${item.id}`)}
                        >
                          <span>{item.name}</span>
                          {item.isNew && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              New
                            </span>
                          )}
                        </div>
                      ))}
                </div>
              </div>

              <div className="flex flex-col h-full w-full border-l border-gray-200">
                <div className="px-4 py-3 border-b border-t border-gray-200">
                  <h3 className="font-semibold text-lg text-gray-800">Material</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {materials.length > 0
                    ? materials.map((item) => (
                        <div
                          key={item.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                          onMouseEnter={() => setActiveItem({ type: "material", item })}
                          onClick={() => handleNavigate(item.id, "material")}
                        >
                          <span>{item.name}</span>
                          {item.name === "Metallised Martha" && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              Bestseller
                            </span>
                          )}
                        </div>
                      ))
                    : placeholderMaterials.map((item) => (
                        <div
                          key={item.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                          onMouseEnter={() =>
                            setActiveItem({
                              type: "material",
                              item: {
                                name: item.name,
                                imageUrl: fallbackMaterialImages[item.name],
                                // description: item.name.split(" ")[1],
                              },
                            })
                          }
                          
                        >
                          <span>{item.name}</span>
                          {item.isBestseller && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              Bestseller
                            </span>
                          )}
                        </div>
                      ))}
                </div>
              </div>
            </div>

            
          </div>
        </div>
      )}
    </div>
  );
}