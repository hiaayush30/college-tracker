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
import { Plus, List, User, Settings, LogOut, Notebook } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useLanguageStore } from "@/store/useLanguageStore"
import { translations } from "@/lib/translations"
import { ToggleButton } from "./toggle-button"

export function AppSidebar() {
  const pathname = usePathname()
  const { language, setLanguage } = useLanguageStore()
  const t = translations[language]

  const links = [
    { href: "/dashboard/add", label: t.addAssignment, icon: Plus },
    { href: "/dashboard/view", label: t.viewAssignments, icon: List },
    { href: "/dashboard/notes", label: t.notesgenerator, icon: Notebook },
  ]

  const accountLinks = [
    { href: "/profile", label: t.profile, icon: User },
    { href: "/settings", label: t.settings, icon: Settings },
    { href: "/logout", label: t.logout, icon: LogOut },
  ]

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col justify-between h-full">
        {/* Features */}
        <div>
          <SidebarGroup>
            <SidebarGroupLabel>{t.features}</SidebarGroupLabel>
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

        {/* Account + Controls */}
        <div>
          <SidebarGroup>
            <SidebarGroupLabel>{t.account}</SidebarGroupLabel>
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

              {/* Theme + Language Switch */}
              <div className="mt-4 flex gap-2">
                <ToggleButton />
                <Select
                  value={language}
                  onValueChange={(val) => setLanguage(val as "en" | "ko")}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ko">한국어</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
