import React from 'react';
import { render, fireEvent, screen, waitFor } from '../utils/test-utils';
import { loadStripe, Stripe } from '@stripe/stripe-js'
import Pay from './Pay';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { Elements } from '@stripe/react-stripe-js'
import axios, { AxiosResponse, AxiosHeaders, InternalAxiosRequestConfig } from 'axios';


const serverURL = 'http://localhost:3001';
const stripePromise: Promise<Stripe | null>= loadStripe(process.env.REACT_APP_STRIPE_KEY as string)



describe('Pay component', () => {
  it('Should render the form input ', () => {
    render(
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <Pay />
        </Elements>
      </BrowserRouter>
    )
    const amountInput = screen.getByLabelText('Amount:');
    expect(amountInput).toBeInTheDocument();

  })
  it('Should render the doneate button ', () => {
    render(
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <Pay />
        </Elements>
      </BrowserRouter>
    )
    const donatebutton = screen.getByRole('donate-button');
    expect(donatebutton).toBeInTheDocument();

  })

  it('Should render the CardElement ', () => {
    render(
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <Pay />
        </Elements>
      </BrowserRouter>
    )
    const cardElementContainer = screen.getByRole('card-element-container')
    const cardElement = cardElementContainer.querySelector(':scope > *');

    expect(cardElementContainer).toBeInTheDocument();
    expect(cardElement).toBeInTheDocument();

  })

  it('Should update the input field value on change', () => {
    render(
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <Pay />
        </Elements>
      </BrowserRouter>
    )
    const amountInput = screen.getByLabelText('Amount:');
    fireEvent.change(amountInput, { target: { value: 500 } });
    expect(amountInput).toHaveValue(500);
  })

  it('Should work', () => {
    render(
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <Pay />
        </Elements>
      </BrowserRouter>
    )
    const amountInput = screen.getByLabelText('Amount:');
    const donatebutton = screen.getByRole('donate-button');
    fireEvent.change(amountInput, { target: { value: 500 } });
    fireEvent.submit(donatebutton);

    
  })

})