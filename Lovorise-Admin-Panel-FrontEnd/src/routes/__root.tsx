import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { AppSidebar } from '../components/app-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

export const Route = createRootRoute({
  component: () => (
    <SidebarProvider className="!bg-red-800">
      <div className="flex min-h-screen !w-full">
        <AppSidebar className="!bg-gray-50 dark:bg-gray-900" />
        <SidebarInset className="flex-1">
          <main className="flex-1 p-6">
            <Outlet />
          </main>
          {/* <TanStackRouterDevtools /> */}
        </SidebarInset>
      </div>
    </SidebarProvider>
  ),
})
