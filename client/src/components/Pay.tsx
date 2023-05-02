import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/donationForm.css';

const serverURL = 'http://localhost:3001';

function Pay() {
  const [amount, setAmount] = useState<number | string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // console.log('stripe elements when rendering: ', elements)
  // console.log('stripe when rendering: ', stripe)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number(e.target.value));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsProcessing(true);

    const cardElement = elements?.getElement(CardElement);
    console.log('card element: ', cardElement)
    if (!cardElement) {
      setIsProcessing(false);
      return;
    }
    console.log('Submitting with stripe and card element')
    const paymentMethodResult = await stripe?.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    const { error, paymentMethod } = paymentMethodResult || {};

    if (!paymentMethod) {
      setIsProcessing(false);
      console.log('error? ', error?.message);
      return;
    }

    try {
      const { id } = paymentMethod;
      const amountInCents = Number(amount) * 100;
      const response = await axios.post(`${serverURL}/create-payment-intent`, {
        amount: amountInCents,
        id,
      });
      console.log('response from FRONTEND: ', response)
      if (response.data.success) {
        console.log('Succesfull payment');
        navigate('/home');
      }
    } catch (error) {
      console.log('error from the pay component: ', error);
    }
    setIsProcessing(false);
  }

  return (
    <div className='donationDiv'>
      <form
        onSubmit={handleSubmit}
        className='donationForm'
        >
        <h1 className='donationFormTitle'>Support this Project:</h1>
        <label htmlFor='amount'>Amount:</label>
        <input
          type='number'
          id='amount'
          name='amount'
          value={amount}
          className='donationAmount'
          onChange={handleChange}
        ></input>
        <div role='card-element-container'>
          <CardElement />
        </div>
        <button
          type='submit'
          className='donateButton'
          role='donate-button'
           >
          {isProcessing ? 'Processing...' : 'Donate'}
        </button>
      </form>
    </div>
  );
}

export default Pay;

// import React, { useState } from 'react'
// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import '../styles/donationForm.css'

// const serverURL = process.env.REACT_APP_SERVER

// function Pay2 () {
//   const [amount, setAmount] = useState('')
//   const [isProcessing, setIsProcessing] = useState(false)
//   const stripe = useStripe()
//   const elements = useElements()
//   const navigate = useNavigate()

//   function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
//     setAmount(e.target.value)
//   }

//   async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     const { error, paymentMethod } = await stripe?.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement)
//     })

//     setIsProcessing(true)

//     if (!error) {
//       try {
//         const { id } = paymentMethod
//         const wholeAmount = Number(amount) * 100
//         const response = await axios.post(`${serverURL}/create-payment-intent`, {
//           wholeAmount,
//           id
//         })
//         if (response.data.succes) {
//           console.log('Succesfull payment')
//           navigate('/home')
//         }
//       } catch (error) {
//         console.log(error)
//       }
//     } else {
//       console.log(error.message)
//     }
//   }
//   return (
//     <div className='donationDiv'>
//       <form onSubmit={handleSubmit} className='donationForm'>
//         <label htmlFor='amount'>Amount:</label>
//         <input
//         type='number'
//         id='amount'
//         name='amount'
//         value={amount}
//         className='donationAmount'
//         onChange={handleChange}></input>
//         <div>
//           <CardElement/>
//         </div>
//         <button className='donateButton'>{isProcessing ? 'Processing...' : 'Donate'}</button>
//       </form>
//     </div>
//   )
// }

// export default Pay2