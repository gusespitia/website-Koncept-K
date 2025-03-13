"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        Koncept K
      </Link>

      {/* Menú Desktop */}
      <div className="hidden md:flex space-x-6">
        <Link href="/" className="hover:text-gray-600">Inicio</Link>
        <Link href="/productos" className="hover:text-gray-600">Productos</Link>
        <Link href="/contacto" className="hover:text-gray-600">Contacto</Link>
     
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
            <DropdownMenuItem>
              <Link href="/">Inicio</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/productos">Productos</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/contacto">Contacto</Link>
            </DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

