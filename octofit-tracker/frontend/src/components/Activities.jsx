import { useEffect, useState } from 'react'
import { fetchCollection, getApiBaseUrl } from '../config/api'

const codespaceEndpointPattern = 'https://YOUR_CODESPACE_NAME-8000.app.github.dev/api/activities/'
const endpointPath = '/api/activities/'

function Activities() {
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadActivities() {
      try {
        const payload = await fetchCollection('activities')
        setItems(payload.items)
        setPagination(payload.pagination)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load activities')
      }
    }

    loadActivities()
  }, [])

  return (
    <section className="bg-white rounded-4 shadow-sm border p-4 p-lg-5">
      <p className="eyebrow mb-2">Activities</p>
      <h2 className="h3 mb-3">Recent workout activity</h2>
      <p className="text-secondary mb-1">Endpoint: {`${getApiBaseUrl()}${endpointPath}`}</p>
      <p className="small text-secondary mb-3">Codespaces pattern: {codespaceEndpointPattern}</p>
      {pagination ? <p className="small text-secondary">Page {pagination.page ?? 1}</p> : null}
      {error ? <p className="text-danger mb-0">{error}</p> : null}
      {!error && items.length === 0 ? <p className="mb-0">No activities found.</p> : null}
      {!error && items.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>Type</th>
                <th>Date</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((activity) => (
                <tr key={activity._id || `${activity.activityType}-${activity.performedAt}`}>
                  <td>{activity.activityType || '-'}</td>
                  <td>{activity.performedAt ? new Date(activity.performedAt).toLocaleString() : '-'}</td>
                  <td>{activity.durationMinutes ? `${activity.durationMinutes} min` : '-'}</td>
                  <td>{activity.caloriesBurned ?? '-'}</td>
                  <td>{activity.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  )
}

export default Activities