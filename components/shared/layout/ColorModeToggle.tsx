'use client'
import { Button } from '@/components/ui/button'
import { MoonStarIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const getInitialTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "light"

    const stored = localStorage.getItem("theme") as "light" | "dark" | null
    if (stored) return stored

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
}


const ColorModeToggle = () => {

    const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme)


    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark")
        localStorage.setItem("theme", theme)
    }, [theme])



    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark"

        setTheme(next)
        localStorage.setItem("theme", next)
        document.documentElement.classList.toggle("dark", next === "dark")
    }

    return (
        <Button
            onClick={toggleTheme}
            variant="secondary"
            className="border  flex items-center gap-2"
        >
            <MoonStarIcon />
            {theme === "dark" ? "Go light" : "Go dark"}
        </Button>
    )
}

export default ColorModeToggle