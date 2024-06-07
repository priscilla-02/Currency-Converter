import { useState } from "react";

interface NavBarProps {
  selectMenu: string
  setSelectMenu: React.Dispatch<React.SetStateAction<"currency" | "crypto">>;
}

export const NavBar: React.FC<NavBarProps> = ({ selectMenu, setSelectMenu }) => {

  return (
    <nav className=' bg-indigo-950 rounded-t-lg text-white h-[80px] flex justify-center items-center'>
      <h3 className={`mx-6 animated-underline cursor-pointer ${selectMenu === "currency" ? "selected" : ""}`} onClick={() => setSelectMenu("currency")}>Currency</h3>
      <h3 className={`mx-6 animated-underline cursor-pointer ${selectMenu === "crypto" ? "selected" : ""}`} onClick={() => setSelectMenu("crypto")}>Crypto</h3>
    </nav>

  )
}