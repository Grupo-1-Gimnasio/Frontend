import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicLayout from '../components/layout/PublicLayout'
import ManagementLayout from '../components/layout/ManagementLayout'
import HomePage from '../pages/public/HomePage'
import ActivitiesPage from '../pages/public/ActivitiesPage'
import ProfessorsPage from '../pages/public/ProfessorsPage'
import ComingSoon from '../pages/public/ComingSoon'
import EventsPage from '../pages/public/EventsPage'
import ManagementDashboardPage from '../pages/management/ManagementDashboardPage'
import ManagementUsersPage from '../pages/management/ManagementUsersPage'
import ManagementActivitiesPage from '../pages/management/ManagementActivitiesPage'
import ManagementProfessorsPage from '../pages/management/ManagementProfessorsPage'
import ManagementUserActivitiesPage from '../pages/management/ManagementUserActivitiesPage'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/professors" element={<ProfessorsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Route>

        <Route path="/dashboard" element={<ManagementLayout />}>
          <Route index element={<ManagementDashboardPage />} />
          <Route path="users" element={<ManagementUsersPage />} />
          <Route path="activities" element={<ManagementActivitiesPage />} />
          <Route
            path="user-activities"
            element={<ManagementUserActivitiesPage />}
          />
          <Route path="professors" element={<ManagementProfessorsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
