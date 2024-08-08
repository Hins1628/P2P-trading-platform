import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import Navbar from './components/navBar';
import Footer from './components/footer';
import ProductList from './components/productList';

function Main() {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/get-products-List', {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Products:', data);
        setProducts(data);
      } else {
        console.log('Products not found');
      }
    } catch (error) {
      console.error('Products error:', error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Navbar />
      <section className="bg-center bg-cover bg-[url('/src/assets/img/1.jpg')] bg-gray-700 bg-blend-multiply">
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
          <ProductList products={products} />

          <p>Hot Mobile Game</p>
          <ProductList products={products} />
        </div>
      </section>

      <Footer />

    </>
  );
}

export default Main;