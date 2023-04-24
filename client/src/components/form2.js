import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Pay2 from './pay2'

const stripePromise = loadStripe('pk_test_51Mz0l1G3oO9e6ctomqtF6eNIobIzSXVBHkpqjaVMRiN8gxBwKU0GBWUhMlNpOicgX6xuSsvon0Hz46yfvMNVjGeR000dWvLXbX')

function Form2 () {
  return (
    <Elements stripe={stripePromise}>
      <Pay2/>
    </Elements>
  )
}

export default Form2
