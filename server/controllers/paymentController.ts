import Stripe from 'stripe';
import { Request, Response } from 'express';
import Project from '../models/projectModel';
import dotevn from 'dotenv';
dotevn.config();

const stripe: Stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
  apiVersion: '2022-11-15',
  typescript: true,
});

const checkout = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { amount, id, projectId } = req.body;
  console.log('stripe from controller: ', stripe);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      description: 'Donation',
      payment_method: id,
      confirm: true,
    });
    console.log('payment intent', paymentIntent);
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId },
      {
        $inc: { donationsCents: paymentIntent.amount },
      }
    );

    res.json({
      message: 'Donation successfull',
      succes: true,
      clientSecret: paymentIntent.client_secret,
      updatedProject,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export default checkout;
