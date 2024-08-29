import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";

import NoPage from "./pages/noPage/NoPage";
import ProductInfo from "./pages/productInfo/ProductInfo";
import Signup from "./pages/registeration/Signup";
import Login from "./pages/registeration/Login";
import UserDashboard from "./pages/user/UserDashboard";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AddProductPage from "./pages/owner/AddProductPage";
import { ProtectedRouteForUser } from "./protectedRoute/protectedRouteForUser";
import { ProtectedRouteForOwner } from "./protectedRoute/protectedRouteForOwner";
import CategoryPage from "./pages/category/CategoryPage";
import MyState from './context/myState'
import TasksPage from "./components/tasks/TasksPage";
import GeminiPage from "./components/geminipage/GeminiPage";
import MessagePage from "./components/messagepage/MessagePage";
import "./App.css";

function App() {
  return (
    
    <MyState>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/task" element={<TasksPage />} />
        <Route path="/message" element={<MessagePage />} />
        <Route path="/gemini" element={<GeminiPage />} />
        <Route path="/*" element={<NoPage />} />
        <Route path="/productinfo/:id" element={<ProductInfo />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/category/:categoryname" element={<CategoryPage />} />

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRouteForUser>
              <UserDashboard />
            </ProtectedRouteForUser>
          }
        />

        <Route
          path="/owner-dashboard"
          element={
            <ProtectedRouteForOwner>
              <OwnerDashboard />
            </ProtectedRouteForOwner>
          }
        />

        <Route
          path="/addproduct"
          element={
            <ProtectedRouteForOwner>
              <AddProductPage />
            </ProtectedRouteForOwner>
          }
        />

       
      </Routes>
    </Router>
    </MyState>
    
  );
}

export default App;
