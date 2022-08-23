import "./widgetSm.css";
import { useEffect, useState } from "react";
import axios from 'axios'
export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([])
  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get('/user', {
          headers: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDIwNjk2NTRiOWRmNGNlNDllYmRjMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MTE4NTc3NCwiZXhwIjoxNjYxNjE3Nzc0fQ.Cx6hptyUY_rnragwEQOtu-P5TQysIjUceZ7LtumdmRY"
          }
        })
        setNewUsers(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getNewUsers();
  })
  // console.log(newUsers);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user) => (
          <li className="widgetSmListItem">
            <img
              src="https://i.ibb.co/MBtjqXQ/no-avatar.gif"
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user._id}</span>
            </div>
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.email}</span>
              <span className="widgetSmUsername">{new Date(user.createdAt).toDateString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
