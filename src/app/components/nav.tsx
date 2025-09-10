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

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Dashboard Button for signed-in users */}
            <SignedIn>
              <Link href="/dashboard">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-2xl px-4 py-2 shadow">
                  Dashboard
                </Button>
              </Link>
            </SignedIn>

            {/* Profile button for signed-in users */}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* Sign in button for signed-out users */}
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
    </nav>
  );
}
