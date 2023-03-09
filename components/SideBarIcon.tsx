import Link from "next/link"
import { ReactNode } from "react"

export default function SideBarIcon({ icon, text, linkTo = '' }: { icon: ReactNode, text: string, linkTo?: string }) {
    return (
        <Link href={`/${linkTo}`}>
            <div className="flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto
            bg-gray-800 hover:bg-green-600 text-green-500 hover:text-white rounded-3xl hover:rounded-xl
            transition-all duration-300 ease-linear group">
                {icon}
                <SideBarToolTip text={text}/>
            </div>
        </Link>
    )
}

function SideBarToolTip({ text }: { text: string}) {
    return (
        <span className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md
        text-white bg-gray-900 
        text-xs font-bold 
        transition-all duration-100 scale-0 origin-left group-hover:scale-100">
            {text}
        </span>
    )
}