import { describe, test } from '@jest/globals';
import Stripe from 'stripe';
import dotevn from 'dotenv';
dotevn.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
  typescript: true,
});

describe('Stripe Payment Intents:', () => {
  let paymentIntentId: string;

  beforeAll(async () => {
    let paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'eur',
      payment_method_types: ['card'],
    });
    paymentIntentId = paymentIntent.id;
  });

  afterAll(async () => {
    await stripe.paymentIntents.cancel(paymentIntentId);
  });

  it('creates a new Payment Intent', async () => {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    expect(paymentIntent.amount).toBe(1000);
    expect(paymentIntent.currency).toBe('eur');
    expect(paymentIntent.payment_method_types).toEqual(['card']);
  });


})