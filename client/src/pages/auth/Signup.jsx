import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import { toast } from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa";
import Layout from "../../components/layout/Layout";

//Resuable input field
const InputField = ({ id, label, type, value, onChange, required }) => (
  <div className="mt-6">
    <label
      htmlFor={id}
      className="block test-sm font-medium leading-s text-gray-700"
    >
      {label}
    </label>
    <div className="mt-1">
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={35}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration 150 ease-in-out"
      />
    </div>
  </div>
);

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { signup, isLoading, error } = useSignup();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, cpassword, gender } =
      formData;
    if (password !== cpassword) {
      toast.error("Passwords do not match");
      return;
    }
    const { success, error } = await signup(
      firstName,
      lastName,
      email,
      password,
      gender
    );
    if (success) {
      toast.success("Signed Up Successfully");
      navigate("/");
    } else {
      toast.error(error); // Show error message if signup fails
    }
  };
  return (
    <Layout>
      <div>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
              Create a new account
            </h2>
            <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
              Or &nbsp;
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                login to your account
              </Link>
            </p>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form method="POST" onSubmit={handleSubmit}>
                <InputField
                  id="firstName"
                  label="First Name"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />

                <InputField
                  id="lastName"
                  label="Last Name"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />

                <InputField
                  id="email"
                  label="Email address"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <div className="mt-6">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Gender
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 transition duration-150 ease-in-out"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <InputField
                  id="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <InputField
                  id="cpassword"
                  label="Confirm Password"
                  type="password"
                  value={formData.cpassword}
                  onChange={handleChange}
                  required
                />

                <div className="mt-6">
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    >                      
                      <FaUserPlus className="" size={20}/>
                      <span className="ml-3">Sign Up</span>
                    </button>
                  </span>
                </div>
                {error && <div className="error">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
