import Home from "./pages/Home/Home";
import "./App.scss";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Watch from "./pages/Watch/Watch";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
const App = () => {
  const user = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Navigate to="/register" />}/>
        <Route exact path="/register" element={!user ? <Register /> : <Navigate to="/" />}/>
        <Route exact path="/login" element={!user ? <Login /> : <Navigate to="/" />}/>
        <Route exact path="/movies" element={user ? <Home type="movies"/> : <Navigate to='/register'  />} />
        <Route exact path="/series" element={user ? <Home type="series"/> : <Navigate to='/register'  />} />
        <Route exact path="/watch" element={user ? <Watch/> : <Navigate to='/register'  />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
