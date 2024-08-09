import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductList from './components/productList';
import Navbar from './components/navBar';
import Footer from './components/footer';

function UserDetail() {
    const { userId } = useParams();  
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        description: '',
        icon: []
    });
    const [userProduct, setUserProduct] = useState([]);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/get-seller-info/${userId}`, {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                console.log('User info:', data.seller, user);
                setUser(data.seller);
                setUserProduct(data.sellerProducts);
            } else {
                console.log('User info not found');
            }
        } catch (error) {
            console.error('User info error:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        setComments([...comments, newComment]);
        setNewComment('');
    };

    return (
        <>
            <Navbar />
            <div className="max-w-screen-xl mx-auto p-5">

                <h1 className="text-3xl font-bold mb-5">User Profile</h1>
                <div className="bg-white shadow-md rounded-lg p-6 space-y-6 ">
                    <div className="flex flex-row items-center space-x-4 justify-between">
                        <div className='flex flex-row space-x-5'>
                            <img className="h-20 w-20 rounded-full" src={`http://localhost:5000/uploads/${user.icon}`} alt="User Icon" />
                            <div>
                                <h2 className="text-2xl font-semibold">{user.name}</h2>
                                <div className="flex items-center space-x-2">
                                    <span className="text-yellow-500">★★★★☆</span> {/* Placeholder for user rating */}
                                    <span className="text-gray-600">(4.0)</span> {/* Placeholder for rating value */}
                                </div>
                                <div className="text-gray-500">{user.email}</div>
                            </div>
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mt-2">Follow</button>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">User Description:</h3>
                        <div className="space-y-2">
                            <ul className="space-y-2">
                                <li>{user.description}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Selling Products:</h3>
                        <ProductList products={userProduct} />
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Comments</h3>
                        <div className="space-y-2">
                            {comments.map((comment, index) => (
                                <div key={index} className="bg-gray-100 p-3 rounded-md">
                                    {comment}
                                </div>
                            ))}
                        </div>
                        <div className="flex space-x-2">
                            <input
                                className="block w-full border-gray-300 rounded-md p-2"
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment"
                            />
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddComment}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default UserDetail;