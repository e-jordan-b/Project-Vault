import Stripe from 'stripe';
import { Request, Response } from 'express';
import dotevn from 'dotenv';
dotevn.config()

const stripe: Stripe = new Stripe(
  `${process.env.STRIPE_SECRET_KEY}`,
  {
    apiVersion: '2022-11-15',
    typescript: true,
  })

const checkout = async (req: Request, res: Response): Promise<Response | void> => {
  const { amount, id } = req.body;
  
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      description: 'Donation',
      payment_method: id,
      confirm: true
    })
    res.json({
      message: 'Donation successfull',
      succes: true
    })
  } catch (error) {
    console.log(error)
  }
}

export default checkout;