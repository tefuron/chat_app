export default function Message({ isMine = false, message, username, time }: { isMine?: boolean, message: string, username: string, time: string }) {

    return (
      <div className={`flex flex-col text-xs w-full max-w-xs rounded-lg ${isMine ? "bg-yellow-200" : "bg-gray-300 self-end"}`}>
        <div className='flex items-stretch m-1 px-4'>
          <div className='h-8 w-8 rounded-full bg-gray-500'></div>
          <div className='flex-grow flex ml-2 mr-1 items-center justify-between'>
            <div className=''><span className='text-gray-600'>{username}</span></div>
            <div className='self-end'><span className='text-gray-400'>{time}</span></div>
          </div>
        </div>
        <div className='px-2'><hr className='border-gray-500'/></div>
        <div className='m-1 px-4'><span className="text-gray-600">{message}</span></div>
      </div>
    )
}
