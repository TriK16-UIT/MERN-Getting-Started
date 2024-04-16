import { createContext, useReducer } from "react"

export const WorkoutsContext = createContext()

const initialState = {
    workouts: null,
    editingWorkoutId: null,
    form: { title: '', load: 0, reps: 0 }
};

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        case 'MODIFY_WORKOUT':
            return {
                workouts: state.workouts.map(workout =>
                    workout._id === action.payload._id ? {...workout, ...action.payload} : workout
                )
            }
        case 'START_EDITING':
            return {
                ...state,
                editingWorkoutId: action.payload,
                form: state.workouts.find(w => w._id === action.payload) || state.form
            };
        case 'UPDATE_FORM':
            return {
                ...state,
                form: { ...state.form, ...action.payload }
            };
        case 'STOP_EDITING':
            return {
                ...state,
                editingWorkoutId: null
            };
        default:
            return state
    }
}

export const WorkoutsContextProvider = ({children}) => {

    // const [state, dispatch] = useReducer(workoutsReducer, {
    //     workouts: null
    // })
    const [state, dispatch] = useReducer(workoutsReducer, initialState);

    return (
        <WorkoutsContext.Provider value = {{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}