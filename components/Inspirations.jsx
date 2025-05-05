import React from 'react'
import LayoutGridDemo from './LayoutGridDemo'

function Inspirations() {
  return (
    <div>
      <div>
        <h1 className="text-5xl font-bold text-center md:text-start md:px-28 py-6 text-blue-950">Inspirations</h1>
        <p className="text-start text-lg md:px-28">
          Explore our curated collection of stunning designs and ideas to inspire your next project.
        </p>
      </div>
      <LayoutGridDemo/>
    </div>
  )
}

export default Inspirations
