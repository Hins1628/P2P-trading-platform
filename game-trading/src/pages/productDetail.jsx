import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../App.css'
import Navbar from './components/navBar'
import Footer from './components/footer'


function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [sellerIcon, setSellerIcon] = useState('');


    const [mainImage, setMainImage] = useState("https://via.placeholder.com/300");
    const images = [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/50",
        "https://via.placeholder.com/50",
        "https://via.placeholder.com/50"
    ];
    const productName = "Product 1"
    const briefDescription = "This is a brief description of Product 1."
    const rating = 4.5
    const views = 132
    const originalPrice = "$199.99"
    const currentPrice = "$99.99"
    const discount = "50%"
    const details = "These are the details of Product 1."

    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:5000/get-product/${productId}`, {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Product:', data);
                setProduct(data);
            } else {
                console.log('Product not found');
            }
        } catch (error) {
            console.error('Product error:', error);
        }
    };

    const updateProductViews = async () => {
        try {
            const response = await fetch(`http://localhost:5000/update-product-views/${productId}`, {
                method: 'PUT',
                credentials: 'include'
            });
            if (response.ok) {
                console.log('Product views updated');
            } else {
                console.log('Product views not updated');
            }
        } catch (error) {
            console.error('Product views error:', error);
        }
    };

    useEffect(() => {
        fetchProduct();
        updateProductViews();
        getSellerIconPath();
    }, []);

  
    const getSellerIconPath = async () => {
        try {
            const response = await fetch(`http://localhost:5000/get-seller-icon/${product.sellerId}`, {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setSellerIcon(data.icon);
                return data.icon;

            } else {
                console.log('Seller icon not found');
                console.log(response, product.sellerId);
            }
        } catch (error) {
            console.error('Seller icon error:', error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="bg-white p-6 rounded-lg shadow-md max-w-screen-xl mx-auto">
                <p className="text-sm text-gray-500 mb-4">{`Home > ${product.productType} > ${product.name}`}</p>
                <div className='flex flex-row space-x-4'>
                    <div className="flex-grow justify-center">
                        <img className="w-[500px] h-auto object-cover" src={`http://localhost:5000/uploads/${product.images}`} alt="Main product" />
                        <div className='flex flex-row space-x-2 mt-4'>
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    className="w-16 h-16 object-cover cursor-pointer"
                                    src={`http://localhost:5000/uploads/${product.images}`}
                                    alt="Sub Product"
                                    onClick={() => setMainImage(image)}
                                />
                            )
                            )}

                        </div>
                    </div>
                    <div className="flex-grow space-y-5">
                        <h1 className="text-4xl font-extrabold mb-4">{product.name}</h1>
                        <p className="text-gray-500 mb-2 text-sm">{product.productStatus}</p>
                        <p className='text-gray-500'>Views: {product.views}</p>
                        <p className="text-lg font-semibold mb-4">
                            <span className="text-gray-500 line-through mr-2">{product.price}</span>
                            <span className="text-red-500">{currentPrice}</span>
                            <span className="text-green-500 ml-2">-{discount}</span>
                        </p>
                        <hr className="my-4" />
                        <div className='space-y-5'>
                            <Link to={`/UserDetail/${product.sellerId}`}>   
                            <div className='flex flex-row space-x-1'>
                                <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button">
                                    <img className="w-8 h-8 rounded-full" src={`http://localhost:5000/uploads/${sellerIcon}`} alt="Guest user photo" />
                                </button>
                                <div>{product.sellerName}</div>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <p className="ms-2 text-sm font-bold text-gray-900 ">{rating}</p>
                                <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full "></span>
                                <a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline">73 reviews</a>
                            </div>
                            </Link>

                            <div className='flex space-x-5'>
                                <button className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600">Contact Seller</button>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <h1 className="text-xl font-bold mb-2">Details</h1>
                    <p className="text-gray-500">{product.description}</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductDetail;