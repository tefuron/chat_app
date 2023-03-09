import Link from "next/link";

export default function ChannelBox({ id, channel, isOdd }: { id: number, channel: any, isOdd: boolean }) {
    return (
      <Link href={`/channel/${id}`} className="w-2/4 h-48">
        <div className={`relative flex flex-col justify-center h-[184px] rounded-lg mt-2 ${isOdd ? "ml-2 mr-1" : "ml-1 mr-2"} p-2 bg-gray-300 hover:bg-red-300 hover:top-[-4px] hover:shadow-xl hover:cursor-pointer hover:text-white transition-all duration-300 ease-linear group`}>
          <p className="text-[3vw] self-center">{channel.channel_name}</p>
          <hr className="border-black border-dashed"/>
          <p className="text-[1.5vw] self-center">{channel.about_channel}</p>
        </div>
      </Link>
    )
  }