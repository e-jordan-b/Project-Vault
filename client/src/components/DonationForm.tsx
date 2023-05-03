import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Pay from './Pay'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

function Form() {
  return (
    <Elements stripe={stripePromise}>
      <Pay/>
    </Elements>
  );
}

export default Form;
