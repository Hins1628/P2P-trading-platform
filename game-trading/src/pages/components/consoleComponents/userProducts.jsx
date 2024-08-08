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
        productType: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchUserProducts();
    }, []);

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddProduct({ ...addProduct, [name]: value });
    };

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
        setAddProduct({ ...addProduct, images: file });
    };

    const validate = () => {
        let newErrors = {};
        if (!addProduct.images) newErrors.images = 'Product image is required';
        if (!addProduct.name.trim()) newErrors.name = 'Product name is required';
        if (!addProduct.price.trim() || isNaN(addProduct.price)) newErrors.price = 'Product price must be a number';
        if (!addProduct.productType) newErrors.productType = 'Product type is required';
        if (!addProduct.productStatus) newErrors.productStatus = 'Product status is required';
        if (!addProduct.description.trim()) newErrors.description = 'Product description is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Submit the form
            UserAddProductToDB();
        }
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
            formData.append('productType', addProduct.productType);
            console.log('Form data:', formData);
            const response = await fetch('http://localhost:5000/add-product', {
                method: 'POST',
                credentials: 'include',
                body: formData
            });
            if (response.ok) {
                console.log('Product added', addProduct);
                fetchUserProducts();
                setAddingProduct(false);
            } else {
                console.log('Product not added', addProduct, response);
            }
        }
        catch (error) {
            console.error('Product add error:', error);
        }

    }



    return (
        <div className="">
            <div className="flex flex-row items-center justify-between my-5">
                <h1 className="text-2xl">Selling Products</h1>
                {!AddingProduct ? (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setAddingProduct(true)}>Add Product</button>
                ) : (
                    <div className='space-x-3 '>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setAddingProduct(false)}>Cancel</button>
                    </div>
                )}
            </div>
            <div className="p-5 bg-gray-400 rounded-md space-y-5">
                {!AddingProduct ? (
                    <>
                        <h2 className="text-xl">Your selling Product</h2>
                        <ul className="space-y-5">
                            <ProductList products={gotProducts} option="manage" />
                        </ul>
                    </>
                ) : (
                    <div>
                        <h2 className="text-2xl font-semibold mb-5">Enter your product detail:</h2>
                        <form id="productForm" className='flex flex-col space-y-5'>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Upload the product Image:</label>
                                <input className="mt-1 block w-full border-gray-300 rounded-md" name="images" type="file" onChange={handleImageChange} />
                                {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Product Name:</label>
                                <input className="mt-1 block w-full border-gray-300 rounded-md" name="name" type="text" value={addProduct.name} onChange={handleInputChange} />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Product Price:</label>
                                <input className="mt-1 block w-full border-gray-300 rounded-md" name="price" type="text" value={addProduct.price} onChange={handleInputChange} />
                                {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Product type:</label>
                                <select className="mt-1 block w-full border-gray-300 rounded-md" name="productType" value={addProduct.productType} onChange={handleInputChange} >
                                    <option value="">Select a product type</option>
                                    <option value="Men's Clothes">Men's Clothes</option>
                                    <option value="Women's Clothes">Women's Clothes</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Books">Books</option>
                                    <option value="Home Appliances">Home Appliances</option>
                                    <option value="Furniture">Furniture</option>
                                    <option value="Toys">Toys</option>
                                    <option value="Sports Equipment">Sports Equipment</option>
                                    <option value="Beauty Products">Beauty Products</option>
                                    <option value="Automotive">Automotive</option>
                                </select>
                                {errors.productType && <p className="text-red-500 text-sm">{errors.productType}</p>}
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
                                {errors.productStatus && <p className="text-red-500 text-sm">{errors.productStatus}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Product Description:</label>
                                <input className="mt-1 block w-full border-gray-300 rounded-md" name="description" type="text" value={addProduct.description} onChange={handleInputChange} />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                            </div>
                        </form>
                        <button onClick={handleSubmit} className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-md">Confirm</button>
                    </div>
                )}
            </div>
        </div>
    );
}
export default UserProducts;