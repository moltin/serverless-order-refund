require("dotenv").load();

const stripe = require("stripe")(process.env.STRIPE_TOKEN);

module.exports = async chargeID => {
  try {
    return await stripe.refunds.create({
      charge: chargeID
    });
  } catch (e) {
    return e;
  }
};
