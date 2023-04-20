import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'

const stripePromise = loadStripe('pk_test_51Mz0l1G3oO9e6ctomqtF6eNIobIzSXVBHkpqjaVMRiN8gxBwKU0GBWUhMlNpOicgX6xuSsvon0Hz46yfvMNVjGeR000dWvLXbX')

function Component () {
  const elements = useElements()
  const stripe = useStripe()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })

    if (!error) {
      const { id } = paymentMethod
      const { data } = await axios.post('http://localhost:3001/api/checkout', {
        id,
        amount: 10000
      })
      console.log(data)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
    <CardElement/>
    <button type='submit'>Donate</button>
  </form>
  )
}

function Donate () {
  return (
    <Elements stripe={stripePromise}>
      <Component/>
    </Elements>
  )
}

export default Donate
