//@ts-nocheck

import SideBarSort from "@/app/(group)/SideBarSort";

export default function layout({ children }) {
  return (
    <div className="flex ">
      <div className="fixed hidden sm:flex top-10 w-xs
      left-0 h-screen z-40" >
        <SideBarSort />
      </div>
      <div className="flex-1 lg:ml-[320px] ">{children}</div>
    </div>
  );
}
