import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useReducer } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineChevronDoubleRight } from "react-icons/hi2";

export default function InputMessage({ channelId }: { channelId: any }) {
    const session = useSession()
    const supabase = useSupabaseClient()
    const { register, handleSubmit } = useForm();
    const router = useRouter()

    const onSubmit = async (data: any) => {
        const { user: { id } } = session!
        const { text } = data
        try {        
            const { data, error } = await supabase
            .from('messages')
            .insert({ channel_id: channelId, user_id: id, message: text })
            console.log("yes")
            router.reload()
        } catch (e) {
            console.log("no")
        }
    }

    return (
      <div className="p-2 h-16 flex items-center bg-slate-300">
        <form onSubmit={handleSubmit(onSubmit)} className="grow flex">
            <input
                type="text"
                placeholder={session ? "メッセージを入力" : "ログイン後に入力できます"}
                {...register('text', {
                required: true,
                })}
                className="w-full p-2 border rounded-lg outline-none border-[#cccccc]"
                disabled={session ? false : true}
            />
            <button type="submit" disabled={session ? false : true} className="ml-2">
                <HiOutlineChevronDoubleRight size={24} />
            </button>
        </form>
      </div>
    )
}