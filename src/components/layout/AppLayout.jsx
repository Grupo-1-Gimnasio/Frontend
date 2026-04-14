import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-neutral-800 p-4">
        <h1 className="text-lg font-semibold">Lorza's Fitness</h1>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
