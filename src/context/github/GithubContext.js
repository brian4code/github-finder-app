import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()


// export const GithubProvider = ({children}) => {
//   const initialState = {
//     users: [],
//     user: {},
//     repos: [],
//     loading: false
//   }

//   const [state, dispatch] = useReducer(githubReducer, initialState)

//   const searchUsers = async (text) => {
//     setLoading()
//     const params = new URLSearchParams({
//       q: text
//     })

//     const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/search/users?${params}`)

//     const {items} = await response.json()

//     dispatch({
//       type: 'GET_USERS',
//       payload: items
//     })
//   }

//   // get a single user
//   const getUser = async (login) => {
//     setLoading()

//     const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users/${login}`)

//     if (response.status === 404) {
//       window.location = '/notfound'
//     } else {
//       const data = await response.json()
  
//       dispatch({
//         type: 'GET_USERS',
//         payload: data
//       })
//     }
//   }

//   // Get user repos
//   const getUsersRepos = async (login) => {
//     setLoading()
//     const params = new URLSearchParams({
//       sort: 'created',
//       per_page: 10
//     })

//     const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users/${login}/repos?${params}`)

//     const data = await response.json()

//     dispatch({
//       type: 'GET_REPOS',
//       payload: data
//     })
//   }

//   // Clear users from state
//   const clearUsers = () => dispatch({ type: 'CLEAR_USERS' })

//   // Set loading
//   const setLoading = () => dispatch({ type: 'SET_LOADING' })

//   return <GithubContext.Provider value={{
//     ...state,
//     dispatch,
//     searchUsers,
//     clearUsers,
//     getUser,
//     getUsersRepos
//   }}>
//     {children}
//   </GithubContext.Provider>
// }

// export default GithubContext



export const GithubProvider = ({children}) => {
  const initialState = {
    users: [],          // to store search results for multiple users
    user: {},           // to store a single user profile page
    repos: [],          // to store repositories info under a user 
    loading: false,
  }

  // use useReducer() instead of useState() 
  const [state, dispatch] = useReducer(githubReducer, initialState)

  
  // to make initial API call to Github for testing purpose
  // const fetchUsers = async () => {
  //   setLoading() 

  //   const response = await fetch(
  //     `${GITHUB_URL}/users`, 
  //     {
  //       // headers: {
  //       //   Authorization: `token ${GITHUB_TOKEN}`,
  //       // }
  //   })

  //   // Github return an Array of user Object 
  //   const data = await response.json()

  //   // dispatch takes in an Action object with type and payload
  //   dispatch({
  //     type: 'GET_USERS',
  //     payload: data,
  //   })
  // }

  return <GithubContext.Provider value={{
    ...state,
    dispatch,
  }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext
