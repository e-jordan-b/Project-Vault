const Stripe = require('stripe')

const stripe = new Stripe('sk_test_51Mz0l1G3oO9e6ctoG62b2a0E5jmy3Hlw2AQyEDMz6xxUlNd2NouOENwYpS1VkJ6UlO2vor2AAwER8jNfUzmIA0JJ00F7KVcftp')

exports.checkout = async (req, res) => {
  const { id, amount } = req.body
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Donation',
      payment_method: id,
      confirm: true
    })

    res.send({ message: 'Thanks for donating' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ message: 'error with payment' })
  }
}
