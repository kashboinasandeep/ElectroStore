import React, { useEffect, useState } from 'react';
import { privateAxios } from '../Service/axios.service';
import Base from '../Components/Base';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    privateAxios.get("/users/profile") // or any secured API
      .then((res) => {
        setMessage(`Welcome, ${res.data.name || "User"}!`);
      })
      .catch((err) => {
        toast.error("Unauthorized or token expired!");
        console.error(err);
      });
  }, []);

  return (
    <Base title="Dashboard">
      <h3 className="text-center mt-3">{message || "Loading..."}</h3>
    </Base>
  );
};

export default Dashboard;
