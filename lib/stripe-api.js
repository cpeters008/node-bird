const config = require('../config/config.json')
const stripe = require("stripe")(config.stripeToken)

async function createStripeCard({
  cardNumber,
  expMonth,
  expYear,
  cardCvc
}) {
  try {
    return await stripe.tokens.create({
      card: {
        "number": cardNumber,
        "exp_month": expMonth,
        "exp_year": expYear,
        "cvc": cardCvc
      }
    })
  } catch (err) {
    console.log('err with createStripeCard', err)
  }
}

async function deleteStripeCard(customerId, cardId) {
  try {
    return await stripe.customers.deleteCard(
      customerId,
      cardId
    )
  } catch (err) {
    console.log('err with deleteStripeCard', err)
  }
}

module.exports = {
  createStripeCard: createStripeCard,
  deleteStripeCard: deleteStripeCard
}