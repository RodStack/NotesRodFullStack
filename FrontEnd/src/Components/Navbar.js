import { useNavigate } from 'react-router-dom';
import { FaArchive, FaTags } from 'react-icons/fa';
import myImage from '../static/rfuenzalidadevlogowhite.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Removes user info from localStorage
    navigate('/login'); // Navigates to login page
    window.location.reload(); // Forces a page reload
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <button onClick={() => navigate('/')} className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={myImage} className="h-8" alt="Rfuenzalidadev Logo" />
        </button>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button className="text-white font-medium rounded-lg px-4 py-2.5 text-center bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-br hover:from-purple-700 hover:to-blue-600 dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transition duration-300 ease-in-out"
                  onClick={handleLogout}
          >
            Log out
          </button>
        </div>
        <div className="hidden items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className="relative">
              <button onClick={() => navigate('/categories')} className="text-white rounded-md px-3 py-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-br hover:from-purple-700 hover:to-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transition duration-300 ease-in-out mr-2 mb-1">
                <FaTags />
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/archived')}
                className="text-white rounded-md px-3 py-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-br hover:from-purple-700 hover:to-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transition duration-300 ease-in-out mr-2 mb-1"
              > 
                <FaArchive />
              </button> 
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
