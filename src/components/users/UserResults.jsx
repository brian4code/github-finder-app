import {useContext, useEffect, useState} from 'react'
import Spinner from '../layout/Spinner'
import UserItem from './UserItem'
import GithubContext from '../../context/github/GithubContext'

function UserResults() {
  const {users, loading} = useContext(GithubContext)

  // to make initial API call to Github for testing purpose
  // useEffect(() => {
  //   fetchUsers()
  // }, [])

  // const [users, setUsers] = useState([])
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   fetchUsers()
  // }, [])

  // const fetchUsers = async () => {
  //   const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
  //     // headers: {
  //     //   Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
  //     // },
  //   })

  //   const data = await response.json()

  //   setUsers(data)
  //   setLoading(false)
  // }

  if (!loading) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    )
  } else {
    // display spinner gif when loading from Github API
    return <Spinner />
  }
}

export default UserResults

