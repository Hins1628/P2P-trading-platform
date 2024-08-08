import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Navbar from './components/navBar';
import SearchBar from './components/searchBar';
import Footer from './components/footer';
import CustomCarousel from './components/customCarousel';
import ProductList from './components/productList';
import { get } from 'mongoose';

function Market() {
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
        <div>
            <Navbar />
            <SearchBar />
            <CustomCarousel />
            <section className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                <div className="mx-auto max-w-screen-xl text-left lg:py-27">
                    <p>Hot items</p>
                    <ProductList products={products}/>
                </div>
            </section>    
            <Footer />
        </div>
    );
}

export default Market;