import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function PublicLayout() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  )
}

export default PublicLayout
