import React from "react";
import { useAuth } from "./AuthContext";

const ProtectedComponent = () => {
  const { userStatus } = useAuth();

  if (!userStatus) {
    return <Navigate to="/" />;
  }

  return <div>ProtectedComponent</div>;
};

export default ProtectedComponent;
