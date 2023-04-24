import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Pay2 () {
  const [succes, setSucces] = useState(false)
  const [amount, setAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()

  function handleChange (e) {
    setAmount(e.target.value)
  }

  async function handleSubmit (e) {
    e.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })

    setIsProcessing(true)

    if (!error) {
      try {
        const { id } = paymentMethod
        const response = await axios.post('http://localhost:3001/create-payment-intent', {
          amount,
          id
        })
        if (response.data.succes) {
          console.log('Succesfull payment')
          setSucces(true)
          navigate('/home')
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log(error.message)
    }
  }
  return (
    <>
      {!succes
        ? (
      <form onSubmit={handleSubmit}>
        <input
        type='number'
        name='amount'
        value={amount}
        onChange={handleChange}></input>
        <div>
          <CardElement/>
        </div>
        <button>{isProcessing ? 'Processing...' : 'Donate'}</button>
      </form>
          )
        : <h1>Thanks for the donation</h1>
    }
    </>
  )
}

export default Pay2
