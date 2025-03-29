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
    <nav className="grid grid-cols-3 items-center justify-between px-2 py-0 shadow-md bg-[#EDBCA4]">
      {/* Logo */}
      <Link href="/" className="text-xl ml-4">
        <span className="font-bold">K</span>oncept <span className="font-bold">K.</span>
      </Link>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="py-2 justify-self-center"
        />
      </Link>
      {/* Menú Desktop */}
      <div className="hidden md:flex space-x-4 justify-end">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`hover:text-gray-800 font-bold mr-4 transition duration-700 hover:scale-110  ${
              pathname === item.href
                ? "text-white border-b-2 border-b-white transition duration-700"
                : "text-gray-600"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Menú Móvil */}
      <div className="md:hidden flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {menu.map((item) => (
              <DropdownMenuItem
                key={item.name}
                className={pathname === item.href ? "bg-blue-50" : ""}
              >
                <Link
                  href={item.href}
                  className={`w-full ${
                    pathname === item.href ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {item.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
