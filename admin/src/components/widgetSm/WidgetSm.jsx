import "./widgetSm.css";
import { useEffect, useState } from "react";
import useFetch from "../../hook/useFetch";
export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([])
  const {data} = useFetch('/user?new=true')
  useEffect(() => {
    setNewUsers(data)
  },[data])
  return (  
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user) => (
          <li key={user._id} className="widgetSmListItem">
            <img
              src={user.profilePic || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
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
              {/* <span className="widgetSmUsername">{new Date(user.createdAt).toDateString()}</span> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
