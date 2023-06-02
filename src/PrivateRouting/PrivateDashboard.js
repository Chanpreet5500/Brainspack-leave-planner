import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../Pages/Navbar/Navbar";

function PrivateDashboard(props) {
  const { Component } = props;

  const values = localStorage.getItem("value");
  const finalUserValues = JSON.parse(values);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    if (!token) navigate("/");
  }, []);

  return (
    <>
      <NavbarComponent values={finalUserValues} />
      <Component />
    </>
  );
}

export default PrivateDashboard;
