import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <h1>This is Profile Page....!!!</h1>
      <Outlet />  {/* Allows UserDetails to render inside Profile */}
    </div>
  );
};

export default Profile;
