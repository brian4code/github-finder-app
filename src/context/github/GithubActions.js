import axios from 'axios'
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
  baseURL: GITHUB_URL,
  // headers: { Authorization: `token ${GITHUB_TOKEN}` }
})

// make API call to Github to search users
export const searchUsers = async (text) => {

  // set the query params string for Github search API
  // ie. ?q=testing
  const params = new URLSearchParams({
    q: text
  })

  // using axios to call API from github
  const response = await github.get(`/search/users?${params}`)
  return response.data.items

  // using fetch to call API
  // const response = await fetch(
  //   `${GITHUB_URL}/search/users?${params}`, 
  //   {
  //     // headers: {
  //     //   Authorization: `token ${GITHUB_TOKEN}`,
  //     // }
  // })

  // // Github return an Array of user Object 
  // const {items} = await response.json()

  // return items
}

// Get single user 
export const getUser = async (login) => {

  const response = await fetch(
    `${GITHUB_URL}/users/${login}`, 
    {
      // headers: {
      //   Authorization: `token ${GITHUB_TOKEN}`,
      // }
  })

  if (response.status === 404) {
    window.location = '/notfound'    // redirect to notfound
  } else {
    // Github return an Array of user Object 
    const data = await response.json()
    return data
  }
}

// Get user repos
export const getUserRepos = async (login) => {

  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  })

  const response = await fetch(
    `${GITHUB_URL}/users/${login}/repos?${params}`, 
    {
      // headers: {
      //   Authorization: `token ${GITHUB_TOKEN}`,
      // }
  })

  const data = await response.json()
  return data
}

// Get users and repos in a combined function 
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`)
  ])

  return { user: user.data, repo: repos.data }
}

