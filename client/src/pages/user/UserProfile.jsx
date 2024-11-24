import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance";
import { useAuthContext } from "../../hooks/useAuthContext";

const UserProfile = ({role}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {user, dispatch} = useAuthContext();  
  
  const [userData, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    email: user.email,    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!userData.firstName || !userData.lastName || !userData.email) {
      toast.error("Please fill out all fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {      
      const response = await axiosInstance.put("/user/update", userData);
      toast.success("Profile updated successfully!");
      const token = user.token;
      const updatedUser = response.data;      
      localStorage.setItem("user", JSON.stringify({...updatedUser, token}))
      dispatch({type: "LOGIN", payload : {...updatedUser, token}})

    } catch (error) {
        toast.error("Error while updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <Layout role={role ? "admin" : "user"} >
        <div className="bg-white shadow-lg rounded-lg flex max-w-4xl ">
          {/* Profile Picture Section */}
          <div className="bg-blue-700 flex flex-col items-center text-white p-8 w-1/3 rounded-l-lg">
            
              <FaUser size={150} color="#fff" />
            
           
            <h2 className="mt-6 text-3xl font-bold">{user.firstName}</h2>
            <p className="text-xl mt-2">{user.lastName}</p>
          </div>

          {/* Profile Info Section */}
          <div className="w-2/3 p-8">
            <h1 className="text-3xl font-bold text-center mb-6">Information</h1>
            <hr className="w-24 border-t-4 border-blue-600 mx-auto mb-6" />

            <div className="grid grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <p className="font-semibold text-gray-700">First Name:</p>
                <input
                  type="text"
                  className="text-lg w-full border-b-2 focus:outline-none"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  maxLength={35}
                />
              </div>

              {/* Last Name */}
              <div>
                <p className="font-semibold text-gray-700">Last Name:</p>
                <input
                  type="text"
                  className="text-lg w-full border-b-2 focus:outline-none"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  maxLength={35}
                />
              </div>
              {/* Gender */}
              <div>
                <p className="font-semibold text-gray-700">Gender:</p>                
                <input type="radio" name="gender"  className=" mr-2 text-lg text-gray-600" checked={userData.gender === "male"} id="" value="male" onChange={handleChange}/>Male
                <input type="radio" name="gender"  className="mx-2 text-lg text-gray-600" checked={userData.gender === "female"} id="" value="female" onChange={handleChange}/>Female
              </div>

              {/* Email */}
              <div>
                <p className="font-semibold text-gray-700">Email:</p>
                <input
                  type="email"
                  disabled
                  className="text-lg text-center rounded-sm w-full bg-gray-200 cursor-not-allowed"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>

             
            </div>
            <hr className="my-6 border-gray-300" />
            {/* Buttons */}
            
              <button
                className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-full"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update"}
              </button>            
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default UserProfile;
