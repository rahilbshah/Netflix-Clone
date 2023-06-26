import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import useFetch from "../../hook/useFetch";
import { useEffect } from "react";
import axios from "axios";

export default function UserList() {
  const [user, setUser] = useState([])
  const {data} = useFetch('/user')

  useEffect(()=>{
    setUser(data)
    console.log(data);
  },[data])


  const handleDelete = async (id) => {
    try {
       await axios.delete(`/user/${id}`, {
        headers: {
          token: JSON.parse(localStorage.getItem("user")).token
        }
      })
      setUser(user.filter((item)=>item._id !== id))
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.profilePic || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 230 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Topbar />
      <div style={{ display: "flex", marginTop: "10px" }} >
      <Sidebar />
      <div className="userList">
          <DataGrid
            rows={user}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
            getRowId={r=>r._id}
          />
        </div>
      </div>
    </>
  );
}
