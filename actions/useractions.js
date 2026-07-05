"use server";
import Stripe from "stripe";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";
import User from "@/models/User";
import connectDb from "@/db/connectDb";;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();
  // ✅ Create a Checkout Session instead of PaymentIntent
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: paymentform?.name || "Anonymous",
            description: paymentform?.message || "",
          },
          unit_amount: Number.parseInt(amount),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      to_user: to_username,
      name: paymentform?.name || "",
      message: paymentform?.message || "",
    },
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
  });
  await Payment.create({
    oid: session.id,
    amount: amount/100,
    to_user: to_username,
    name: paymentform?.name || "Anonymous",
    message: paymentform?.message || "",
    done:false,
  });

  return {
    id: session.id,
    url: session.url,
    amount: amount,
    currency: "inr",
    status: session.status,
  };
};


export const fetchuser = async (username)=> {
  await connectDb()
  let user = await User.findOne({username: username}).lean()
   return user ? JSON.parse(JSON.stringify(user)) : null; // make it fully serializable
}

export const fetchpayments = async (username)=> {
  await connectDb()
  let p = await Payment.find({to_user: username,done:true}).sort({amount:-1}).limit(10).lean()
  return JSON.parse(JSON.stringify(p));
}

export const updateProfile=async(data,oldusername)=> {
  await connectDb()
  let ndata = Object.fromEntries(data)
  if(oldusername !== ndata.username){
    let u = await User.findOne({username: ndata.username})
    if(u){
      return{error:"Username already exist"}

      
    }

    await User.updateOne({email:ndata.email},ndata)

    await Payment.updateMany({to_user:oldusername}, {to_user:ndata.username})
  }
  else {
    await User.updateOne({email:ndata.email},ndata)
  }

  

}