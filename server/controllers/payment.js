const Stripe = require('stripe')

const stripe = new Stripe('sk_test_51Mz0l1G3oO9e6ctoG62b2a0E5jmy3Hlw2AQyEDMz6xxUlNd2NouOENwYpS1VkJ6UlO2vor2AAwER8jNfUzmIA0JJ00F7KVcftp')

exports.checkout = async (req, res) => {
  // const { id, amount } = req.body
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1999,
      currency: 'eur',
      description: 'Donation',
      // payment_method: id,
      // confirm: true
      automatic_payment_methods: {
        enabled: true
      }
    })

    res.send({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.log(error)
    res.status(401).send({ message: 'error with payment' })
  }
}
