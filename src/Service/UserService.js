import { privateAxios, publicAxios } from "./AxiosService";

// Register new user
export const registerUser = (userData) => {
  return publicAxios.post("/users", userData).then((response) => response.data);
};

// Login user
export const loginUser = (loginData) => {
  return publicAxios.post("/auth/generate-token", loginData).then((response) => response.data);
};

// Get user by ID
export const getUser = (userId) => {
  return publicAxios.get(`/users/${userId}`).then((response) => response.data);
};

// Update user
export const updateUser = (user) => {
  return privateAxios.put(`/users/${user.userId}`, user).then((response) => response.data);
};

//update user profile picture
export const updateUserProfilePicture =(file,userId)=>{
  if(file==null){
    return;
  }
const data = new FormData();
data.append("userImage",file)
return privateAxios.post(`/users/image/${userId}`,data).then((response)=>response.data);
};
