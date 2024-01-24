/* eslint-disable no-unused-vars */
import axios from "axios";
function Home() {
  const pay = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/bkash/payment/create",
        { amount: 50, orderId: 1 },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={pay}>Pay bKash</button>
    </div>
  );
}

export default Home;
