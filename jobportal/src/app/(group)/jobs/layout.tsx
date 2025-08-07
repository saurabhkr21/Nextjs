//@ts-nocheck

import SideBarSort from "@/app/(group)/SideBarSort";

export default function layout({ children }) {
  return (
    <div className="flex ">
      <div className="fixed hidden sm:flex top-20
      left-0 h-[calc(100vh-5rem)] z-40" >
        <SideBarSort />
      </div>
      <div className="flex-1 lg:ml-[280px] ">{children}</div>
    </div>
  );
}
