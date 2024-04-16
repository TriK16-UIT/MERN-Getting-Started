import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { formatDistanceToNow } from "date-fns"

const WorkoutDetails = ({workout}) => {
    const { dispatch, editingWorkoutId, form } = useWorkoutsContext()

    const handleClick = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    const handleEditChange = (e) => {
        dispatch({
            type: 'UPDATE_FORM',
            payload: { [e.target.name]: e.target.value }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        });
        const json = await response.json();
        if (response.ok) {
            dispatch({ type: 'MODIFY_WORKOUT', payload: {...form, _id: workout._id} });
        }
    };

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <button onClick={handleClick} className="delete-btn"><i class="bi bi-trash3-fill"></i></button>
            <button onClick={() => dispatch({ type: 'START_EDITING', payload: workout._id })} className="edit-btn"><i className="bi bi-pencil-fill"></i></button>

            {editingWorkoutId === workout._id && (
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" value={form.title} onChange={handleEditChange} />
                    <input type="number" name="load" value={form.load} onChange={handleEditChange} />
                    <input type="number" name="reps" value={form.reps} onChange={handleEditChange} />
                    <button type="submit">Update</button>
                    <button type="button" onClick={() => dispatch({ type: 'STOP_EDITING' })} className="cancel-btn">Cancel</button>
                </form>
            )}
        </div>
    )
}

export default WorkoutDetails