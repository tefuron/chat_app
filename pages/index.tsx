import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import ChannelBox from "../components/ChannelBox"

export default function Home({ channels }: { channels: any }) {
  return (
    <div className="flex justify-start flex-wrap overflow-auto pb-2">
      {channels.map((channel: any, index: number) => {
        const isOdd = index % 2 === 0
        return <ChannelBox key={channel.id} id={channel.id} channel={channel} isOdd={isOdd} />
      })}
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const supabase = createServerSupabaseClient(context)
  const { data: { user } } = await supabase.auth.getUser()

  try {     
    
    let { data: channels, error: error1 } = await supabase
    .from('channels')
    .select('id,channel_name,about_channel')

    if (user) {
      let { data: user_name, error: error1 } = await supabase
      .from('users')
      .select('user_name')
      .eq('id', user.id)
      .single()
      if (!user_name?.user_name) {
        return {
          redirect: {
            permanent: false,
            destination: '/register'
          }
        }
      }
    }

    return {
      props: {
        channels: channels,
      },
    }
  } catch (e) {
    return { notFound: true }
  }
}