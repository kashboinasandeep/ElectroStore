// Save data to localStorage
export const doLoginLocalStorage = (data) => {
  localStorage.setItem("userData", JSON.stringify(data));
};

// Fetch full data from localStorage
export const getDataFromLocalStorage = () => {
  const data = localStorage.getItem("userData");
  if (data !== null) {
    return JSON.parse(data);
  }
  return null;
};

// Fetch user object from localStorage
export const getUserFromLocalStorage = () => {
  const data = getDataFromLocalStorage();
  return data ? data.user : null;
};

// Fetch token from localStorage
export const getTokenFromLocalStorage = () => {
  const data = getDataFromLocalStorage();
  return data ? data.jwtToken : null;
};

// Check if user is logged in
export const isLoggedIn = () => {
  const data = localStorage.getItem("userData");
  return data !== null;
};

// Check if user is an admin
export const isAdminUser = () => {
  if (isLoggedIn()) {
    const user = getUserFromLocalStorage();
    // console.log("User Data:", user); // Optional: For debugging
    if (user && Array.isArray(user.roles)) {
      return user.roles.some((role) => role.roleId === "wetrsdfwetwfasfwdf");
    }
  }
  return false;
};

// Remove user data from localStorage (Logout)
export const doLogoutFromLocalStorage = () => {
  localStorage.removeItem("userData");
};
