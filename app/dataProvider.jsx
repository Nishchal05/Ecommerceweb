"use client";
import React, { useState, useContext } from "react";
import UserInfoContext from "./_component/context/userdata";

export const DataProvider = ({ children }) => {
  const [userdata, setUserdata] = useState(null);
  const [cartitems,setcartitems]=useState(0);
  const [productlist,setproductlist]=useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <UserInfoContext.Provider value={{searchQuery, setSearchQuery, userdata, setUserdata,cartitems,setcartitems,productlist,setproductlist }}>
      {children}
    </UserInfoContext.Provider>
  );
};
