"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Moon, Sun } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import LinkTransition from "./components/link-transition"
import PageTransition from "./components/page-transition"

export default function NewsletterSignup() {
  // Initialize theme from localStorage immediately
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      return savedTheme === "dark"
    }
    return false
  })
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const toggleTheme = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      const newTheme = !isDark
      setIsDark(newTheme)
      // Save theme to localStorage
      localStorage.setItem("theme", newTheme ? "dark" : "light")
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, 150)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const newErrors: { email?: string; password?: string } = {}

    if (!email || email.trim() === "") {
      newErrors.email = "Email обязателен для заполнения"
    }

    if (!password || password.trim() === "") {
      newErrors.password = "Пароль обязателен для заполнения"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, proceed with login
      console.log("Login attempt:", { email, password })
      // Here you would typically make an API call

      // Redirect to dashboard after successful login
      window.location.href = "/dashboard"
    }
  }

  return (
    <PageTransition>
      <div
        className={`min-h-screen flex flex-col transition-all duration-500 ease-in-out ${
          isTransitioning ? "opacity-90" : "opacity-100"
        }`}
        style={{
          backgroundImage: isDark ? "url(/background-dark.png)" : "url(/background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Logo at the top */}
        <div
          className={`flex justify-center pt-4 transition-all duration-700 delay-200 ${
            isTransitioning ? "opacity-80" : "opacity-100"
          }`}
        >
          <Image
            src={isDark ? "/logo-dark.png" : "/logo.png"}
            alt="SRP Logo"
            width={200}
            height={150}
            className="transition-all duration-500"
          />
        </div>

        {/* Centered form content */}
        <div className="flex-1 flex items-start justify-center pt-12 p-4">
          <div
            className={`w-full max-w-xs transition-all duration-700 delay-300 ${
              isTransitioning ? "opacity-80" : "opacity-100"
            }`}
          >
            <h1
              className={`text-[46px] font-bold text-center mb-8 transition-colors duration-500 ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              Вход
            </h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div className="flex flex-col items-center">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`h-10 border-0 rounded-full placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 w-full max-w-xs transition-all duration-500 ${
                    isDark ? "bg-gray-700 text-white focus:bg-gray-600" : "bg-[#D9D9D9] text-gray-800 focus:bg-white"
                  } ${errors.email ? "ring-2 ring-red-500" : ""}`}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs mt-1 self-start max-w-xs animate-pulse">{errors.email}</span>
                )}
              </div>

              <div className="flex flex-col items-center">
                <Input
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  className={`h-10 border-0 rounded-full placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 w-full max-w-xs transition-all duration-500 ${
                    isDark ? "bg-gray-700 text-white focus:bg-gray-600" : "bg-[#D9D9D9] text-gray-800 focus:bg-white"
                  } ${errors.password ? "ring-2 ring-red-500" : ""}`}
                />
                {errors.password && (
                  <span className="text-red-500 text-xs mt-1 self-start max-w-xs animate-pulse">{errors.password}</span>
                )}
              </div>

              <div className="text-right mb-4">
                <a
                  href="#"
                  className={`text-xs hover:opacity-80 transition-all duration-300 hover:translate-x-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Забыли пароль?
                </a>
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="px-6 h-10 bg-[#4262FF] hover:bg-[#3651E6] text-white font-medium rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                >
                  Войти
                </Button>
              </div>
            </form>

            <div className="text-center mb-6">
              <LinkTransition
                href="/register"
                className={`text-xs hover:opacity-80 transition-all duration-300 hover:scale-105 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Зарегистрироваться
              </LinkTransition>
            </div>
          </div>
        </div>

        {/* Theme toggle button */}
        <div className="fixed bottom-6 right-6">
          <Button
            onClick={toggleTheme}
            disabled={isTransitioning}
            className={`w-12 h-12 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              isDark ? "bg-gray-700 hover:bg-gray-600 text-yellow-400" : "bg-white hover:bg-gray-100 text-gray-800"
            } ${isTransitioning ? "animate-spin" : ""}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
      </div>
    </PageTransition>
  )
}
