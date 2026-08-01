import { useEffect, useState } from 'react'
import { fetchCollection, getApiBaseUrl } from '../config/api'

const codespaceEndpointPattern = 'https://YOUR_CODESPACE_NAME-8000.app.github.dev/api/workouts/'
const endpointPath = '/api/workouts/'

function Workouts() {
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const payload = await fetchCollection('workouts')
        setItems(payload.items)
        setPagination(payload.pagination)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load workouts')
      }
    }

    loadWorkouts()
  }, [])

  return (
    <section className="bg-white rounded-4 shadow-sm border p-4 p-lg-5">
      <p className="eyebrow mb-2">Workouts</p>
      <h2 className="h3 mb-3">Workout catalog</h2>
      <p className="text-secondary mb-1">Endpoint: {`${getApiBaseUrl()}${endpointPath}`}</p>
      <p className="small text-secondary mb-3">Codespaces pattern: {codespaceEndpointPattern}</p>
      {pagination ? <p className="small text-secondary">Page {pagination.page ?? 1}</p> : null}
      {error ? <p className="text-danger mb-0">{error}</p> : null}
      {!error && items.length === 0 ? <p className="mb-0">No workouts found.</p> : null}
      {!error && items.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Duration</th>
                <th>Equipment</th>
              </tr>
            </thead>
            <tbody>
              {items.map((workout) => (
                <tr key={workout._id || workout.title}>
                  <td>{workout.title || '-'}</td>
                  <td>{workout.category || '-'}</td>
                  <td>{workout.difficulty || '-'}</td>
                  <td>{workout.durationMinutes ? `${workout.durationMinutes} min` : '-'}</td>
                  <td>{Array.isArray(workout.equipment) ? workout.equipment.join(', ') : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  )
}

export default Workouts