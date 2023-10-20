import React, { useContext, useEffect } from "react";
import AuthContext from "../../../services/auth/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Checkout from "./placerOrder/Checkout";

const CheckoutMain = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token.token) {
      navigate("/");
    }
  }, [token.token, navigate]);

  return (
    <>
      <Checkout />
    </>
  );
};

export default CheckoutMain;
