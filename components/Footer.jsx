import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const Footer = () => {
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
      title: "Services",
      items: [
        { name: "Configure Packaging", href: "/packaging-type" },
        { name: "Bulk Order", href: "/profile" },
        { name: "Custom Packaging", href: "/products" },
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
    {
      title: "Resources",
      items: [
        { name: "Template & Artwork Specifications", href: "/" },
        { name: "Design Services", href: "/" },
      ],
    },
  ];

  const contactInfo = [
    { icon: <MdEmail className="text-[#143761]" size={20} />, text: "support@packiq.com" },
    { icon: <FaPhoneAlt className="text-[#143761]" size={18} />, text: "+91 1234567890" },
    { icon: <IoLocationSharp className="text-[#143761]" size={20} />, text: "Kolkata, West Bengal, India" },
  ];

  return (
    <footer className="w-full">
      {/* Top Accent Bar */}
      <div className="h-2 bg-gradient-to-r from-[#143761] to-[#143761]"></div>
      
      {/* Main Footer Section */}
      <div className="bg-gradient-to-b from-[#ffffff] to-[#72b2ff3f] text-[#143761]">
        <div className="lg:px-24 px-6 md:px-10 py-16">
          {/* Logo and Contact Info */}
          <div className="flex flex-col md:flex-row gap-16 mb-12">
            <div className="w-full md:w-1/3">
              <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/productNavLogo.png"
                  alt="PackIQ Logo"
                  height={60}
                  width={100}
                  className="h-auto w-auto"
                />
              </div>
              <p className="text-gray-700 mb-8 leading-relaxed">
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
                    <span className="text-gray-700 font-medium">{item.text}</span>
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
                    <div className="flex flex-col gap-4 text-gray-700">
                      {section.items.map((item, itemIndex) => (
                        <a
                          key={itemIndex}
                          href={item.href || "#"}
                          className="hover:text-[#143761] transition-colors duration-200 flex items-center gap-2 group"
                        >
                          <span className="w-0 h-0.5 bg-[#143761] group-hover:w-3 transition-all duration-300"></span>
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
      <div className="w-full text-center bg-[#3590ff3f] text-black border-t-1 border-black">
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