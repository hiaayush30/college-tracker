import type { Metadata } from "next"
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export const metadata: Metadata = {
  title: "Assignments Dashboard",
  description: "Manage assignments easily",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SidebarProvider>
          {/* The sidebar itself */}
          <AppSidebar />

          {/* Content area */}
          <SidebarInset>
            {/* Mobile toggle button */}
            <header className="p-4 border-b flex items-center md:hidden">
              <SidebarTrigger />
              <h1 className="ml-2 font-semibold">Assignments Dashboard</h1>
            </header>

            <main className="flex-1 p-6">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
