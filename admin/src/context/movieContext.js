import { createContext, useReducer } from "react";


const INITIAL_STATE = {
    movies: [],
    loading: false,
    error: null
};

export const MovieContext = createContext(INITIAL_STATE)

const MovieReducer = (state, action) => {
    switch (action.type) {
        case "GET_MOVIE_START":
            return { movies: [], loading: true, error: null }
        case "GET_MOVIE_SUCCESS":
            return { movies: action?.payload, loading: false, error: null }
        case "GET_MOVIE_FAILURE":
            return { movies: [], loading: false, error: action?.payload }
        default:
            return state
    }
}

export const MovieContextProvider=({children})=>{
    const [state, dispatch] = useReducer(MovieReducer,INITIAL_STATE);

    return(
       <MovieContext.Provider value={{movies:state.movies,loading:state.loading,error:state.error,dispatch}} >
        {children}
       </MovieContext.Provider>
    )
}