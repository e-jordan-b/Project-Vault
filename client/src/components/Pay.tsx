import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate, useParams} from 'react-router-dom';
import '../styles/donationForm.css';

const serverURL = 'http://localhost:3001';

function Pay() {
  const [amount, setAmount] = useState<number | string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { projectId } = useParams();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number(e.target.value));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsProcessing(true);

    const cardElement = elements?.getElement(CardElement);
    if (!cardElement) {
      setIsProcessing(false);
      return;
    }
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
        projectId
      });
      console.log('response from FRONTEND: ', response)
      navigate('/home');
      if (response.data.success) {
        console.log('Succesfull payment');
        navigate('/home');
      }
    } catch (error) {
      console.log('error from the pay component: ', error);
    }
    setIsProcessing(false);
  }

  function onClose() {
    window.history.back();
  }

  return (
    <div className='donationDiv'>
       
      <form
        onSubmit={handleSubmit}
        className='donationForm'
      >
          <button
            onClick={onClose}
            className='closeButton'
            role='close-button'
          >
          X
          </button>
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
        <div className='cardElementContainer' role='card-element-container'>
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