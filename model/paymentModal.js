const { Schema, model } = require("mongoose");

const payment = new Schema(
  {
    userId: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    trxID: {
      type: String,
    },
    PaymentID: {
      type: String,
    },
    date: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = model("payments", payment);
