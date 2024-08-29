import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/Firebase";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { AiFillDingtalkCircle } from "react-icons/ai";

const Signup = () => {
  const navigate = useNavigate();

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    companyName: ""
  });

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setUserSignup({
      ...userSignup,
      role: role,
      companyName: role === "ngo" ? userSignup.companyName : "", // Clear company name if not NGO
    });
  };

  const userSignupFunction = async () => {
    if (
      userSignup.name === "" ||
      userSignup.email === "" ||
      userSignup.password === "" ||
      userSignup.role === ""
    ) {
      toast.error("All Fields are required");
      return;
    }

    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );

      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        companyName: userSignup.role === "ngo" ? userSignup.companyName : null, // Save company name only if NGO
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const userRefrence = collection(fireDB, "user");

      await addDoc(userRefrence, user);

      localStorage.setItem("users", JSON.stringify(user));

      setUserSignup({
        name: "",
        email: "",
        password: "",
        role: "",
        companyName: "",
      });

      toast.success("Signup Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Signup Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[#0c4747]">
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg px-8 py-10 rounded-lg shadow-md w-[90%] md:w-[50%] lg:w-[30%]">
        <div className="flex flex-col items-center mb-6">
          <AiFillDingtalkCircle size={64} className="text-white" />
          <h2 className="text-center text-3xl font-bold text-white mt-2">
            Signup
          </h2>
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Full Name"
            value={userSignup.name}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                name: e.target.value,
              });
            }}
            className="bg-gray-700 text-white px-4 py-3 w-full rounded-md outline-none placeholder-white"
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Email Address"
            value={userSignup.email}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                email: e.target.value,
              });
            }}
            className="bg-gray-700 text-white px-4 py-3 w-full rounded-md outline-none placeholder-white"
          />
        </div>

        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            value={userSignup.password}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                password: e.target.value,
              });
            }}
            className="bg-gray-700 text-white px-4 py-3 w-full rounded-md outline-none placeholder-white"
          />
        </div>

        {/* Role Selection */}
        <div className="mb-5">
          <label className="text-white mr-4">
            <input
              type="radio"
              value="scrapdealer"
              checked={userSignup.role === "scrapdealer"}
              onChange={handleRoleChange}
              className="mr-2"
            />
            scrap-dealer
          </label>
          <label className="text-white">
            <input
              type="radio"
              value="user"
              checked={userSignup.role === "user"}
              onChange={handleRoleChange}
              className="mr-2"
            />
            user
          </label>
          <label className="text-white">
            <input
              type="radio"
              value="ngo"
              checked={userSignup.role === "ngo"}
              onChange={handleRoleChange}
              className="ml-2"
            />
            ngo
          </label>
        </div>

        {/* Conditionally render company name input field */}
        {userSignup.role === "ngo" && (
          <div className="mb-3">
            <input
              type="text"
              placeholder="Company Name"
              value={userSignup.companyName}
              onChange={(e) => {
                setUserSignup({
                  ...userSignup,
                  companyName: e.target.value,
                });
              }}
              className="bg-gray-700 text-white px-4 py-3 w-full rounded-md outline-none placeholder-white"
            />
          </div>
        )}

        <div className="mb-5">
          <button
            type="button"
            onClick={userSignupFunction}
            className="bg-[#21a5a5] border-2 border-[#21a5a5] hover:bg-[#21a5a5] w-full text-white py-3 font-bold rounded-md transition duration-200 "
          >
            Signup
          </button>
        </div>

        <div className="text-center">
          <h2 className="text-white">
            Have an account{" "}
            <Link className=" text-[#21a5a5] font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
