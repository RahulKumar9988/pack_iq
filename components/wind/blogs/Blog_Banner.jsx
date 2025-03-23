import React from 'react'

function Blog_Banner() {
  return (
    <div>
        {/* blog-banner-background */}
      <div
        className="h-[30vh] md:h-96 flex items-center bg-cover bg-center px-4 md:px-8 lg:px-16 border-t-2 w-full"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.783), rgba(255, 255, 255, 0.103)), url('/blog.png')",
          backgroundColor: "#00000072",
        }}
      >
        <div className="flex flex-col gap-8 md:gap-[60px] sm:flex max-w-[629px]">
          <div className="flex flex-col gap-3 md:gap-5 lg:gap-6 uppercase">
            <div className="text-2xl sm:text-3xl md:text-[40px] lg:text-[51px] leading-7 sm:leading-8 md:leading-[45px] lg:leading-[60px] font-bold text-white">
              Packiq Blogs
            </div>
            <div className="font-medium text-white text-sm md:text-base">
              Articles, guides, and updates from our team.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog_Banner