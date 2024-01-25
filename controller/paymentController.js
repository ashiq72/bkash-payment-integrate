const axios = require("axios");
const globals = require("node-global-storage");
const { v4: uuidv4 } = require("uuid");
const paymentModal = require("../model/paymentModal");

class paymentController {
  bkash_headers = async () => {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: globals.get("id_token"),
      "x-app-key": process.env.bkash_api_key,
    };
  };
  payment_create = async (req, res) => {
    const { amount, userId } = req.body;

    try {
      const { data } = await axios.post(
        process.env.bkash_create_payment_url,
        {
          mode: "0011",
          payerReference: " ",
          callbackURL: "http://localhost:5000/api/bkash/payment/callback",
          amount: amount,
          currency: "BDT",
          intent: "sale",
          merchantInvoiceNumber: "Inv" + uuidv4().substring(0, 5),
          // merchantAssociationInfo:
        },
        {
          headers: await this.bkash_headers(),
        }
      );
      // console.log(data);
      return res.status(200).json({ bkashURL: data.bkashURL });
    } catch (error) {
      return res.status(200).json({ error: error.message });
    }
  };
  call_back = async (req, res) => {
    const { paymentID, status } = req.query;

    if (status === "cancel" || status === "failure") {
      return res.redirect(`http://localhost:5173/error?message=${status}`);
    }
    if (status === "success") {
      try {
        const { data } = await axios.post(
          process.env.bkash_create_payment_url,
          { paymentID },
          {
            headers: await this.bkash_headers(),
          }
        );
        // if (data && data.statusCode === "0000") {
        //   await paymentModal.create({
        //     userId: Math.random() * 10 + 1,
        //     paymentID,
        //     traxID: data.traxID,
        //     date: date.paymentExecuteTime,
        //     amount: parseInt(data.amount),
        //   });
        //   return res.redirect(`http://localhost:5173/success`);
        // } else {
        //   console.log("If not Success error: ", data);
        //   return res.redirect(
        //     `http://localhost:5173/error?message=${data.statusMessage}`
        //   );
        // }
        return res.redirect(`http://localhost:5173/success`);
      } catch (error) {}

      return res.redirect(
        `http://localhost:5173/error?message=${error.message}`
      );
    }
    console.log(req.query);
  };
}
module.exports = new paymentController();
