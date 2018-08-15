"use strict";
const logic = require("./utils/generic/logic");

const createMoltinClient = require("@moltin/request").createClient;

const moltinClient = new createMoltinClient({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET
});

module.exports.refund = async (event, context) => {
  try {
    let response = await logic(event, moltinClient);

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
};
