import { Logo } from "@/components/assets"
import Image from "next/image"

function Footer() {
    return (
        <footer className="bg-purple-200">
            <div className="py-3 container mx-auto flex justify-center md:justify-between items-center px-4">
                <div className="hidden text-gray-800 md:flex items-center gap-4">
                    <Image src={Logo} alt="abdulBasit" className="w-28" />
                    <p>All rights reserved</p>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="/">Home</a></li>
                        <li><a href="/chat">Chat</a></li>
                        <li><a href="https://abdulbasit-self.vercel.app/">About</a></li>
                        <li><a href="https://abdulbasit-self.vercel.app/">Contact</a></li>
                    </ul>
                </nav>
            </div>
            <div className="flex justify-center items-center bg-gray-800 text-gray-200">
                Designed & Developed by Abdul-Basit
            </div>
        </footer>
    )
}

export default Footer