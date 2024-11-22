import rubyBg from '../../public/home-pg-assets/ruby-bg.png';
import Image from 'next/image';
import { Alex_Brush } from "next/font/google";
import { Italiana } from "next/font/google";
import googleDriveIcon from "../../public/google-drive-icon.png";

const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const italianaFont = Italiana({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
  });

export default function RubySection() {
    return (
        <>
        <section className={"relative w-full sm:h-[38rem] sm:justify-center py-2 sm:p-4 flex flex-col items-center text-center " + italianaFont.className}>
            <Image
            className="absolute object-cover"
            src={rubyBg.src} fill
            alt="ruby gala"
            ></Image>
            <div className="py-4 px-3 lg:px-16 self-start">
                <a href="https://qplxqb.clicks.mlsend.com/tf/c/eyJ2Ijoie1wiYVwiOjgzMzg5MCxcImxcIjoxMzcxOTI2NTAzMTU5MjQ4OTcsXCJyXCI6MTM3MTkyNjYxNTA3Mzc2NDMyfSIsInMiOiJhOWZiYTBiN2ZiMzdmYjdjIn0">
                    <h1 className="relative flex flex-row gap-2 items-center top-[10%] sm:absolute sm:text-lg rounded-full bg-white hover:bg-gray-200 text-black font-serif leading-5 p-2 sm:p-3">
                        <Image
                        src={googleDriveIcon.src}
                        alt="google drive"
                        height={40}
                        width={40}></Image>
                        <span className="max-w-32 sm:max-w-40 underline text-blue-500">Add your memories & photos here!</span>
                    </h1>
                </a>
            </div>
            <h1 className={"relative text-7xl text-yellow-300 " + alexBrush.className}>Ruby Gala<br/>40th Anniversery</h1>
            <div className="relative flex flex-row gap-4 text-3xl tracking-wide text-yellow-300">
                <h1>SUNDAY</h1>
                <h1>DEC 8</h1>
                <h1>1-5PM</h1>
            </div>
            <h1 className="relative text-2xl py-7">THE IMPERIA BY DHABA</h1>
            <div className="relative flex flex-row gap-5">
                <a href="https://qplxqb.clicks.mlsend.com/tf/c/eyJ2Ijoie1wiYVwiOjgzMzg5MCxcImxcIjoxMzcxOTI2NTAzMjUzNjIwOTksXCJyXCI6MTM3MTkyNjYxNTA3Mzc2NDMyfSIsInMiOiIyYzllMTBhMGExOGZiNzA3In0">
                    <div className="relative bg-yellow-600 hover:bg-yellow-900 text-black hover:text-white text-2xl p-2">RSVP</div>
                </a>
                <h1 className="text-4xl">+</h1>
                <a href="https://qplxqb.clicks.mlsend.com/tf/c/eyJ2Ijoie1wiYVwiOjgzMzg5MCxcImxcIjoxMzcxOTI2NTAzMjk1NTY0MTUsXCJyXCI6MTM3MTkyNjYxNTA3Mzc2NDMyfSIsInMiOiI4OTQ1OGQ4NWQzYTc5ZDI1In0">
                    <div className="relative bg-yellow-600 hover:bg-yellow-900 text-black hover:text-white text-2xl p-2">
                        PAYMENT FORM
                    </div>
                </a>
            </div>
            <h1 className="relative justify-self-end text-md"><b>CELEBRATING 40 YEARS OF S.H.E. EXCELLENCE</b></h1>
        </section>
        </>
    );
}