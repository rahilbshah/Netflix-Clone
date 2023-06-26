import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../../hook/useFetch";

export default function ProductList() {
  const {data}= useFetch("/movies")
  const [movie, setMovie] = useState(data)


  useEffect(()=>{
     setMovie(data)
    // console.log(data);
  },[data])

  
  
  const handleDelete = async (id) => {
    try {
       await axios.delete(`/movies/${id}`, {
        headers: {
          token: JSON.parse(localStorage.getItem("user")).token
        }
      })
      setMovie(movie.filter((item)=>item._id !== id))
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "movie",
      headerName: "Movie",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "Limit", width: 120 },
    { field: "isSeries", headerName:"isSeries", width: 130 },
    
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
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
        <div className="productList">
          <DataGrid
            rows={movie}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            getRowId={r=>r._id}
          />
        </div>
      </div>
    </>
  );
}
