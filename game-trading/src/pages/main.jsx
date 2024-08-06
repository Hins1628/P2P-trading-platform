import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import Navbar from './components/navBar';
import Footer from './components/footer';

function Main() {
  return (
    <>
      <Navbar />
      <section className="bg-center bg-cover bg-[url('/src/assets/img/sample_wall_1.png')] bg-gray-700 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">This is the new P2P trading platform.</h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">In here, every player can trade their gaming item with no fee.</p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
              Get started
              <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
            <a href="#" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
              Learn more
            </a>
          </div>
        </div>
      </section>

      <section className="bg-center bg-no-repeat bg-gray-200 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-left py-12 lg:py-27">
          <p>Hot Online Game</p>
          <div className="flex flex-col items-center m-8 md:flex-row">
            <Link to="/Product">
              <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow md:p-6 dark:border-gray-700 mx-4">
                <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded">
                  <img className="bg-center bg-cover" src="/src/assets/img/sample1.png" ></img>
                </div>
                <div className="h-2.5 w-48 mb-4 ">CSGO2</div>
                <div className="h-2 mb-2.5 ">Gamma Doppler Flip Knife</div>
                <div className="h-2 mb-2.5 ">Phase 2</div>
                <div className="h-2 text-orange-400">$ 4500</div>
                <div className="flex items-center mt-4">
                  <img src="/src/assets/img/icon.png" className="max-w-none h-10 me-3"></img>
                  <div>
                    <div className="h-2.5  w-32 mb-2">Selling</div>
                    <div className="w-48 h-2 ">Hins866</div>
                  </div>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            </Link>
            <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow md:p-6 dark:border-gray-700 mx-4">
              <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded">
                <img className="bg-center bg-cover" src="/src/assets/img/sample1.png" ></img>
              </div>
              <div className="h-2.5 w-48 mb-4 ">CSGO2</div>
              <div className="h-2 mb-2.5 ">Gamma Doppler Flip Knife</div>
              <div className="h-2 mb-2.5 ">Phase 2</div>
              <div className="h-2 text-orange-400">$ 4500</div>
              <div className="flex items-center mt-4">
                <img src="/src/assets/img/icon.png" className="max-w-none h-10 me-3"></img>
                <div>
                  <div className="h-2.5  w-32 mb-2">Selling</div>
                  <div className="w-48 h-2 ">Hins866</div>
                </div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>

            <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow md:p-6 dark:border-gray-700 mx-4">
              <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded">
                <img className="bg-center bg-cover" src="/src/assets/img/sample1.png" ></img>
              </div>
              <div className="h-2.5 w-48 mb-4 ">CSGO2</div>
              <div className="h-2 mb-2.5 ">Gamma Doppler Flip Knife</div>
              <div className="h-2 mb-2.5 ">Phase 2</div>
              <div className="h-2 text-orange-400">$ 4500</div>
              <div className="flex items-center mt-4">
                <img src="/src/assets/img/icon.png" className="max-w-none h-10 me-3"></img>
                <div>
                  <div className="h-2.5  w-32 mb-2">Selling</div>
                  <div className="w-48 h-2 ">Hins866</div>
                </div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>

            <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow md:p-6 dark:border-gray-700 mx-4">
              <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded">
                <img className="bg-center bg-cover" src="/src/assets/img/sample1.png" ></img>
              </div>
              <div className="h-2.5 w-48 mb-4 ">CSGO2</div>
              <div className="h-2 mb-2.5 ">Gamma Doppler Flip Knife</div>
              <div className="h-2 mb-2.5 ">Phase 2</div>
              <div className="h-2 text-orange-400">$ 4500</div>
              <div className="flex items-center mt-4">
                <img src="/src/assets/img/icon.png" className="max-w-none h-10 me-3"></img>
                <div>
                  <div className="h-2.5  w-32 mb-2">Selling</div>
                  <div className="w-48 h-2 ">Hins866</div>
                </div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>

          <p>Hot Mobile Game</p>
          <div className="flex flex-col items-center m-8 md:flex-row">
            <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow md:p-6 dark:border-gray-700 mx-4">
              <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded">
                <img className="bg-center bg-cover" src="/src/assets/img/sample1.png" ></img>
              </div>
              <div className="h-2.5 w-48 mb-4 ">CSGO2</div>
              <div className="h-2 mb-2.5 ">Gamma Doppler Flip Knife</div>
              <div className="h-2 mb-2.5 ">Phase 2</div>
              <div className="h-2 text-orange-400">$ 4500</div>
              <div className="flex items-center mt-4">
                <img src="/src/assets/img/icon.png" className="max-w-none h-10 me-3"></img>
                <div>
                  <div className="h-2.5  w-32 mb-2">Selling</div>
                  <div className="w-48 h-2 ">Hins866</div>
                </div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>

            <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow md:p-6 dark:border-gray-700 mx-4">
              <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded">
                <img className="bg-center bg-cover" src="/src/assets/img/sample1.png" ></img>
              </div>
              <div className="h-2.5 w-48 mb-4 ">CSGO2</div>
              <div className="h-2 mb-2.5 ">Gamma Doppler Flip Knife</div>
              <div className="h-2 mb-2.5 ">Phase 2</div>
              <div className="h-2 text-orange-400">$ 4500</div>
              <div className="flex items-center mt-4">
                <img src="/src/assets/img/icon.png" className="max-w-none h-10 me-3"></img>
                <div>
                  <div className="h-2.5  w-32 mb-2">Selling</div>
                  <div className="w-48 h-2 ">Hins866</div>
                </div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>

            <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow md:p-6 dark:border-gray-700 mx-4">
              <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded">
                <img className="bg-center bg-cover" src="/src/assets/img/sample1.png" ></img>
              </div>
              <div className="h-2.5 w-48 mb-4 ">CSGO2</div>
              <div className="h-2 mb-2.5 ">Gamma Doppler Flip Knife</div>
              <div className="h-2 mb-2.5 ">Phase 2</div>
              <div className="h-2 text-orange-400">$ 4500</div>
              <div className="flex items-center mt-4">
                <img src="/src/assets/img/icon.png" className="max-w-none h-10 me-3"></img>
                <div>
                  <div className="h-2.5  w-32 mb-2">Selling</div>
                  <div className="w-48 h-2 ">Hins866</div>
                </div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>

            <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow md:p-6 dark:border-gray-700 mx-4">
              <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded">
                <img className="bg-center bg-cover" src="/src/assets/img/sample1.png" ></img>
              </div>
              <div className="h-2.5 w-48 mb-4 ">CSGO2</div>
              <div className="h-2 mb-2.5 ">Gamma Doppler Flip Knife</div>
              <div className="h-2 mb-2.5 ">Phase 2</div>
              <div className="h-2 text-orange-400">$ 4500</div>
              <div className="flex items-center mt-4">
                <img src="/src/assets/img/icon.png" className="max-w-none h-10 me-3"></img>
                <div>
                  <div className="h-2.5  w-32 mb-2">Selling</div>
                  <div className="w-48 h-2 ">Hins866</div>
                </div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />

    </>
  );
}

export default Main;