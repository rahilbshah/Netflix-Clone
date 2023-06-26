import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useEffect } from "react";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext";
import axios from "axios";

export default function ProductList() {

  const {movies, dispatch } = useContext(MovieContext)
  useEffect(() => {
    const getMovies = async () => {
      dispatch({ type: "GET_MOVIE_START" })
      try {
        const res = await axios.get("/movies", {
          headers: {
            token: JSON.parse(localStorage.getItem("user")).token
          }
        })
        dispatch({ type: "GET_MOVIE_SUCCESS", payload: res.data });
      } catch (error) {
        dispatch({ type: "GET_MOVIE_FAILURE", payload: error.response.data });
      }
    }
    getMovies()
  },[dispatch])
  
  
  // const handleDelete = (id) => {

  // };

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
              // onClick={() => handleDelete(params.row.id)}
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
            rows={movies}
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
