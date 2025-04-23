import OrderHistory from '@/components/wind/Order/Order_history'
import React from 'react'

function page() {
  return (
    <div className='w-full h-full bg-[#]'>
      <OrderHistory limitOrders={false} maxOrders={Infinity} />
    </div>
  )
}

export default page
