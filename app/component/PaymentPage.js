"use client";
import React from "react";
import Script from "next/script";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";
import { useSession } from "next-auth/react";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const PaymentPage = ({ username }) => {
  const { data: session } = useSession();
  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [amount, setAmount] = useState(""); // dynamic amount from input
  const [currentuser, setCurrentuser] = useState({});
  const [payments, setPayments] = useState([]);
  const [stripePromise, setStripePromise] = useState(null);
  const searchParams = useSearchParams()

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (searchParams.get("paymentdone") == "true") {
      toast("🦄 Wow so easy!", {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }, [session]);
  useEffect(() => {
    if (currentuser.stripeid) {
      setStripePromise(loadStripe(currentuser.stripeid));
    }
  }, [currentuser]);

  const handleCheckout = async (amountValue) => {

    const stripe = await loadStripe(currentuser.stripeid);
    if (!stripe) return;

    const finalAmount = amountValue || paymentform.amount;

    const session = await initiate(finalAmount, username, paymentform);
    if (!session?.id) return;

    await stripe.redirectToCheckout({ sessionId: session.id });
  };
  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async (params) => {
    let u = await fetchuser(username);
    setCurrentuser(u);
    let dbpayments = await fetchpayments(username);
    setPayments(dbpayments);
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="cover w-full bg-red-50 relative">
        <img
          className="object-cover w-full h-48 md:h-auto"
          src={currentuser.Coverpicture}
          alt=""
          elementtiming="Creator Public Page : Base Page"
          data-is-key-element="true"
        />
        <div className="absolute -bottom-20 right-[35%] sm:right-[40%] md:right-[44%] lg:right-[45%] xl:right-[46%] size-32 overfolw-hideen border-2 border-white rounded-full object-cover">
          <img
            className="rounded-full size-32"
            width={128}
            height={128}
            src={currentuser.profilepicture}
          />
        </div>
      </div>
      <div className="info flex flex-col justify-center items-center my-24 mb-32 gap-2  ">
        <div className="font-bold text-lg ">
          <h1>@{username}</h1>
        </div>
        <div className="text-slate-400">Lets help {username} get a chai!</div>
        <div className="text-slate-400">
          {payments.length} Payments .  Rs{payments.reduce((a,b)=> a+b.amount,0)} Raised
        </div>

        <div className="payment flex gap-3 hover:cursor-pointer w-[80%] mt-11 flex-col md:flex-row">
          <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg  text-white p-10">
            {/* show list of all the supporters as a leaderboard */}
            <h2 className="text-2xl  font-bold my-5">Top 10 Supporters</h2>
            <ul className="mx-5 text-lg ">
              {payments.length == 0 && <li>no payments yet</li>}
              {payments.map((p, i) => {
                return (
                  <li key={i} className="my-4 flex gap-2 items-center">
                    <img width={33} src="avatar.gif" alt="user avatar" />
                    <span>
                      {p.name} donated{" "}
                      <span className="font-bold">{p.amount}</span> with a
                      message "{p.message}"
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg  text-white p-10">
            <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
            <div className="flex flex-col gap-2">
              {/* input for name and message */}
              <div>
                <input
                  className="w-full p-3 rounded-lg  bg-slate-800"
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={paymentform.name}
                  onChange={handleChange}
                />
              </div>
              <input
                className="w-full p-3  rounded-lg  bg-slate-800"
                type="text"
                name="message"
                placeholder="Enter Message"
                value={paymentform.message}
                onChange={handleChange}
              />

              <input
                className="w-full p-3  rounded-lg  bg-slate-800"
                type="number"
                name="amount"
                placeholder="Enter Amount"
                value={paymentform.amount}
                onChange={handleChange}
              />
              {paymentform.name && paymentform.name.length < 3 && (
                <p className="text-red-500 text-sm mt-1">
                  Name must be at least 3 characters
                </p>
              )}

              {paymentform.message && paymentform.message.length < 3 && (
                <p className="text-red-500 text-sm mt-1">
                  Message must be at least 3 characters
                </p>
              )}

              {paymentform.amount && paymentform.amount < 50 && (
                <p className="text-red-500 text-sm mt-1">
                  Amount should be 50 or greater
                </p>
              )}

              <button
                type="button"
                onClick={() =>
                  handleCheckout(Number.parseInt(paymentform.amount) * 100)
                }
                disabled={
                  paymentform.name.length < 3 ||
                  paymentform.message.length < 3 ||
                  paymentform.amount < 50
                }
                className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 
    hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
    focus:ring-blue-300 dark:focus:ring-blue-800 font-medium 
    rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2
    ${
      paymentform.name.length < 3 ||
      paymentform.message.length < 3 ||
      paymentform.amount < 50
        ? "opacity-50 cursor-not-allowed"
        : ""
    }`}
              >
                Pay
              </button>
            </div>
            {/* or choose from these amounts*/}
            <div className="flex flex-col md:flex-row gap-2 mt-5">
              <button
                className="bg-slate-800 p-3 hover:cursor-pointer rounded-lg disabled:opacity-50 cursor-not-allowed"
                onClick={() => handleCheckout(Number.parseInt(10) * 1000)}
                disabled={
                  paymentform.name.length < 3 || paymentform.message.length < 3
                }
              >
                Pay Rs10
              </button>
              <button
                className="bg-slate-800 p-3 hover:cursor-pointer rounded-lg disabled:opacity-50 cursor-not-allowed"
                onClick={() => handleCheckout(Number.parseInt(20) * 1000)}
                disabled={
                  paymentform.name.length < 3 || paymentform.message.length < 3
                }
              >
                Pay Rs20
              </button>
              <button
                className="bg-slate-800 p-3 hover:cursor-pointer rounded-lg disabled:opacity-50 cursor-not-allowed"
                onClick={() => handleCheckout(Number.parseInt(30) * 1000)}
                disabled={
                  paymentform.name.length < 3 || paymentform.message.length < 3
                }
              >
                Pay Rs30
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
