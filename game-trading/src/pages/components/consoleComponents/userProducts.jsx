import { useState, useEffect } from 'react';
import ProductList from '../productList';

function UserProducts() {
    const [AddingProduct, setAddingProduct] = useState(false);
    const [gotProducts, setGotProducts] = useState([]);
    const [addProduct, setAddProduct] = useState({
        images: [],
        name: '',
        description: '',
        productStatus: '',
        price: '',

    });

    useEffect(() => {
        fetchUserProducts();
    }, []);

    const handleInputChange = (e) => {
        setAddProduct({
            ...addProduct,
            [e.target.name]: e.target.value
        });
    };

    const fetchUserProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/get-user-products', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                console.log('User products:', data);
                setGotProducts(data);
                console.log('Got products:', gotProducts);
            } else {
                console.log('User products not found');
            }
        } catch (error) {
            console.error('User products error:', error);
        }
    };

    const UserAddProductToDB = async () => {
        try {
            const formData = new FormData();
            formData.append('images', addProduct.images);
            formData.append('name', addProduct.name);
            formData.append('description', addProduct.description);
            formData.append('price', addProduct.price);
            formData.append('productStatus', addProduct.productStatus); 

            const response = await fetch('http://localhost:5000/add-product', {
                method: 'POST',
                credentials: 'include',
                body: formData
            });
            if (response.ok) {
                console.log('Product added');
                fetchUserProducts();
                setAddingProduct(false);
            } else {
                console.log('Product not added');
            }
        }
        catch (error) {
            console.error('Product add error:', error);
        }

    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            alert('Invalid file type');
            return;
        }

        // Validate file size (max 2MB)
        const maxSize = 2 * 1024 * 1024; // 2MB
        console.log(file.size, maxSize);
        if (file.size > maxSize) {
            alert('File is too large:' + file.name);
            return;
        }

        // Store the file object instead of the data URL
        setAddProduct({
            ...addProduct,
            images: file
        });
    };

    return (
        <div className="">
            <div className="flex flex-row items-center justify-between my-5">
                <h1 className="text-2xl">Selling Products</h1>
                {!AddingProduct ? (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setAddingProduct(true)}>Add Product</button>
                ) : (
                    <div className='space-x-3 '>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => UserAddProductToDB()}>Confirm</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setAddingProduct(false)}>Cancel</button>
                    </div>
                )}
            </div>
            <div className="p-5 bg-gray-400 rounded-md space-y-5">
                {!AddingProduct ? (
                    <>
                        <h2 className="text-xl">Your selling Product</h2>
                        <ul className="space-y-5">
                            <ProductList products={gotProducts} />
                        </ul>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold mb-5">Enter your product detail:</h2>
                        <div className='flex flex-col space-y-5'>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Upload the product Image:</label>
                                <input className="mt-1 block w-full border-gray-300 rounded-md" name="images" type="file" value={addProduct.img} onChange={handleImageChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Product Name:</label>
                                <input className="mt-1 block w-full border-gray-300 rounded-md" name="name" type="text" value={addProduct.name} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Product Price:</label>
                                <input className="mt-1 block w-full border-gray-300 rounded-md" name="price" type="text" value={addProduct.price} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Product Status:</label>
                                <select className="mt-1 block w-full border-gray-300 rounded-md" name="productStatus" value={addProduct.productStatus} onChange={handleInputChange}>
                                    <option value="">Select a status</option>
                                    <option value="New">New</option>
                                    <option value="Like New">Like New</option>
                                    <option value="Used - Good">Used - Good</option>
                                    <option value="Used - Fair">Used - Fair</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Product Description:</label>
                                <input className="mt-1 block w-full border-gray-300 rounded-md" name="description" type="text" value={addProduct.description} onChange={handleInputChange} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
export default UserProducts;