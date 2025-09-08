import { Navigate } from "react-router-dom"
import { CustomerDetailsPage } from "../pages/CustomerDetailsPage";
import { UnderConstruction } from "../pages/UnderConstruction";
export const routes = [
  {
    path: "/",
    element: <Navigate to="/customers" replace />,
  },
  {
    path: "customers",
    element: <CustomerDetailsPage />,
  },
  {
    path: "under-construction",
    element: <UnderConstruction />,
  }
];