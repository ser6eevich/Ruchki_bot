"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"

interface LinkTransitionProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function LinkTransition({ href, children, className }: LinkTransitionProps) {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
    // Small delay before navigation for smooth transition
    setTimeout(() => {
      // Navigation will happen automatically due to Link component
    }, 150)
  }

  return (
    <Link
      href={href}
      className={`${className} transition-all duration-300 ${isClicked ? "opacity-70 scale-95" : ""}`}
      onClick={handleClick}
    >
      {children}
    </Link>
  )
}
