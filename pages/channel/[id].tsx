import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { GetServerSideProps } from "next";
import { useEffect, useRef } from "react";
import InputMessage from "../../components/InputMessage";
import Message from "../../components/Message";
import { timeConvert } from "../../lib/timeConvert"

export default function Channel({ messages, distinct_user, channelId }: { messages: any, distinct_user: any, channelId: any }) {
    const user = useUser()
    // インデックス型を用いて空のオブジェクトを作成
    const userList: {
        [K: string]: string;
    } = {}
    // ユーザーのIDをキー、ユーザーネームを値としてオブジェクトを作成
    distinct_user.forEach((du: any) => {
        const { user_id, user_name }: { user_id: string, user_name: string } = du
        userList[user_id] = user_name
    })
    const scrollBottomRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        scrollBottomRef?.current?.scrollIntoView(false);
      }, []);
    
    return (
        <div className="h-[calc(100%_-_64px)] max-h-[calc(100%_-_64px)]">
            <div className="p-2 h-[calc(100%_-_64px)] max-h-[calc(100%_-_64px)] overflow-scroll">
                <div className="flex flex-col space-y-2" ref={scrollBottomRef}>
                    {messages.map((message: any) => {
                        const time = timeConvert(message.created_at)
                        const username = userList[message.user_id]
                        if (user) {
                            const isMine: boolean = user.id === message.user_id
                            return <Message key={message.id} isMine={isMine} message={message.message} username={username} time={time}/>
                        }
                        return <Message key={message.id} message={message.message} username={username} time={time}/>
                    })}
                </div>
            </div>
            <InputMessage channelId={channelId} />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const supabase = createServerSupabaseClient(context)
    const channelId = context.params?.id
    try {     
        let { data: messages, error: error1 } = await supabase
        .from('messages')
        .select("*")
        .eq('channel_id', channelId)
        
        let { data: distinct_user, error: error2 } = await supabase
        .from('distinct_user')
        .select('*')
        .eq('channel_id', channelId)

        return {
            props: {
                messages: messages,
                distinct_user: distinct_user,
                channelId: channelId,
            },
        }
    } catch (e) {
        return { notFound: true }
    }
}