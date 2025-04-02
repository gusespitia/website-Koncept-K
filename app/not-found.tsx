"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shirt } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with logo/back button */}
        <header className="pt-4">
          <Link href="/" className="flex items-center gap-2">
            <Shirt className="h-6 w-6 text-gray-900" />
          </Link>
        </header>

        {/* 404 Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between   gap-12">
          {/* Left Column - Text */}
          <div className="max-w-md space-y-4">
            <span className="text-sm font-medium text-gray-500">404 ERROR</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Lost in Style
            </h1>
            <p className="text-lg text-gray-600">
              The page you&apos;re looking for isn&apos;t available. But
              don&apos;t worry - our latest collections are always within reach.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild className="gap-2">
                <Link href="/">
                  Return to Home
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/shop">Explore Collections</Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Fashion Image */}
          <div className="relative w-full max-w-lg aspect-square">
            <Image
              src="/store6.jpg" // Replace with your fashion image
              alt="Stylish man looking at clothes"
              fill
              className="object-cover rounded-lg shadow-xl"
              priority
            />
            <div className="absolute -bottom-6 -right-6 bg-white px-6 py-3 rounded-lg shadow-md border border-gray-100">
              <p className="text-sm font-medium text-gray-900">New Arrivals</p>
              <p className="text-xs text-gray-500">Spring Collection 2025</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
