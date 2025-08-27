"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Plus, List, User, Settings, LogOut, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTheme } from "next-themes"

export function AppSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = React.useState("en")

  const links = [
    { href: "/dashboard/add", label: "Add Assignment", icon: Plus },
    { href: "/dashboard/view", label: "View Assignments", icon: List },
  ]

  const accountLinks = [
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/logout", label: "Logout", icon: LogOut },
  ]

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col justify-between h-full">
        {/* Features */}
        <div>
          <SidebarGroup>
            <SidebarGroupLabel>Features</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {links.map((link) => (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton asChild isActive={pathname === link.href}>
                      <Link href={link.href} className="flex items-center">
                        <link.icon className="mr-2 h-4 w-4" />
                        {link.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Account */}
        <div>
          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {accountLinks.map((link) => (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton asChild isActive={pathname === link.href}>
                      <Link href={link.href} className="flex items-center">
                        <link.icon className="mr-2 h-4 w-4" />
                        {link.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Theme + Language Controls */}
          <div className="p-3 space-y-3">
            {/* Theme toggle */}
            <Button
              variant="outline"
              size="sm"
              className="w-full flex items-center gap-2 cursor-pointer"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" /> Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" /> Dark Mode
                </>
              )}
            </Button>

            {/* Language Select */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ko">Korean</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
