import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const getCurrentUser = () => ({ name: 'John Doe' });

function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const checkWindowSize = () => {
      if (window.innerWidth >= 768) {
        setIsNavbarOpen(false);
      }
    };

    window.addEventListener('resize', checkWindowSize);

    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword
        })
      });
      if (response.ok) {
        console.log('Login email:', loginEmail);
        console.log('Login password:', loginPassword);
        console.log('Login success');
        setIsLoggedIn(true);
        setUser({ name: loginEmail });
        setIsModalOpen(false);
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    };
  };

  const handleRegister = async () => {
    console.log('Register email:', registerEmail);
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: registerEmail,
          password: registerPassword
        })
      });
      if (response.ok) {
        console.log('Register email:', registerEmail);
        console.log('Register password:', registerPassword);
        console.log('Register success');
      } else {
        console.log('Register failed');
      }
    } catch (error) {
      console.error('Register error:', error);
    };
  }

  return (
    <>
      <nav className="">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className='flex flex-row gap-10'>
            <Link to="/Main" className="flex items-center space-x-3">
              <img src="/vite.svg" alt="vite" className="h-8" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">Game-Trading</span>
            </Link>
            <div className={`items-center justify-between w-full ${isNavbarOpen ? 'flex-col' : 'hidden md:flex'} md:flex-row md:w-auto md:order-1`} id="navbar-cta">
              <ul className={`flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg ${isNavbarOpen ? 'bg-gray-200' : 'bg-transparent'} md:space-x-8 md:flex-row md:mt-0 md:border-0 `}>
                <li>
                  <Link to="/Main" className="block py-2 px-3 md:p-0 text-black rounded hover:bg-gray-400 md:hover:bg-transparent md:hover:text-gray-500">Home</Link>
                </li>
                <li>
                  <Link to="/Market" className="block py-2 px-3 md:p-0 text-black rounded hover:bg-gray-400 md:hover:bg-transparent md:hover:text-gray-500">Market</Link>
                </li>
                <li>
                  <Link to="/News" className="block py-2 px-3 md:p-0 text-black rounded hover:bg-gray-400 md:hover:bg-transparent md:hover:text-gray-500">News</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex md:order-2 space-x-3 md:space-x-0">
            {isLoggedIn ? (
              <div>
                <div className="relative flex md:order-2 space-x-3 md:space-x-0">
                  <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" onMouseEnter={() => setIsUserMenuOpen(true)} onMouseLeave={() => setIsUserMenuOpen(false)}>
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full object-cover" src="/src/assets/img/1.jpg" alt="Guest user photo" />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute z-50 mt-8 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown" onMouseEnter={() => setIsUserMenuOpen(true)} onMouseLeave={() => setIsUserMenuOpen(false)}>
                      <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user.name}</span>
                      </div>
                      <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                          <Link to="/UserConsole" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
                        </li>
                        <li>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                        </li>
                        <li>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                        </li>
                        <li>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={() =>setIsLoggedIn(false)}>Sign out</a>
                        </li>
                      </ul>
                    </div>
                  )}

                </div>
              </div>
            ) : (
              <button onClick={() => setIsModalOpen(true)} className="text-white bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center ">Login/Register</button>
            )}
            <button onClick={() => setIsNavbarOpen(!isNavbarOpen)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-cta" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

        </div>
      </nav>

      <div id="authentication-modal" tabIndex="-1" className={`${isModalOpen ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {isLogin ? 'Login' : 'Register'} to your account
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5">
              {isLogin ? (
                <form className="space-y-4" onSubmit={(event) => {
                  event.preventDefault();
                  handleLogin();
                }}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@gmail.com" value={loginEmail} required onChange={event => setLoginEmail(event.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={loginPassword} required onChange={event => setLoginPassword(event.target.value)} />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                      </div>
                      <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div>
                    <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                  </div>
                  <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Login to your account</button>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered? <a onClick={() => {
                      setIsLogin(false);
                      setLoginEmail('');
                      setLoginPassword('');
                    }} className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                  </div>
                </form>
              ) : (
                <form className="space-y-4" onSubmit={(event) => {
                  event.preventDefault();
                  handleRegister();
                }}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Register email</label>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@gmail.com" value={registerEmail} required onChange={event => setRegisterEmail(event.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Register password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={registerPassword} required onChange={event => setRegisterPassword(event.target.value)} />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                      </div>
                    </div>
                    <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                  </div>
                  <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Already register? <a onClick={() => {
                      setIsLogin(true);
                      setRegisterEmail('');
                      setRegisterPassword('');
                    }} className="text-blue-700 hover:underline dark:text-blue-500">Login account</a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Navbar;