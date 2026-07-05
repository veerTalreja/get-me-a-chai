"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { updateProfile, fetchuser } from "@/actions/useractions";
const handleSubmit = async (e) => {
  let a = await updateProfile(e, session.user.name);
  toast("Profile Updated", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

const Profile = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    profilepicture: "",
    Coverpicture: "",
    stripeid: "",
    stripsecret: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // safe inside effect
    }
    if (status === "authenticated" && session?.user?.name) {
      getData();
    }
  }, [status, session]);

  let handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const getData = async () => {
    let u = await fetchuser(session.user.name);
    setForm(u);
  };
  const handleSubmit = async (e) => {
    update();
    let a = await updateProfile(e, session.user.name);
    alert("Profile updated");
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div>
        <div className="mx auto py-5 px-6">
          <h1 className="font-bold text-center text-3xl my-5">
            Welcome to your Dashboard
          </h1>
          <form className=" max-w-2xl mx-auto" action={handleSubmit}>
            {/* name*/}
            <div className="my-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium  dark:text-white"
              >
                Name
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                id="name"
                value={form.name ? form.name : ""}
                className="block w-full p-2 rounded-lg bg-gray-700 text-white
              
              text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {/* Email*/}
            </div>
            <div className="my-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium  dark:text-white"
              >
                Email
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="email"
                id="email"
                value={form.email ? form.email : ""}
                className="block w-full p-2 rounded-lg bg-gray-700 text-white
              
              text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {/* user name*/}
            </div>
            <div className="my-2">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium  dark:text-white"
              >
                Username
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="username"
                id="username"
                value={form.username ? form.username : ""}
                className="block w-full p-2 rounded-lg bg-gray-700 text-white
              
              text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            {/* profile picture*/}
            <div className="my-2">
              <label
                htmlFor="profilpicture"
                className="block mb-2 text-sm font-medium  dark:text-white"
              >
                Profile Picture
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="profilepicture"
                id="profilepicture"
                value={form.profilepicture ? form.profilepicture : ""}
                className="block w-full p-2 rounded-lg bg-gray-700 text-white
              
              text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            {/* cover picture*/}
            <div className="my-2">
              <label
                htmlFor="Coverpicture"
                className="block mb-2 text-sm font-medium  dark:text-white"
              >
                Cover Picture
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="Coverpicture"
                id="Coverpicture"
                value={form.Coverpicture ? form.Coverpicture : ""}
                className="block w-full p-2 rounded-lg bg-gray-700 text-white
              
              text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            {/*strip Id */}
            <div className="my-2">
              <label
                htmlFor="stripeid"
                className="block mb-2 text-sm font-medium  dark:text-white"
              >
                Strip Id
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="stripeid"
                id="stripeid"
                value={form.stripeid ? form.stripeid : ""}
                className="block w-full p-2 rounded-lg bg-gray-700 text-white
              
              text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {/* strip Secret*/}
            </div>
            <div className="my-2">
              <label
                htmlFor="stripsecret"
                className="block mb-2 text-sm font-medium  dark:text-white"
              >
                Strip Secret
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="stripsecret"
                id="stripsecret"
                value={form.stripsecret ? form.stripsecret : ""}
                className="block w-full p-2 rounded-lg bg-gray-700 text-white
              
              text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            {/* Submit Button  */}
            <div className="my-6">
              <button
                type="submit"
                className="block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none   dark:focus:ring-blue-800 font-medium text-sm"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
