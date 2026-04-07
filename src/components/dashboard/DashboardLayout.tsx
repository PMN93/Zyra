import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background gap-3">
      <Sidebar />
      <div className="flex flex-1 min-w-0 flex-col gap-3 overflow-hidden py-3 pr-3">
        <Outlet />
      </div>
    </div>
  )
}
