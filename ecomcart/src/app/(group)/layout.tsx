//@ts-nocheck

import Header from "@/components/Header";

export default function layout({children,modal}) {
    return (
        <div>
            <Header/>
            {modal}
            {children}
        </div>
    )
}
