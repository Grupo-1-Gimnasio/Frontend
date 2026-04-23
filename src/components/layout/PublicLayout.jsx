import { Outlet } from 'react-router-dom'
import AccessibilityWidget from './AccessibilityWidget'
import HashScroll from './HashScroll'
import Navbar from './Navbar'

function PublicLayout() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <a
        href="#main-content"
        className="absolute -top-8 left-0 z-50 bg-orange-500 px-4 py-2 text-black font-semibold focus:top-0 transition-all duration-200"
      >
        Ir al contenido principal
      </a>
      <Navbar />
      <HashScroll />
      <main id="main-content" className="mx-auto w-full max-w-6xl px-6 pb-10">
        <Outlet />
      </main>
      <AccessibilityWidget />
    </div>
  )
}

export default PublicLayout
