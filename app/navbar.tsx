"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menu = [
    { name: "Home", href: "/" },
    { name: "Over ons", href: "/overons" },
    { name: "Merken", href: "/merken" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="flex items-center justify-between p-8 shadow-md bg-[#EDBCA4]">
      {/* Logo */}
      
      <Link href="/" className="text-xl font-bold">
        Koncept K
      </Link>
      <Image
        src="/logo.png"
        alt="Logo"
        width={100}
        height={100}
        className="mr-4"
      />
      {/* Menú Desktop */}
      <div className="hidden md:flex space-x-6">
       
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-gray-600 hover:text-gray-800"
          >
            {item.name}
          </Link>
       ))}
     
      </div>

      {/* Menú Móvil */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {menu.map((item) => (
              <DropdownMenuItem key={item.name}>
                <Link href={item.href}>{item.name}</Link>
              </DropdownMenuItem>
            ))}
           
            
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

