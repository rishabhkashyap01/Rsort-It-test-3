import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { fireDB } from "../firebase/Firebase";
import toast from "react-hot-toast";

const MyState = (props) => {
  const [getAllProducts, setGetAllProducts] = useState([]);

  function getAllProduct() {
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });

        setGetAllProducts(productArray);
      });
      return () => data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProduct();
  }, []);

  // Product Delete Function 
  const deleteProducts = async (id) => {
    try {
        await deleteDoc(doc(fireDB, "products", id));
        getAllProduct()
        toast.success("Blogs deleted successfully")
    } catch (error) {
        console.log(error)
    }
}


  return (
    <MyContext.Provider value={{
        deleteProducts,
        getAllProducts, // Provide the products array to the context
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
