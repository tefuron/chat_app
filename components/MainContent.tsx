import { ReactNode } from "react";
import Header from "./Header";

export default function MainContent({ children }: { children: ReactNode }) {
    return (
        <div className="grow flex flex-col">
            <Header />
            {children}
        </div>
    )
}
