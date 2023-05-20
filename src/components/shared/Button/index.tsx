import Link from "next/link"
import { FC } from "react"

interface propsType {
    text: string,
    hrefB: string,
    isBackgroud: boolean,
}

const Button: FC<propsType> = ({ text, hrefB, isBackgroud }) => {
    return (
        <Link className={`py-1 px-3 border border-purple-800 rounded-sm 
        ${isBackgroud ? "bg-purple-600 text-gray-200" : "border border-purple-600"}
        ${isBackgroud ? "hover:bg-transparent hover:border hover:border-purple-600 duration-500 hover:text-gray-700" : "hover:bg-purple-600 hover:border-none hover:text-gray-200 duration-500"}
        `} href={hrefB ? hrefB : "#"}>{text}</Link>
    )
};

export default Button