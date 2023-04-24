import { useEffect, useState, React } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './checkoutForm'

const stripePromise = loadStripe('pk_test_51Mz0l1G3oO9e6ctomqtF6eNIobIzSXVBHkpqjaVMRiN8gxBwKU0GBWUhMlNpOicgX6xuSsvon0Hz46yfvMNVjGeR000dWvLXbX')

function Payment () {
  const [clientSecret, setClientSecret] = useState('')
  useEffect(() => {
    fetch('http://localhost:3001/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({})
    }).then(async (r) => {
      const { clientSecret } = await r.json()

      setClientSecret(clientSecret)
    })
  }, [])

  return (
    <>
      <h1>Donate to your favourite projects!</h1>
      {stripePromise && clientSecret && (
        <Elements stripe={ stripePromise } options={{ clientSecret }}>
          <CheckoutForm/>
        </Elements>
      )}
    </>
  )
}

export default Payment
