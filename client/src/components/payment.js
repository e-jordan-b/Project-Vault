// import { useEffect, useState, React } from 'react'
// import { loadStripe } from '@stripe/stripe-js'
// import { Elements } from '@stripe/react-stripe-js'
// import PropTypes from 'prop-types'
// import CheckoutForm from './checkoutForm'
// import '../styles/donationForm.css'

// const stripePromise = loadStripe('pk_test_51Mz0l1G3oO9e6ctomqtF6eNIobIzSXVBHkpqjaVMRiN8gxBwKU0GBWUhMlNpOicgX6xuSsvon0Hz46yfvMNVjGeR000dWvLXbX')

// function Payment ({ amount }) {
//   const [clientSecret, setClientSecret] = useState('')
//   console.log(amount)
//   useEffect(() => {
//     fetch('http://localhost:3001/create-payment-intent', {
//       method: 'POST',
//       body: JSON.stringify({ amount })
//     }).then(async (r) => {
//       const { clientSecret } = await r.json()

//       setClientSecret(clientSecret)
//     })
//   }, [])

//   return (
//     <>
//       <div className='donationForm'>
//       {stripePromise && clientSecret && (
//         <>
//           <Elements stripe={ stripePromise } options={{ clientSecret }}>
//             <CheckoutForm/>
//           </Elements>
//         </>
//       )}
//       </div>
//     </>
//   )
// }

// Payment.propTypes = {
//   amount: PropTypes.number
// }

// export default Payment
