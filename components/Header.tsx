import { useSession } from "@supabase/auth-helpers-react"
import Link from "next/link"
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Header() {
    const session = useSession()
    const supabaseClient = useSupabaseClient()

    return (
        <header>
            <div className="flex flex-row-reverse bg-gray-500 h-16">
                {!session ? (
                    <div className="flex justify-center items-center">
                        <Link className="relative m-2 bg-gradient-to-r from-[#aeeec1] to-[#94e7e9] hover:from-[#eee0ae] hover:to-[#e99494] hover:top-[2px] text-white rounded-3xl p-2 font-nikukyu" href="/login">ログイン</Link>
                    </div>
                ) : (
                    <div className="flex justify-center items-center">
                        <button className="relative m-2 bg-gradient-to-r from-[#aeeec1] to-[#94e7e9] hover:from-[#eee0ae] hover:to-[#e99494] hover:top-[2px] text-white rounded-3xl p-2 font-nikukyu" onClick={() => supabaseClient.auth.signOut()}>ログアウト</button>
                    </div>
                )}
            </div>
        </header>
    )
}