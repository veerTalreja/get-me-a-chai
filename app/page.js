import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <div className="flex flex-col justify-center items-center gap-4 text-white px-4 md:px-0 py-16 text-xs md:text-base">
        <div className="font-bold text-3xl md:text-5xl flex gap-2 justify-center items-center">
          Get Me a Chai
          <span>
            <img className="invertImg" src="/tea.gif" width={88} alt="" />
          </span>
        </div>

        <p className="text-center md:text-left">
          A crowdfunding platform for creators to fund their projects.
        </p>

        <p className="text-center md:text-left">
          A place where your fans can buy a chai, unleash the power of your fans
          and get your project funded.
        </p>

        <div>
          <Link href="/login">
            <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
              Start Here
            </button>
          </Link>

          <Link href="/about">
            <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
              Read More
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      {/* FEATURES SECTION */}
      <div className="text-white mx-auto pb-20 pt-14 px-4">
        <h1 className="text-3xl font-bold text-center mb-14">
          Your fans can buy you a Chai
        </h1>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {/* item1 */}
          <div className="space-y-3 flex flex-col items-center">
            <img className="bg-slate-400 rounded-full p-2" width={88} src="/man.gif" />
            <p className="font-bold text-center">Your fans want to help</p>
            <p className="text-center">Your fans are available to support you</p>
          </div>

          {/* item2 */}
          <div className="space-y-3 flex flex-col items-center">
            <img className="bg-slate-400 rounded-full p-2" width={88} src="/coin.gif" />
            <p className="font-bold text-center">Earn support easily</p>
            <p className="text-center">Turn appreciation into funding</p>
          </div>

          {/* item3 */}
          <div className="space-y-3 flex flex-col items-center">
            <img className="bg-slate-400 rounded-full p-2" width={88} src="/group.gif" />
            <p className="font-bold text-center">Grow your community</p>
            <p className="text-center">Connect with your supporters</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      {/* VIDEO SECTION */}
      <div className="text-white mx-auto pb-20 pt-14 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-14">
          Learn more about us
        </h1>

        <div className="w-[90%] md:w-[60%] aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/Tb1CLQuJOsE?si=ychAs9CjiJXHNf7d"
            allowFullScreen
          />
        </div>
      </div>
    </>
  );
}