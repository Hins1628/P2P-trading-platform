import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Navbar from './components/navBar';
import SearchBar from './components/searchBar';
import Footer from './components/footer';
import CustomCarousel from './components/customCarousel';
import ProductList from './components/productList';

function Market() {
    const products = [
        {
            image: '/src/assets/img/sample1.png',
            name: 'CSGO2',
            description: 'Gamma Doppler Flip Knife',
            phase: 'Phase 2',
            price: 4500,
            sellerIcon: '/src/assets/img/icon.png',
            sellerName: 'Hins866'
        },
        {
            image: '/src/assets/img/sample2.png',
            name: 'CSGO3',
            description: 'Crimson Web Karambit',
            phase: 'Phase 1',
            price: 5000,
            sellerIcon: '/src/assets/img/icon.png',
            sellerName: 'JohnDoe'
        },
        {
            image: '/src/assets/img/sample2.png',
            name: 'CSGO3',
            description: 'Crimson Web Karambit',
            phase: 'Phase 1',
            price: 5000,
            sellerIcon: '/src/assets/img/icon.png',
            sellerName: 'JohnDoe'
        },
        {
            image: '/src/assets/img/sample2.png',
            name: 'CSGO3',
            description: 'Crimson Web Karambit',
            phase: 'Phase 1',
            price: 5000,
            sellerIcon: '/src/assets/img/icon.png',
            sellerName: 'JohnDoe'
        },
        {
            image: '/src/assets/img/sample2.png',
            name: 'CSGO3',
            description: 'Crimson Web Karambit',
            phase: 'Phase 1',
            price: 5000,
            sellerIcon: '/src/assets/img/icon.png',
            sellerName: 'JohnDoe'
        },
        {
            image: '/src/assets/img/sample2.png',
            name: 'CSGO3',
            description: 'Crimson Web Karambit',
            phase: 'Phase 1',
            price: 5000,
            sellerIcon: '/src/assets/img/icon.png',
            sellerName: 'JohnDoe'
        },
        {
            image: '/src/assets/img/sample2.png',
            name: 'CSGO3',
            description: 'Crimson Web Karambit',
            phase: 'Phase 1',
            price: 5000,
            sellerIcon: '/src/assets/img/icon.png',
            sellerName: 'JohnDoe'
        },
        {
            image: '/src/assets/img/sample2.png',
            name: 'CSGO3',
            description: 'Crimson Web Karambit',
            phase: 'Phase 1',
            price: 5000,
            sellerIcon: '/src/assets/img/icon.png',
            sellerName: 'JohnDoe'
        }
        
        // Add more products as needed
    ];
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