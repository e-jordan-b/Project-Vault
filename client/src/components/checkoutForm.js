// import React, { useState } from 'react'
// import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
// import { useNavigate } from 'react-router-dom'
// import '../styles/donationForm.css'

// function CheckoutForm () {
//   const stripe = useStripe()
//   const elements = useElements()
//   const navigate = useNavigate()

//   const [message, setMessage] = useState(null)
//   const [isProcessing, setIsProcessing] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!stripe || !elements) {
//       return
//     }

//     setIsProcessing(true)

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: 'http://localhost:3000/home'
//       },
//       redirect: 'if_required'
//     })

//     if (error) {
//       setMessage(error.message)
//     } else {
//       navigate('/home')
//     }
//     setIsProcessing(false)
//     console.log(message)
//   }
//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <PaymentElement/>
//       <button disabled={isProcessing} id="submit">
//         <span id="button-text">
//           {isProcessing ? 'Processing...' : 'Pay now'}
//         </span>
//       </button>
//     </form>
//   )
// }

// export default CheckoutForm
