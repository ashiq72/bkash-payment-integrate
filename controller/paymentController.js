class paymentController {
  payment_create = async (req, res) => {
    console.log(req.body);
  };
}
module.exports = new paymentController();
