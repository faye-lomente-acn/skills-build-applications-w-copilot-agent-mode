import { useEffect, useState } from 'react'
import { fetchCollection, getApiBaseUrl } from '../config/api'

const codespaceEndpointPattern = 'https://YOUR_CODESPACE_NAME-8000.app.github.dev/api/teams/'
const endpointPath = '/api/teams/'

function Teams() {
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTeams() {
      try {
        const payload = await fetchCollection('teams')
        setItems(payload.items)
        setPagination(payload.pagination)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load teams')
      }
    }

    loadTeams()
  }, [])

  return (
    <section className="bg-white rounded-4 shadow-sm border p-4 p-lg-5">
      <p className="eyebrow mb-2">Teams</p>
      <h2 className="h3 mb-3">Team standings and focus</h2>
      <p className="text-secondary mb-1">Endpoint: {`${getApiBaseUrl()}${endpointPath}`}</p>
      <p className="small text-secondary mb-3">Codespaces pattern: {codespaceEndpointPattern}</p>
      {pagination ? <p className="small text-secondary">Page {pagination.page ?? 1}</p> : null}
      {error ? <p className="text-danger mb-0">{error}</p> : null}
      {!error && items.length === 0 ? <p className="mb-0">No teams found.</p> : null}
      {!error && items.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Focus</th>
                <th>Members</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {items.map((team) => (
                <tr key={team._id || team.name}>
                  <td>{team.name || '-'}</td>
                  <td>{team.city || '-'}</td>
                  <td>{team.focus || '-'}</td>
                  <td>{Array.isArray(team.members) ? team.members.length : '-'}</td>
                  <td>{team.points ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  )
}

export default Teams