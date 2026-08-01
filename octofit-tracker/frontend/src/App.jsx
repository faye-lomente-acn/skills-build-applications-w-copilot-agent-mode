import { useEffect, useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { fetchJson, getApiBaseUrl } from './config/api'
import './App.css'

const featureCards = [
  {
    title: 'Activity Logging',
    description: 'Track workouts, streaks, and performance in one place.',
  },
  {
    title: 'Team Competition',
    description: 'Create squads, compare progress, and drive accountability.',
  },
  {
    title: 'Workout Suggestions',
    description: 'Use the app shell to connect personalized routines next.',
  },
]

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
]

function Shell({ children }) {
  return (
    <div className="app-shell bg-body-tertiary min-vh-100">
      <header className="border-bottom bg-white shadow-sm">
        <div className="container py-3 d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
          <div>
            <p className="eyebrow mb-1">OctoFit Tracker</p>
            <h1 className="h3 mb-0">Modern multi-tier fitness platform</h1>
          </div>
          <nav className="nav nav-pills flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : 'text-secondary'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-5">{children}</main>
    </div>
  )
}

function OverviewPage() {
  const [usersCount, setUsersCount] = useState(null)
  const [activitiesCount, setActivitiesCount] = useState(null)
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    async function loadApiSnapshot() {
      try {
        const [usersResponse, activitiesResponse] = await Promise.all([
          fetchJson('/api/users/'),
          fetchJson('/api/activities/'),
        ])

        setUsersCount(usersResponse.count)
        setActivitiesCount(activitiesResponse.count)
        setApiError('')
      } catch (error) {
        setApiError(error instanceof Error ? error.message : 'Failed to load API data')
      }
    }

    loadApiSnapshot()
  }, [])

  return (
    <>
      <section className="hero-panel rounded-4 p-4 p-lg-5 mb-4 text-white overflow-hidden">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <p className="eyebrow text-uppercase mb-2">Ready for integration</p>
            <h2 className="display-5 fw-semibold mb-3">Frontend initialized on port 5173</h2>
            <p className="lead text-white-50 mb-4">
              React 19, Vite, React Router, and Bootstrap are in place so the
              presentation tier can connect cleanly to the API on port 8000.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <span className="badge text-bg-light px-3 py-2">React 19</span>
              <span className="badge text-bg-light px-3 py-2">Vite</span>
              <span className="badge text-bg-light px-3 py-2">Bootstrap</span>
              <span className="badge text-bg-light px-3 py-2">React Router</span>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="status-card rounded-4 p-4 bg-white text-dark shadow">
              <p className="text-secondary mb-2">Service endpoints</p>
              <ul className="list-unstyled mb-0 small">
                <li className="py-2 border-bottom">Frontend: http://localhost:5173</li>
                <li className="py-2 border-bottom">Backend API: {getApiBaseUrl()}/api</li>
                <li className="py-2">MongoDB: mongodb://localhost:27017/octofit_db</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="api-snapshot rounded-4 p-4 mb-4 bg-white border shadow-sm">
        <p className="eyebrow mb-2">Live API snapshot</p>
        {apiError ? (
          <p className="text-danger mb-0">Unable to fetch API data: {apiError}</p>
        ) : (
          <div className="d-flex flex-wrap gap-3">
            <span className="badge text-bg-secondary px-3 py-2">
              Users: {usersCount ?? 'Loading...'}
            </span>
            <span className="badge text-bg-secondary px-3 py-2">
              Activities: {activitiesCount ?? 'Loading...'}
            </span>
          </div>
        )}
      </section>

      <section className="row g-4">
        {featureCards.map((card) => (
          <div key={card.title} className="col-md-4">
            <article className="feature-card h-100 rounded-4 p-4 bg-white shadow-sm border">
              <h3 className="h5 mb-3">{card.title}</h3>
              <p className="text-secondary mb-0">{card.description}</p>
            </article>
          </div>
        ))}
      </section>
    </>
  )
}

function SectionPage({ title, description }) {
  return (
    <section className="bg-white rounded-4 shadow-sm border p-4 p-lg-5">
      <p className="eyebrow mb-2">Application module</p>
      <h2 className="h3 mb-3">{title}</h2>
      <p className="text-secondary mb-0">{description}</p>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route
            path="/activities"
            element={
              <SectionPage
                title="Activities"
                description="The activity logging surface is scaffolded and ready for API-backed workout entries."
              />
            }
          />
          <Route
            path="/teams"
            element={
              <SectionPage
                title="Teams"
                description="The team management section is ready for membership, challenges, and role-based workflows."
              />
            }
          />
          <Route
            path="/leaderboard"
            element={
              <SectionPage
                title="Leaderboard"
                description="The competitive leaderboard view is ready for rankings and progress metrics from the backend."
              />
            }
          />
        </Routes>
      </Shell>
    </BrowserRouter>
  )
}

export default App
