const axios = require("axios");
const globals = require("node-global-storage");

class paymentController {
  payment_create = async (req, res) => {
    const { amount } = req.body;
    try {
      const { data } = await axios.post(
        process.env.bkash_create_payment_url,
        {}
      );
    } catch (error) {}
  };
}
module.exports = new paymentController();
