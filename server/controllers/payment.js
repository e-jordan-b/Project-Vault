require('dotenv').config()
const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
exports.checkout = async (req, res) => {
  const { wholeAmount, id } = req.body
  const amount = wholeAmount
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      description: 'Donation',
      payment_method: id,
      confirm: true
    })
    console.log('Payment', payment)
    res.json({
      message: 'Donation successfull',
      succes: true

    })
  } catch (error) {
    console.log(error)
  }
}
