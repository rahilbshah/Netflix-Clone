import { useEffect } from 'react'
import { useState } from 'react'
import Featured from '../../components/Featured/Featured'
import List from '../../components/List/List'
import Navbar from '../../components/Navbar/Navbar'
import './Home.scss'
import axios from 'axios'

const Home = ({ type }) => {
  const [lists, setLists] = useState([])
  const genre = ""

  useEffect(() => {
    const getAllLists = async () => {
      const res = await axios.get(`lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
        headers: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDIwNjk2NTRiOWRmNGNlNDllYmRjMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MTA5MzQ2NiwiZXhwIjoxNjYxNTI1NDY2fQ.GoiFEItYUgdZjmnWBdAMDAMeXJNtG5miuXjTfD-T37c"
        }
      })
      setLists(res.data)
    }
    getAllLists();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, genre])
  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} />
      {lists.map((list) => (
        <List list={list} key={list._id} />
      ))}
    </div>
  )
}

export default Home