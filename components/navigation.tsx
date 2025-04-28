"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Beaker, Home, FileInput, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/input", label: "Analyze Reaction", icon: FileInput },
    { href: "/developers", label: "Developers", icon: Users },
  ]

  return (
    <header className="border-b border-green-800/30 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Beaker className="h-6 w-6 text-green-400" />
            <span className="text-xl font-bold text-white">Green Chemistry Helper</span>
          </div>
          <nav className="flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-green-800/50 text-green-300"
                      : "text-gray-300 hover:bg-green-800/30 hover:text-green-200",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
