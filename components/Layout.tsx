import SideBar from "../components/SideBar";
import ChannelBar from "../components/ChannelBar";
import MainContent from "./MainContent";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className='flex h-screen max-h-screen'>
            <SideBar />
            <ChannelBar />
            <MainContent>
                {children}
            </MainContent>
        </div>
    )
}