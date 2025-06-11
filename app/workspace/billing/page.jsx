import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const Billing = () => {
  return (
    <div>
        <h2 className='font-bold text-3xl my-7'>Billing Plan :</h2>
        <PricingTable/>
    </div>
  )
}

export default Billing