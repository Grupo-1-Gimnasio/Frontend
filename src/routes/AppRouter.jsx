import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import HomePage from '../pages/HomePage'
import ActivitiesPage from '../pages/ActivitiesPage'
import ProfilePage from '../pages/ProfilePage'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
