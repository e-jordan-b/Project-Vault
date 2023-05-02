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

jest.mock('axios', () => ({
  post: jest.fn(),
}));

describe('Pay component', () => {
  beforeEach(async () => {
      jest.clearAllMocks();
  })

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

  it('handles form submission with successful payment', async () => {
    const response: AxiosResponse = {
      data: {
        success: true,
      },
      status: 200,
      statusText: 'OK',
      headers: {} as AxiosHeaders,
      config: {} as InternalAxiosRequestConfig,
    };

    (axios.post as jest.Mock).mockResolvedValue(response);

    const { getByLabelText, getByRole } = render(
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <Pay />
        </Elements>
      </BrowserRouter>
    );

    const amountInput = getByLabelText('Amount:');
    fireEvent.change(amountInput, { target: { value: '10' } });

    const cardElement = getByRole('card-element-container').querySelector(':scope > *');
    fireEvent.load(cardElement as Element);

    fireEvent.click(getByRole('donate-button'));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledWith(`${serverURL}/create-payment-intent`, {
      amount: 1000,
      id: 'card',
    });
    expect(screen.getByText('Succesfull payment')).toBeInTheDocument();
  });

})