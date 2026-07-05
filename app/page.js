import Image from "next/image";


export default function Home() {

  return (

    
    <>
      <div className="flex flex-col justify-center items-center gap-4 text-white h-[40vh] ">
        <div className="font-bold text-5xl flex gap-2 justify-center items-center">
          Buy Me a Chai{" "}
          <span>
            <img src="/tea.gif" width={88} alt="" />
          </span>
        </div>
        <p>
          A crowdfunding platform for creators. Get funded by your fans and
          followers.Start now!
        </p>
        <div className="">
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Start Here
            </button>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Read More
          </button>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white mx-auto pb-32 pt-14">
        <h1 className="text-3xl font-bold text-center mb-14">Your fans can buy you a Chai</h1>
        <div className="flex gap-5 justify-around ">
          {/* item1 */}
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/man.gif" alt="" />
            <p className="font-bold">Your fans want to help</p>
            <p className="text-center"> Your fans are available for you to help you</p>
          </div>
          {/* item2 */}
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/coin.gif" alt="" />
            <p className="font-bold">Your fans want to help</p>
            <p className="text-center"> Your fans are available for you to help you</p>
          </div>
          {/* item3 */}
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/group.gif" alt="" />
            <p className="font-bold">Your fans want to help</p>
            <p className="text-center"> Your fans are available for you to help you</p>
          </div>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      {/*div 2*/}
      <div className="text-white mx-auto pb-32 pt-14 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center mb-14">Learn more about us</h1>
       <iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/Tb1CLQuJOsE?si=ychAs9CjiJXHNf7d"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
></iframe>

      </div>
       
    </>
  );
}
