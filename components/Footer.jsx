"use client";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { useCallback, useEffect, useState } from "react";

const Footer = () => {
  const router = useRouter();
  const [packagingTypes, setPackagingTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "your-api-base-url";

  // Define the desired order for products
  const productOrder = [
    "Standup Pouch",
    "Three Side Seal Pouch", 
    "Center Seal Pouch",
    "Flat Bottom Pouch",
    "Center Seal Side Gusset"
  ];

  // Function to sort products according to the specified order
  const sortProductsByOrder = (products) => {
    return products.sort((a, b) => {
      const indexA = productOrder.findIndex(orderItem => 
        a.name.toLowerCase().includes(orderItem.toLowerCase()) ||
        orderItem.toLowerCase().includes(a.name.toLowerCase())
      );
      const indexB = productOrder.findIndex(orderItem => 
        b.name.toLowerCase().includes(orderItem.toLowerCase()) ||
        orderItem.toLowerCase().includes(b.name.toLowerCase())
      );
      
      // If both items are in the order array, sort by their position
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      // If only one item is in the order array, prioritize it
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      // If neither is in the order array, sort alphabetically
      return a.name.localeCompare(b.name);
    });
  };

  const getPackagingTypes = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/resources/packaging-type`
      );
      if (response.status === 200) {
        const responseData = response.data.data.map((ele) => ({
          id: ele.packaging_id,
          name: ele.name,
          icon: ele.packaging_image_icon_url,
          imageUrl: ele.packaging_image_url,
          minimumQty: ele.minimum_qty,
          isNew: false,
          time: "4-7 weeks",
          quantity: ele.minimum_qty
        }));
        
        // Sort the products according to the specified order
        const sortedProducts = sortProductsByOrder(responseData);
        setPackagingTypes(sortedProducts);
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl]);

   useEffect(() => {
    getPackagingTypes();
  }, [getPackagingTypes]);

  const handleNavigate = (itemId, type) => {
    console.log(`Navigating to ${type} with ID: ${itemId}`);
    router.push(`/products/${itemId}`);
  };

  const footerLinks = [
    {
      title: "Social Media",
      items: [
        { 
          name: "Facebook", 
          href: "https://facebook.com", 
          icon: <FaFacebookF className="text-white group-hover:scale-110 transition-transform duration-300" />
        },
        { 
          name: "Instagram", 
          href: "https://instagram.com", 
          icon: <FaInstagram className="text-white group-hover:scale-110 transition-transform duration-300" />
        },
        { 
          name: "LinkedIn", 
          href: "https://linkedin.com", 
          icon: <FaLinkedinIn className="text-white group-hover:scale-110 transition-transform duration-300" />
        },
        { 
          name: "Twitter", 
          href: "https://twitter.com", 
          icon: <FaXTwitter className="text-white group-hover:scale-110 transition-transform duration-300" />
        },
      ],
    },
    {
      title: "Products",
      items: packagingTypes.slice(0, 6).map(product => ({
        name: product.name,
        href: `/products/${product.id}`,
        onClick: () => handleNavigate(product.id, 'product')
      })),
    },
    {
      title: "Services",
      items: [
        { name: "Configure Packaging", href: "/packaging-type" },
        { name: "Bulk Order", href: "/contact" },
         { name: "Design Services", href: "/design-help" },
        { name: "Template & Artwork Specifications", href: "/" },
       
      ],
    },
    {
      title: "Account & Support",
      items: [
        { name: "My Account", href: "/profile" },
        { name: "My Orders", href: "/profile" },
        { name: "Track Orders", href: "/profile" },
        { name: "Blogs", href: "/blog" },
        { name: "About Us", href: "/about-us" },
        { name: "FAQ", href: "/faq" },
        { name: "Contact Us", href: "/contact" },
        { name: "Terms and Conditions", href: "/terms" },
       
      ],
    },
    
  ];

  const contactInfo = [
    { icon: <MdEmail className="text-[#143761]" size={20} />, text: "Support@packiq.co.in"},
    { icon: <FaPhoneAlt className="text-[#143761]" size={18} />, text: "+91 9007778338/ +91 6289043085" },
    { icon: <IoLocationSharp className="text-[#143761]" size={20} />, text: "50A, Girish Mukurjee Road, Kolkata, India - 700025" },
  ];

  return (
    <footer className="w-full">
      {/* Top Accent Bar */}
      
      
      {/* Main Footer Section */}
      <div className="bg-[#1d274e] text-white">
        <div className="lg:px-24 px-6 md:px-10 py-16">
          {/* Logo and Contact Info */}
          <div className="flex flex-col md:flex-row gap-16 mb-12">
            <div className="w-full md:w-1/3">
              <div className="mb-6 transform transition-transform duration-300">
                <Image
                  src="/pack/white_logo.png"
                  alt="PackIQ Logo"
                  height={120}
                  width={120}
                  className="h-auto w-auto"
                />
              </div>
              <p className="text-white mb-8 leading-relaxed">
                PackIQ provides innovative packaging solutions for businesses of all sizes. 
                From custom designs to eco-friendly materials, we have everything you need 
                to make your products stand out.
              </p>
              <div className="flex flex-col gap-5">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 group hover:translate-x-1 transition-all duration-300 cursor-pointer">
                    <div className="p-2 bg-white rounded-full shadow-md group-hover:shadow-lg group-hover:bg-[#F3F5F7] transition-all duration-300">
                      {item.icon}
                    </div>
                    <span className="text-white font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {footerLinks.map((section, index) => {
                // Skip Social Media for now as we'll handle it differently
                if (section.title === "Social Media") return null;
                
                return (
                  <div key={index} className="flex flex-col gap-6">
                    <h3 className="font-bold text-lg border-b-2 border-[#143761] pb-2 inline-block">
                      {section.title}
                    </h3>
                    <div className="flex flex-col gap-4 text-white">
                      {section.items.map((item, itemIndex) => (
                        <a
                          key={itemIndex}
                          href={item.href || "#"}
                          className="hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                        >
                          <span className="w-0 h-0.5 bg-white group-hover:w-3 transition-all duration-300"></span>
                          <span className="group-hover:translate-x-1 transition-transform duration-200">
                            {item.name}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          

          {/* Social Media Section */}
          <div className="border-t border-gray-300 pt-10 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <h3 className="font-bold text-lg">Connect With Us</h3>
              <div className="flex gap-4">
                {footerLinks[0].items.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    aria-label={item.name}
                    className="bg-[#143761] hover:bg-[#143761] p-3 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300 group"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full text-center bg-[#1d274e] text-white border-t-1 border-black">
        <div className="py-6 px-6 flex flex-col md:flex-row justify-center items-center">
          <span className="text-sm">
            Copyright © {new Date().getFullYear()} PackIQ. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;