"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menu = [
    { name: "Home", href: "/" },
    { name: "Over ons", href: "/overons" },
    { name: "Merken", href: "/merken" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[var(--color-store)] shadow-md">
      <div className="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo y marca */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="hidden md:block">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={80}
                  height={80}
                  priority
                  className="h-auto w-16"
                />
              </div>
              <span className="ml-2 text-xl   md:ml-4">
              <span className="font-bold">K</span>oncept{" "}
              <span className="font-bold">K.</span>
              </span>
            </Link>
          </div>

          {/* Menú Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {menu.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`hover:text-gray-800 font-bold mr-4  duration-700 hover:scale-110 px-3 py-0 text-md  transition-all duration-300  ${
                    pathname === item.href
                      ? "text-white border-b-2 border-b-white transition duration-700"
                      : "text-gray-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Menú Móvil */}
          <div className="flex md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 hover:text-white focus:outline-none"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white shadow-lg"
              >
                {menu.map((item) => (
                  <DropdownMenuItem
                    key={item.name}
                    className={`${
                      pathname === item.href ? "bg-gray-100" : ""
                    } focus:bg-gray-100`}
                  >
                    <Link
                      href={item.href}
                      className={`w-full px-4 py-2 text-sm ${
                        pathname === item.href
                          ? "text-blue-600 font-medium"
                          : "text-gray-700"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}