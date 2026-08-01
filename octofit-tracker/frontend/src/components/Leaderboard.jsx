import { useEffect, useMemo, useState } from 'react'
import { fetchCollection, getApiBaseUrl } from '../config/api'

const codespaceEndpointPattern = 'https://YOUR_CODESPACE_NAME-8000.app.github.dev/api/leaderboard/'
const endpointPath = '/api/leaderboard/'

function Leaderboard() {
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const payload = await fetchCollection('leaderboard')
        setItems(payload.items)
        setPagination(payload.pagination)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load leaderboard')
      }
    }

    loadLeaderboard()
  }, [])

  const standings = useMemo(() => {
    return items.flatMap((entry) => {
      if (!Array.isArray(entry.standings)) {
        return []
      }

      return entry.standings.map((standing) => ({
        ...standing,
        periodLabel: entry.periodLabel,
        updatedAtLabel: entry.updatedAtLabel,
      }))
    })
  }, [items])

  return (
    <section className="bg-white rounded-4 shadow-sm border p-4 p-lg-5">
      <p className="eyebrow mb-2">Leaderboard</p>
      <h2 className="h3 mb-3">Competitive rankings</h2>
      <p className="text-secondary mb-1">Endpoint: {`${getApiBaseUrl()}${endpointPath}`}</p>
      <p className="small text-secondary mb-3">Codespaces pattern: {codespaceEndpointPattern}</p>
      {pagination ? <p className="small text-secondary">Page {pagination.page ?? 1}</p> : null}
      {error ? <p className="text-danger mb-0">{error}</p> : null}
      {!error && standings.length === 0 ? <p className="mb-0">No leaderboard standings found.</p> : null}
      {!error && standings.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Score</th>
                <th>Streak</th>
                <th>Period</th>
              </tr>
            </thead>
            <tbody>
              {standings
                .slice()
                .sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))
                .map((standing, index) => (
                  <tr key={`${standing.teamName}-${index}`}>
                    <td>{standing.rank ?? '-'}</td>
                    <td>{standing.teamName || '-'}</td>
                    <td>{standing.score ?? '-'}</td>
                    <td>{standing.streakDays ?? '-'} days</td>
                    <td>{standing.periodLabel || '-'}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  )
}

export default Leaderboard