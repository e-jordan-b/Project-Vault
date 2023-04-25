import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/donationForm.css'

const serverURL = process.env.REACT_APP_SERVER

function Pay2 () {
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
        const wholeAmount = amount * 100
        const response = await axios.post(`${serverURL}/create-payment-intent`, {
          wholeAmount,
          id
        })
        if (response.data.succes) {
          console.log('Succesfull payment')
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
    <div className='donationDiv'>
      <form onSubmit={handleSubmit} className='donationForm'>
        <label htmlFor='amount'>Amount:</label>
        <input
        type='number'
        id='amount'
        name='amount'
        value={amount}
        className='donationAmount'
        onChange={handleChange}></input>
        <div>
          <CardElement/>
        </div>
        <button className='donateButton'>{isProcessing ? 'Processing...' : 'Donate'}</button>
      </form>
    </div>
  )
}

export default Pay2
