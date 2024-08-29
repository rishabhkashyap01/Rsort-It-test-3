import React, { useContext, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { GiWheat } from "react-icons/gi";
import myContext from "../../context/myContext";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const OwnerDashboard = () => {
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

        <h1 className="text-3xl font-bold text-[#00a99d]">Welcome, {user?.name}</h1>
        <p className="text-xl text-gray-300 mt-2">Email: {user?.email}</p>
        <p className="text-xl text-gray-300 mt-2">Role: {user?.role}</p>
        <button 
          onClick={() => navigate('/addproduct')} 
          className="mt-6 px-6 py-3 text-lg bg-[#00a99d] text-white rounded-lg hover:bg-[#008f87] transition duration-300"
        >
          Sell Product
        </button>
        </div>
        

         {/* Car Icon */}
      <div className="w-1/2 flex flex-row justify-end text-[16rem] text-[#00a99d]">
          <GiWheat />
        </div>
      </div>


      {/* Table  */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
          <table className="w-full border-2 border-[#00a99d] text-sm text-left text-gray-200">
            {/* Table Header */}
            <thead className="bg-[#00a99d] text-white text-xs uppercase">
              <tr>
                <th className="px-6 py-3">S.No</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {userProducts.length > 0 ? (
                userProducts.map((item, index) => {
                  const { thumbnail, time, id } = item;
                  return (
                    <tr key={index} className="border-b bg-[#0a2540] hover:bg-[#112a3d] transition duration-300">
                      <td className="px-6 py-4 text-white">{index + 1}.</td>
                      <td className="px-6 py-4 font-medium">
                        <img
                          className="w-16 rounded-lg"
                          src={thumbnail}
                          alt="thumbnail"
                        />
                      </td>
                      <td className="px-6 py-4 text-white">{item.name}</td>
                      <td className="px-6 py-4 text-white">{item.productType}</td>
                      <td className="px-6 py-4 text-white">{new Date(time.seconds * 1000).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteProducts(id)}
                          className="px-4 py-1 text-sm font-bold bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-black">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default OwnerDashboard;
