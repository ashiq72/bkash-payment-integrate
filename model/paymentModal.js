const { Schema, model } = require("mongoose");

const payment = new Schema(
  {
    userId: {
      type: String,
    },
    amount: {
      type: Number,
    },
    trxID: {
      type: Number,
    },
    PaymentID: {
      type: Number,
    },
    date: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = model("payments", payment);
