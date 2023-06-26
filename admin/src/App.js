import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  return (
    <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route exact path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute> <UserList /> </ProtectedRoute>} />
          <Route path="/user/:userId" element={<ProtectedRoute> <User /> </ProtectedRoute>} />
          <Route path="/newUser" element={<ProtectedRoute> <NewUser /> </ProtectedRoute>} />
          <Route path="/movies" element={<ProtectedRoute> <ProductList /> </ProtectedRoute>} />
          <Route path="/product/:productId" element={<ProtectedRoute> <Product /> </ProtectedRoute>} />
          <Route path="/newproduct" element={<ProtectedRoute> <NewProduct /> </ProtectedRoute>} />
        </Routes>
    </BrowserRouter >
  );
}

export default App;
