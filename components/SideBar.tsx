import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
import { FaHome, FaUserAlt } from 'react-icons/fa';
import SideBarIcon from './SideBarIcon';

export default function SideBar() {
    return (
        <div className="basis-16 min-w-[4rem] flex flex-col bg-gray-900 text-white shadow-lg">
            <SideBarIcon icon={<FaHome size="28" />} text="トップに戻る" />
            <SideBarIcon icon={<BsPlus size="32" />} text="チャンネルを追加" linkTo='add' />
            <SideBarIcon icon={<BsFillLightningFill size="20" />} text="最新" />
            <SideBarIcon icon={<FaUserAlt size="20" />} text="ユーザー" linkTo='register' />
            <SideBarIcon icon={<BsGearFill size="22" />} text="設定" linkTo='setting' />
        </div>
    )
}