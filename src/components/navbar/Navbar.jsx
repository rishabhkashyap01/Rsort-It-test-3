import { Link, useNavigate } from "react-router-dom";
import { GiPlantSeed } from "react-icons/gi";

const Navbar = () => {

    // get user from localStorage 
    const storedUser = localStorage.getItem('users');
    const user = storedUser ? JSON.parse(storedUser) : null;

    // navigate 
    const navigate = useNavigate();

    // logout function 
    const logout = () => {
        localStorage.removeItem('users');
        navigate("/login");
    }
  

  // navList Data
  const navList = (
    <ul className="flex flex-row justify-evenly text-center items-center  lg:space-x-9 text-white font-medium text-md lg:px-5 lg:mx-0 mx-2 w-full">
      {/* Home */}
             {/* Home */}
             <li className="hover:text-[#00a99d] text-xs lg:text-lg">
                <Link to={'/'}>Home</Link>
            </li>

      {/* Signup */}
      {!user ? <li className="hover:text-[#00a99d] text-xs lg:text-lg">
                <Link to={'/signup'}>Signup</Link>
            </li> : ""}

            {/* Login */}
            {!user ? <li className="hover:text-[#00a99d] text-xs lg:text-lg">
                <Link to={'/login'}>Login</Link>
            </li> : ""}

      {/* User */}
            {/* {user?.name} */}
            {(user?.role === "scrapdealer" || user?.role === "ngo") && (<li className="hover:ttext-[#00a99d] text-xs lg:text-lg">
                <Link to={'/user-dashboard'}>Dashboard </Link>
            </li>)}

            {/* Admin */}
            {/* {user?.name} */}
            {user?.role === "user" && <li className="hover:text-[#00a99d] text-xs lg:text-lg">
                <Link to={'/owner-dashboard'}> User-Dashboard</Link>
            </li>}

            {/* Logout */}
            {user && <li className=" bg-[#008f87] hover:bg-[#00a99d] px-2 py-1 rounded-md cursor-pointer text-xs lg:text-lg" onClick={logout}>
                Logout
            </li>}

    </ul>
  );

  return (
    <nav className="bg-[#0a2540] sticky top-0 z-50">
      {/* main  */}
      <div className="flex lg:flex-row flex-col lg:justify-between items-center py-3 lg:px-3 ">
        {/* left  */}

        <div className="left py-3 lg:py-0  lg:w-[15%]">
          <Link to={"/"}>
            <div className="flex flex-row justify-center items-center">
              <h2 className="text-3xl text-white mr-1" ><GiPlantSeed size={32} /></h2>
              <h2 className=" font-bold text-white text-2xl text-center">
              ReSort-It
              </h2>
            </div>
          </Link>
        </div>

        <div className="flex lg:flex-row flex-col lg:justify-end lg:items-center lg:w-[85%] w-full">
          {/* Search Bar  */}
          {/* <div className=" lg:w-[50%] order-2 lg:order-1">  <SearchBar /></div> */}

          {/* right  */}
          <div className=" order-1 lg:order-2 right flex justify-center mb-2 lg:mb-0 lg:w-[50%] w-full">
            {navList}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
