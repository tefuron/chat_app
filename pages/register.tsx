import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const schema = z.object({
    user_name: z.string().min(1, { message: "1文字以上必要です" }).max(8, { message: "最大8文字です" }),
    personal_profile : z.string().min(1, { message: "1文字以上必要です" }),
})

export default function Register() {
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
    const { user_name, personal_profile } = data
    try {
        const { error } = await supabase
        .from('users')
        .update({ user_name: user_name, personal_profile: personal_profile })
        .eq('id', id)
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
              <span className='text-white text-lg font-extrabold'>プロフィール登録</span>
            </div>
            <div className='flex'>
              <input
                type="text"
                placeholder="ユーザーネーム"
                {...register('user_name', {
                  required: true,
                })}
                className={`mb-4 p-1 border rounded-lg outline-none ${errors.user_name ? "border-[#ff0000]" : "border-[#cccccc]"}`}
              />
              {errors.user_name && (
                <span className='ml-1 pt-1 text-[#ff0000]'>{errors.user_name.message as string}</span>
              )}
            </div>
            <div className='flex'>
              <textarea
                  rows={4}
                placeholder="プロフィール文"
                {...register('personal_profile', {
                  required: true
                })}
                className={`mb-4 p-1 border rounded-lg outline-none ${errors.personal_profile ? "border-[#ff0000]" : "border-[#cccccc]"}`}
              />
              {errors.personal_profile && (
                <span className='ml-1 pt-1 text-[#ff0000]'>{errors.personal_profile.message as string}</span>
              )}
            </div>
            <div>
              <button type="submit" className='relative h-12 w-full rounded-3xl text-white font-nikukyu bg-gradient-to-r from-[#aeeec1] to-[#94e7e9] hover:from-[#eee0ae] hover:to-[#e99494] hover:top-[2px]'>
                  とうろく
              </button>
            </div>
          </form>
        ):(
            <div>ログインしてください</div>
        )}
    </div>
  )
}