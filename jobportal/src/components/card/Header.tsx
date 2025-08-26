"use client";

import { Briefcase } from "lucide-react";
import Link from "next/link";
import DialogCard from "./DialogCard";
import SearchBarInput from "../SearchBarInput";
import AddJob from "./AddJob";

export default function Header() {
  return (
    <header className="shadow-sm bg-slate-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className=" items-center space-x-2 hidden md:flex">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">JobPortal</span>
          </Link>
          <nav className="hidden md:flex space-x-8 ">
            <Link
              href="/jobs"
              className=" hover:text-blue-600 transition-colors"
            >
              Find Jobs
            </Link>
            <Link
              href="/company"
              className=" hover:text-blue-600 transition-colors"
            >
              Company
            </Link>
            <Link
              href="/saved"
              className=" hover:text-blue-600 transition-colors"
            >
              Saved Jobs
            </Link>
            <AddJob/>
          </nav>
          <nav className="flex items-center justify-center md:hidden">
            <SearchBarInput />
          </nav>
          
          <div className="p-2">
            <DialogCard />
          </div>
          
        </div>
      </div>
    </header>
  );
}
