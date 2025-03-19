import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Products',
      items: ['Packiq', 'Terms and Conditions', 'Return Policy', 'Contact Us', 'Bulk Order']
    },
    {
      title: 'Industries',
      items: ['My Orders', 'Track Orders', 'My Profile']
    },
    {
      title: 'About Us',
      items: ['About Packiq', 'Terms and Conditions', 'Return Policy', 'FAQ', 'Blogs']
    },
    {
      title: 'My Account',
      items: ['My Orders', 'Track Orders', 'My Profile']
    }
  ];

  return (
    <footer className="w-full">
      {/* Top Section */}
      <div className="bg-[#F3F5F7] text-[#143761]">
        <div className="flex sm:flex-row max-sm:flex-col justify-between gap-10 lg:px-[100px] p-6 md:p-10 pb-10">
          {footerLinks.map((section, index) => (
            <div key={index} className="flex flex-col gap-6 w-full md:w-1/2 lg:w-auto">
              <h3 className="font-semibold text-lg md:text-xl">{section.title}</h3>
              <div className="flex flex-col gap-4 text-gray-700">
                {section.items.map((item, itemIndex) => (
                  <a 
                    key={itemIndex} 
                    href="#" 
                    className="hover:text-[#143761] transition-colors duration-200"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex max-sm:flex-col justify-between max-sm:gap-5 bg-[#F3F5F7] lg:px-[100px] py-5 p-6">
        <div className="flex items-center">
          <Image
            src="/productNavLogo.png"
            alt="Company Logo"
            height={52}
            width={87.5}
            className="h-auto w-auto"
          />
        </div>
        
        <span className="sm:hidden text-[#143761] text-sm">Copyright © 2024</span>
        
        <div className="flex max-sm:flex-col sm:items-center gap-6">
          <span className="max-sm:hidden text-[#143761] text-sm">
            Copyright © 2024 Packiq. All rights reserved.
          </span>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="hover:opacity-75 transition-opacity">
              <FaFacebookF color="#10101080" size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:opacity-75 transition-opacity">
              <FaInstagram color="#10101080" size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:opacity-75 transition-opacity">
              <FaLinkedinIn color="#10101080" size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:opacity-75 transition-opacity">
              <FaXTwitter color="#10101080" size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;