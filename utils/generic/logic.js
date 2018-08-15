require("dotenv").load();
const stripeRefund = require("../stripe/refund");
const braintreeRefund = require("../braintree/refund");

module.exports = async (event, moltinClient) => {
  try {
    const body = JSON.parse(event.body);
    const resources = body.resources;
    const orderID = resources.data.id;
    const transactions = await moltinClient.get(
      "orders/" + orderID + "/transactions"
    );

    const [{ reference, gateway }] = await transactions.data.filter(
      transaction => transaction["transaction-type"] === "refund"
    );

    switch (gateway) {
      case "stripe":
        console.log("gateway is stripe");
        return stripeRefund(reference);

      case "braintree":
        console.log("gateway is braintree");
        return braintreeRefund(reference);

      default:
        throw new Error(gateway + " gateway not found");
    }
  } catch (e) {
    throw new Error(e);
  }
};
