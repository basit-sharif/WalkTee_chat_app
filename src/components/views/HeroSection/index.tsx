import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="w-screen h-[50vh] md:h-[56vh] flex flex-col justify-center items-center text-gray-500 text-xl md:text-5xl font-semibold border">
                <h1>Chat makes life easy</h1>
                <h2>Lets get in touch with love</h2>
            <Link href={"/chat"} className="mt-4 md:mt-7 border shadow-xl rounded-lg hover:bg-gray-100 py-2 px-3 md:px-7 text-base font-normal">Send Your first text</Link>
        </div>
    )
}