import { useEffect, useState } from 'react'
import { fetchCollection, getApiBaseUrl } from '../config/api'

const codespaceEndpointPattern = 'https://YOUR_CODESPACE_NAME-8000.app.github.dev/api/users/'
const endpointPath = '/api/users/'

function Users() {
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadUsers() {
      try {
        const payload = await fetchCollection('users')
        setItems(payload.items)
        setPagination(payload.pagination)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load users')
      }
    }

    loadUsers()
  }, [])

  return (
    <section className="bg-white rounded-4 shadow-sm border p-4 p-lg-5">
      <p className="eyebrow mb-2">Users</p>
      <h2 className="h3 mb-3">Athlete profiles</h2>
      <p className="text-secondary mb-1">Endpoint: {`${getApiBaseUrl()}${endpointPath}`}</p>
      <p className="small text-secondary mb-3">Codespaces pattern: {codespaceEndpointPattern}</p>
      {pagination ? <p className="small text-secondary">Page {pagination.page ?? 1}</p> : null}
      {error ? <p className="text-danger mb-0">{error}</p> : null}
      {!error && items.length === 0 ? <p className="mb-0">No users found.</p> : null}
      {!error && items.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Level</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {items.map((user) => (
                <tr key={user._id || user.email}>
                  <td>{user.name || '-'}</td>
                  <td>{user.email || '-'}</td>
                  <td>{user.role || '-'}</td>
                  <td>{user.fitnessLevel || '-'}</td>
                  <td>{user.points ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  )
}

export default Users