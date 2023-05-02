import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/donationForm.css';

const serverURL = 'http://localhost:3001';

function Pay() {
  const [amount, setAmount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number(e.target.value));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsProcessing(true);

    const cardElement = elements?.getElement(CardElement);

    if (!stripe || !cardElement) {
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
      console.log(error?.message);
      return;
    }

    try {
      const { id } = paymentMethod;
      const amountInCents = amount * 100;
      const response = await axios.post(`${serverURL}/create-payment-intent`, {
        amount: amountInCents,
        id,
      });
      if (response.data.success) {
        console.log('Succesfull payment');
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    }
    setIsProcessing(false);
  }

  return (
    <div className='donationDiv'>
      <form
        onSubmit={handleSubmit}
        className='donationForm'
      >
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
          disabled={isProcessing ? true: false}>
          {isProcessing ? 'Processing...' : 'Donate'}
        </button>
      </form>
    </div>
  );
}

export default Pay;
