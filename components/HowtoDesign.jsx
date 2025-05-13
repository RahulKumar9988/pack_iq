"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { useRouter } from "next/navigation";

function HowtoDesign() {
  const router = useRouter();
  const data = [
    {
      title: "CHOOSE YOUR PRODUCT",
      content: (
        <div>
          <p className="mb-8 text-sm font-normal text-neutral-800 md:text-2xl dark:text-neutral-200">
            Choose between two different styles of pouches or rollstock film—there is an option for everyone!
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/api/placeholder/500/500"
              alt="Product option 1"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/api/placeholder/500/500"
              alt="Product option 2"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/api/placeholder/500/500"
              alt="Product option 3"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/api/placeholder/500/500"
              alt="Product option 4"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "CREATE YOUR PRINT DESIGN",
      content: (
        <div>
          <div className="mb-6 text-sm md:text-lg">
            <ul className="list-disc pl-5 space-y-2">
              <li>12 stand-up pouch sizes</li>
              <li>8 lay-flat standard pouch sizes</li>
              <li>3 film materials</li>
              <li>2 surface finishes</li>
              <li>Push-to-close zipper</li>
              <li>Hang hole (2 styles)</li>
              <li>Tear notches</li>
              <li>Production lead time (5 business days but can be expedited to as little as 1 business day)</li>
              <li>No minimum order quantity</li>
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/api/placeholder/500/500"
              alt="Design template 1"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/api/placeholder/500/500"
              alt="Design template 2"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/api/placeholder/500/500"
              alt="Design template 3"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/api/placeholder/500/500"
              alt="Design template 4"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "UPLOAD YOUR FILES",
      content: (
        <div>
          <div className="mb-6 text-sm md:text-lg">
            <p className="mb-4">
              Upload the high resolution PDF file(s) and we all print it using our HP Indigo press—you all love the quality digital printing can achieve.
            </p>
            <p className="mb-4">
              If you are ordering multiple print designs (often called SKUs), we can produce them together in one order. Upload each PDF to create multiple line items in your cart.
            </p>
            <p className="mb-4">
              If each SKU has the same specifications (size, material, finish, zipper, hang hole, and tear notches) a multi-SKU discount will be applied to your shopping cart.
            </p>
            <p className="font-bold mb-4">
              PLEASE NOTE: To be processed as multiple SKUs, all items must have identical pouch specifications. Quantities by SKU can vary. Different sizes or specs must be ordered separately.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/api/placeholder/500/500"
              alt="File upload example 1"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/api/placeholder/500/500"
              alt="File upload example 2"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/api/placeholder/500/500"
              alt="File upload example 3"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/api/placeholder/500/500"
              alt="File upload example 4"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "COMPLETE YOUR ORDER",
      content: (
        <div>
          <div className="mb-6 text-sm md:text-lg">
            <p className="mb-4">
              Review your cart to confirm your selections, and enter your billing and shipping information.
            </p>
            <p className="mb-4">
              We include FedEx Ground shipping with every order! This typically takes 2-5 days to arrive from our facility near Minneapolis, MN. Need your order faster? Upgrade to FedEx Express Saver, 2-Day, or Overnight!
            </p>
            <p className="mb-4">
              Finally, enter your payment information. We accept Visa, Mastercard, American Express, Discover, E-check, or ACH payments.
            </p>
          </div>
         
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/api/placeholder/500/500"
              alt="Checkout process 1"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/api/placeholder/500/500"
              alt="Checkout process 2"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/api/placeholder/500/500"
              alt="Checkout process 3"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/api/placeholder/500/500"
              alt="Checkout process 4"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "WHAT HAPPENS NEXT?",
      content: (
        <div>
          <div className="mb-6 text-sm md:text-lg">
            <p className="mb-4">
              You all immediately receive an initial order confirmation, so you can be confident your order was properly submitted.
            </p>
            <p className="mb-4">
              Then your artwork will make its way through our pre-press software to check your file to make sure it will be able to be printed.
            </p>
            <p className="font-bold mb-4">
              PLEASE NOTE: We do not proofread for errors or omissions, or test barcodes, QR Codes, or web links.
            </p>
            <p className="mb-4">
              Shortly after you will receive an Order summary email — THIS IS YOUR PROOF(S) to approve or decline. (If you do nothing your order will be moved into production in 12 hours) Or, you will receive a message letting you know if there is a problem with your files. Either way we will contact you.
            </p>
            <p className="font-bold mb-4">
              PLEASE NOTE: Declining your order summary, making changes to artwork or specifications may postpone your ship date. Changes to artwork or specifications after production begins may incur additional charges.
            </p>
            <p className="mb-4">
              Your order will ship by the date on your summary and you all receive a confirmation with tracking information.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/api/placeholder/500/500"
              alt="Order process 1"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/api/placeholder/500/500"
              alt="Order process 2"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/api/placeholder/500/500"
              alt="Order process 3"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/api/placeholder/500/500"
              alt="Order process 4"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
      <h1 className="md:text-4xl text-xl font-bold text-center">SO GET STARTED!</h1>
      <div className="flex flex-col items-center justify-center">
        <button 
          onClick={() => router.push('/products')} 
          className="bg-blue-900 text-white px-2 md:px-10 py-2 rounded-3xl mt-4 hover:bg-blue-700 transition duration-300 mb-5"
        >   
          Order Now
        </button>
      </div>
    </div>
  );
}

export default HowtoDesign;