import { Outlet } from 'react-router-dom'
import AccessibilityWidget from './AccessibilityWidget'
import ManagementSidebar from './ManagementSidebar'

function ManagementLayout() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white md:flex">
      <ManagementSidebar />
      <main className="flex-1 bg-neutral-950 p-6">
        <Outlet />
      </main>
      <AccessibilityWidget />
    </div>
  )
}

export default ManagementLayout
