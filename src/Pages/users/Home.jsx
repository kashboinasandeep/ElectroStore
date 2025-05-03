import { useContext } from "react";
import UserContext from "../../Context/UserContext";

const Home = () => {
  const userContext = useContext(UserContext);

  return (
    <>
      <div>
        {JSON.stringify(userContext)}
        <h1>Welcome {userContext.userData?.user?.email || "Guest"}</h1>
        <h1>{userContext.isLogin ? "User is logged in" : "User is not logged in"}</h1>
      </div>
    </>
  );
};

export default Home;


