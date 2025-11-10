"use client";

import Link from "next/link";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <Link href="/" className="text-2xl font-bold text-black">
            Care<span className="text-blue-600">.</span>
          </Link>

          {/* Navigation & Buttons */}
          <div className="flex items-center space-x-6">
            {/* Navigation Links */}
            <div className="hidden md:flex space-x-4">
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Contact
              </Link>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <SignedIn>
                <Link href="/dashboard">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-2xl px-4 py-2 shadow">
                    Dashboard
                  </Button>
                </Link>
              </SignedIn>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-2xl px-4 py-2 shadow">
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
