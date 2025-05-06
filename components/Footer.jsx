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
          icon: <FaFacebookF className="text-white text-sm" />
        },
        { 
          name: "Instagram", 
          href: "https://instagram.com", 
          icon: <FaInstagram className="text-white text-sm" />
        },
        { 
          name: "LinkedIn", 
          href: "https://linkedin.com", 
          icon: <FaLinkedinIn className="text-white text-sm" />
        },
        { 
          name: "Twitter", 
          href: "https://twitter.com", 
          icon: <FaXTwitter className="text-white text-sm" />
        },
      ],
    },
    {
      title: "Services",
      items: [
        { name: "Configure Packaging", href: "/profile" },
        { name: "Bulk Order", href: "/profile" },
        { name: "Custom Packaging", href: "/profile" },
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
    { icon: <IoLocationSharp className="text-[#143761]" size={20} />, text: "kolkata west bengal india" },
  ];

  return (
    <footer className="w-full">
      {/* Main Footer Section */}
      <div className="bg-[#F3F5F7] text-[#143761]">
        <div className="lg:px-[100px] px-6 md:px-10 py-12">
          {/* Logo and Contact Info */}
          <div className="flex flex-col md:flex-row gap-10 mb-10">
            <div className="w-full md:w-1/3">
              <div className="mb-6">
                <Image
                  src="/productNavLogo.png"
                  alt="PackIQ Logo"
                  height={60}
                  width={100}
                  className="h-auto w-auto"
                />
              </div>
              <p className="text-gray-700 mb-6">
                PackIQ provides innovative packaging solutions for businesses of all sizes. 
                From custom designs to eco-friendly materials, we have everything you need.
              </p>
              <div className="flex flex-col gap-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-gray-700">{item.text}</span>
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
                    <h3 className="font-semibold text-lg border-b border-gray-300 pb-2">
                      {section.title}
                    </h3>
                    <div className="flex flex-col gap-4 text-gray-700">
                      {section.items.map((item, itemIndex) => (
                        <a
                          key={itemIndex}
                          href={item.href || "#"}
                          className="hover:text-blue-700 transition-colors duration-200 flex items-center gap-2"
                        >
                          <span className="hover:translate-x-1 transition-transform duration-200">
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
          <div className="border-t border-gray-300 pt-8 mt-8">
            <h3 className="font-semibold text-lg mb-6">Connect With Us</h3>
            <div className="flex gap-4">
              {footerLinks[0].items.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  aria-label={item.name}
                  className="bg-[#143761] hover:bg-[#FF6B35] p-3 rounded-full transition-colors duration-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full text-center bg-[#E3E7EB] text-[#143761]">
        <div className=" py-5 px-6">
          <span className="text-sm text-center">
            Copyright © {new Date().getFullYear()} PackIQ. All rights reserved.
          </span>

        </div>
      </div>
    </footer>
  );
};

export default Footer;