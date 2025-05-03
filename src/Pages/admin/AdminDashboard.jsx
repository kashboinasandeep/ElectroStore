import { Navigate, Outlet } from "react-router-dom";
import { isAdminUser } from "../../Auth/HelperAuth";
import { useContext } from "react";
import UserContext from "../../Context/UserContext";

const AdminDashboard = ()=>{

    const userContext = useContext(UserContext);

    const dashboardView = ()=>{
        return(
            <div>
            <h1>This is AdminDashboard</h1>
            <Outlet />
        </div>
        )
    }

    return(
        <>
      {(isAdminUser())? dashboardView(): <Navigate to="/users/home" />}
        </>
    )
}
export default AdminDashboard;