import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/donationForm.css';

const serverURL = process.env.REACT_APP_SERVER;

function Pay() {
  const [amount, setAmount] = useState<number | string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const { projectId } = useParams();
  const [showMessage, setShowMessage] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value);
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
      setShowMessage('error');
      setTimeout(() => window.history.back(), 2000);
      console.log('error on payment Method ', error?.message);
      return;
    }

    try {
      const { id } = paymentMethod;
      const amountInCents = Number(amount) * 100;
      const response = await axios.post(`${serverURL}/create-payment-intent`, {
        amount: amountInCents,
        id,
        projectId,
      });
      console.log('RESPONSE! -> ', response);
      setShowMessage('success');
      setTimeout(() => window.history.back(), 2000);
    } catch (error) {
      setShowMessage('error');
      console.log('error from the pay component: ', error);
    }
    setIsProcessing(false);
  }

  function onClose() {
    setShowMessage('');
    window.history.back();
  }

  return (
    <div className='donationDiv'>
      {showMessage.length > 0 && (
        <div className='backgroundDiv'>
          <div
            className='showMessage'
            style={{ zIndex: 2 }}
          >
            <button
              onClick={onClose}
              className='closePayButton'
              role='close-button'
            >
              X
            </button>
            {showMessage === 'error' ? (
              <h1>
                There&apos;s been a problem with your donation, <br></br> please
                try again.
              </h1>
            ) : (
              <h1>
                Your donation has been made, <br></br> Thank you for your
                support! ✨
              </h1>
            )}
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className='donationForm'
      >
        <button
          onClick={onClose}
          className='closePayButton'
          role='close-button'
        >
          X
        </button>
        <h1 className='donationFormTitle'>Support this Project:</h1>
        <label htmlFor='amount'>Amount:</label>
        <div>
          <span>€</span>
          <input
            type='number'
            id='amount'
            name='amount'
            value={amount}
            className='donationAmount'
            onChange={handleChange}
            placeholder='0'
            style={{ display: 'inline' }}
          ></input>
        </div>
        <div
          className='cardElementContainer'
          role='card-element-container'
        >
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
