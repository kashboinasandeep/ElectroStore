import { Outlet } from "react-router-dom";

const Dashboard = ()=>{
    return(
        <>
        <div>
            <h1>This is users Dashboard page....!!!</h1>
          
            <Outlet />
        </div>

        </>
    )
}
export default Dashboard;