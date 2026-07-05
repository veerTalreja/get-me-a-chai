import React from "react";
import PaymentPage from "../component/PaymentPage";
import { notFound } from "next/navigation"
import User from "@/models/User";
import connectDB from "@/db/connectDb";
const Username = async ({ params }) => {
  const {username} = await params
  const checkUser = async () => {
    await connectDB()
    let u = await User.findOne({username:params.username})
    if(!u){
      return notFound()
    }

  }

  await checkUser()
  
  return (
    <>
    <PaymentPage username={username} />
    </>
  );
};

export default Username;

export async function generateMetadata({params}) {
  return{
    title:`Support ${params.username} - Get Me A Chai`
  }
}