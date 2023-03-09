import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const schema = z.object({
    channel_name: z.string().min(1, { message: "1文字以上必要です" }).max(10, { message: "最大10文字です" }),
    about_channel : z.string().min(1, { message: "1文字以上必要です" }),
})

export default function Add() {
    const router = useRouter()
    const session = useSession()
    const supabase = useSupabaseClient()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: any) => {
    const { user: { id } } = session!
    const { channel_name, about_channel } = data
    try {
        const { error } = await supabase
        .from('channels')
        .insert({ user_id: id, channel_name: channel_name, about_channel: about_channel })
        console.log("yes")
        router.push("/")
    } catch (e) {
        console.log("no")
    }
  }

  return (
    <div className="grow flex justify-center items-center">
        {session ? (
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 rounded-lg bg-violet-200">
            <div className='flex justify-center mb-4'>
              <span className='text-white text-lg font-extrabold'>チャンネル作成</span>
            </div>
            <div className='flex'>
              <input
                type="text"
                placeholder="チャンネル名"
                {...register('channel_name', {
                  required: true,
                })}
                className={`mb-4 p-1 border rounded-lg outline-none ${errors.channel_name ? "border-[#ff0000]" : "border-[#cccccc]"}`}
              />
              {errors.channel_name && (
                <span className='ml-1 pt-1 text-[#ff0000]'>{errors.channel_name.message as string}</span>
              )}
            </div>
            <div className='flex'>
              <textarea
                  rows={4}
                placeholder="このチャンネルについて"
                {...register('about_channel', {
                  required: true
                })}
                className={`mb-4 p-1 border rounded-lg outline-none ${errors.about_channel ? "border-[#ff0000]" : "border-[#cccccc]"}`}
              />
              {errors.about_channel && (
                <span className='ml-1 pt-1 text-[#ff0000]'>{errors.about_channel.message as string}</span>
              )}
            </div>
            <div>
              <button type="submit" className='relative h-12 w-full rounded-3xl text-white font-nikukyu bg-gradient-to-r from-[#aeeec1] to-[#94e7e9] hover:from-[#eee0ae] hover:to-[#e99494] hover:top-[2px]'>
                  さくせい
              </button>
            </div>
          </form>
        ):(
            <div>ログインしてください</div>
        )}
    </div>
  )
}