import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'

function Pay2 () {
  const [succes, setSucces] = useState(false)
  const [amount, setAmount] = useState('')
  const stripe = useStripe()
  const elements = useElements()

  function handleChange (e) {
    setAmount(e.target.value)
    console.log(Number(amount))
  }

  async function handleSubmit (e) {
    e.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })

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
        <button>Pay</button>
      </form>
          )
        : <h1>Thanks for the donation</h1>
    }
    </>
  )
}

export default Pay2
