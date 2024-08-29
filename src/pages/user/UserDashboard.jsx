import React, { useContext, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { GiWheat } from "react-icons/gi";
import myContext from "../../context/myContext";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const UserDashboard = () => {
  // get user from localStorage
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const auth = getAuth();
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllProducts, deleteProducts } = context;

  const userProducts = getAllProducts.filter(
    (product) => product.uid === user.uid || product.email === user.email
  );

  return (
    <Layout>
       {/* User Info Section */}
       <div className="flex flex-row justify-center bg-[#0a2540] text-white p-8  shadow-md mb-8">
        <div className="w-1/2">

        <h1 className="text-5xl font-bold text-[#00a99d]">Welcome, {user?.name}</h1>
        <p className="text-3xl text-gray-300 mt-2">Email: {user?.email}</p>
        <p className="text-3xl text-gray-300 mt-2">Role: {user?.role}</p>
        </div>
        

         {/* Car Icon */}
      <div className="w-1/2 flex flex-row justify-end text-[16rem] text-[#00a99d]">
          <GiWheat />
        </div>
       
      </div>

     

     
    </Layout>
  );
};

export default UserDashboard;
