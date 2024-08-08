import { Link } from 'react-router-dom';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { set } from 'mongoose';


function ProductCard({ product, customOption }) {
    const [isManage, setIsManage] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [actionType, setActionType] = useState('');
    const [editDetails, setEditDetails] = useState({
        name: product.name,
        price: product.price,
        productStatus: product.productStatus,
    });
    const [sellerIcon, setSellerIcon] = useState('');

    useEffect(() => {
        if (customOption === 'manage') {
            setIsManage(true);
        }
    }, [customOption]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/delete-product/${product.productId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                console.log('Product deleted');
                setShowConfirm(false);
            } else {
                console.log('Product not deleted');
            }
        } catch (error) {
            console.error('Product delete error:', error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditDetails({
            ...editDetails,
            [name]: value,
        });
    };

    const handleEdit = async () => {
        try {
            const response = await fetch(`http://localhost:5000/update-product/${product.productId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: editDetails.name,
                    price: editDetails.price,
                    productStatus: editDetails.productStatus,
                }),
            });
            if (response.ok) {
                console.log('Product updated');
                setShowConfirm(false);
            } else {
                console.log('Product not updated');
            }
        } catch (error) {
            console.error('Product update error:', error);
        }
    };

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
            }
        } catch (error) {
            console.error('Seller icon error:', error);
        }
    }

    useEffect(() => {
        getSellerIconPath();
    }, []); 
    
    return (
        <div className={`w-full mb-10 px-4`}>
            <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
                <Link to={`/Product/${product.productId}`}>
                    <div className="flex items-center p-4 bg-gray-100 hover:bg-gray-200">
                        <img src={`http://localhost:5000/uploads/${sellerIcon}`} className="h-10 w-10 rounded-full mr-3" alt="Seller Icon" />
                        <div>
                            <div className="text-lg font-semibold text-gray-900">{product.sellerName}</div>
                            <div className="text-sm text-gray-500">{moment(product.time).fromNow()}</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center h-48 bg-gray-300">
                        <img className="object-cover h-full w-full" src={`http://localhost:5000/uploads/${product.images}`} alt={product.name} />
                    </div>
                    <div className="p-4">
                        <div className='flex flex-row space-x-2'>
                            <div className="text-lg font-semibold text-gray-900 mb-2">{product.name}</div>
                            <div className="text-sm text-gray-500 mb-2">Views: {product.views}</div>
                        </div>
                        <div className="text-xl font-bold text-orange-500 mb-2">${product.price}</div>
                        <div className="text-sm text-gray-500">{product.productStatus}</div>
                    </div>
                </Link>
                {isManage && (
                    <div className="flex justify-between p-4 bg-gray-100">
                        <button className="text-sm text-blue-500" onClick={() => { setShowConfirm(true); setActionType('edit'); }}>Edit</button>
                        <button className="text-sm text-red-500" onClick={() => { setShowConfirm(true); setActionType('delete'); }}>Delete</button>
                    </div>
                )}
            </div>
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        {actionType === 'delete' ? (
                            <>
                                <p>Do you want to delete the product "{product.name}"?</p>
                                <div className="flex justify-end mt-4">
                                    <button className="mr-2 px-4 py-2 bg-gray-200 rounded" onClick={() => setShowConfirm(false)}>Cancel</button>
                                    <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleDelete}>Delete</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p>Edit the details of the product "{product.name}"</p>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editDetails.name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={editDetails.price}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <input
                                        type="text"
                                        name="productStatus"
                                        value={editDetails.productStatus}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button className="mr-2 px-4 py-2 bg-gray-200 rounded" onClick={() => setShowConfirm(false)}>Cancel</button>
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleEdit}>Save</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function ProductList({ products, option }) {
    const sortedProducts = [...products].sort((a, b) => b.views - a.views);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {sortedProducts.map((product, index) => (
                <ProductCard key={index} product={product} customOption={option} />
            ))}
        </div>
    );
}

export default ProductList;