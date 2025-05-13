// import React from 'react'
// import RecommendedProducts from './Recomended_product'
// import { Button } from './ui/button'

// function HowtoDesign() {
//   return (
//     <div className='w-full px-4 md:px-8 lg:px-36'>
//       {/* Hero Section */}
//       <div className='mt-10 bg-blue-50 p-8 rounded-2xl text-center space-y-4 mb-20'>
//         <h1 className='text-3xl md:text-5xl font-bold text-blue-800'>HOW IT WORKS</h1>
//         <p className='text-base md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed'>
//           Get products into your customers' hands quickly, with no minimum order quantity and optional 24-hour turnaround time.
//         </p>
//         <p className='text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
//           Follow the 6 easy steps below to create your unique packaging.
//         </p>
//       </div>

//       {/* Step 1 */}
//       <Section 
//         stepNumber={1}
//         title="Choose Your Product"
//         description="Select from our range of pouches or rollstock film - options for every need!"
//         imageSrc="/pack/all items.png"
//         imageAlt="Product samples"
//         ctaText="Order Sample"
//         reverse={false}
//       >
//         <RecommendedProducts/>
//       </Section>

//       {/* Step 2 */}
//       <Section 
//         stepNumber={2}
//         title="Select Your Material"
//         description="Choose from sustainable, high-quality materials for your packaging"
//         imageSrc="/pack/materials.png"
//         imageAlt="Material options"
//         ctaText="View Material Guide"
//         reverse={true}
//       />

//       {/* Step 3 */}
//       <Section 
//         stepNumber={3}
//         title="Design Your Packaging"
//         description="Use our online designer or upload your ready-made artwork"
//         imageSrc="/pack/design-tools.png"
//         imageAlt="Design tools"
//         ctaText="Start Designing"
//         reverse={false}
//       />

//       {/* Step 4 */}
//       <Section 
//         stepNumber={4}
//         title="Review & Approve"
//         description="Get a digital proof within 2 hours for final approval"
//         imageSrc="/pack/review.png"
//         imageAlt="Review process"
//         ctaText="Learn About Proofing"
//         reverse={true}
//       />

//       {/* Step 5 */}
//       <Section 
//         stepNumber={5}
//         title="Choose Quantity"
//         description="Order any quantity with no minimums - from samples to bulk orders"
//         imageSrc="/pack/quantity.png"
//         imageAlt="Quantity selection"
//         ctaText="View Pricing"
//         reverse={false}
//       />

//       {/* Step 6 */}
//       <Section 
//         stepNumber={6}
//         title="Fast Production & Delivery"
//         description="Get your order produced in 24 hours with worldwide shipping"
//         imageSrc="/pack/shipping.png"
//         imageAlt="Shipping illustration"
//         ctaText="View Shipping Options"
//         reverse={true}
//       />

//       {/* Final CTA */}
//       <div className='bg-blue-50 rounded-2xl p-8 text-center my-20'>
//         <h2 className='text-3xl md:text-4xl font-bold text-blue-800 mb-6'>Ready to Start?</h2>
//         <p className='text-gray-600 text-lg mb-8 max-w-2xl mx-auto'>
//           Begin your custom packaging journey today with our easy-to-use design tools.
//         </p>
//         <Button className='bg-blue-800 hover:bg-blue-900 text-white px-12 py-6 text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl'>
//           Start Designing Now
//         </Button>
//       </div>
//     </div>
//   )
// }

// // Reusable Section Component
// const Section = ( 
//   stepNumber, 
//   title, 
//   description, 
//   imageSrc, 
//   imageAlt, 
//   ctaText, 
//   reverse = false,
//   children 
// ) => (
//   <div className='mb-20'>
//     <div className='flex items-center gap-4 mb-8'>
//       <div className='bg-blue-800 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold'>
//         {stepNumber}
//       </div>
//       <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>{title}</h2>
//     </div>
    
//     <p className='text-gray-600 text-lg mb-12 max-w-3xl'>{description}</p>

//     {children}

//     <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16 ${reverse ? 'md:flex-row-reverse' : ''}`}>
//       <img 
//         className='w-full h-auto rounded-xl shadow-lg transform transition duration-500 hover:scale-105' 
//         src={imageSrc} 
//         alt={imageAlt} 
//       />
//       <div className='space-y-6'>
//         <h3 className='text-2xl font-bold text-gray-800'>Need Assistance?</h3>
//         <p className='text-gray-600 leading-relaxed'>
//           Our experts are available 24/7 to help you with {title}.
//         </p>
//         <Button className='bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl'>
//           {ctaText}
//         </Button>
//       </div>
//     </div>
//   </div>
// )

// export default HowtoDesign


import React from 'react'

function HowtoDesign() {
  return (
    <div>
      sdfdf
    </div>
  )
}

export default HowtoDesign
