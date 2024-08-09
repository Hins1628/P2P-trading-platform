import { useState, useEffect } from 'react';
import UserProducts from './userProducts';

function UserProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        description: '',
        icon: []
    });

    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];

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
        setUser({
            ...user,
            icon: file
        });
    };

    const handleUserSave = async () => {
        try {
            const formData = new FormData();
            formData.append('name', user.name);
            formData.append('email', user.email);
            formData.append('phone', user.phone);
            formData.append('description', user.description);
            formData.append('icon', user.icon);
            const response = await fetch('http://localhost:5000/update-user-info', {
                method: 'POST',
                credentials: 'include',
                body: formData
            });
            if (response.ok) {
                console.log('User info updated');
                fetchUserData();
            } else {
                console.log('User info not updated', user);

            }
        } catch (error) {
            console.error('User info update error:', error);
        }
        setIsEditing(false);
    }

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:5000/get-user-info', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                console.log('User info:', data, user);
                setUser(data);
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
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-3xl font-bold mb-5">User Profile</h1>
            <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
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
                </div>
                <div className="space-y-4">
                    <div className="flex flex-row justify-between items-center">
                        <h3 className="text-xl font-semibold">User Information</h3>
                        {isEditing ? (
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsEditing(false)}>Cancel</button>
                        ) : (
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsEditing(true)}>Edit</button>
                        )}
                    </div>
                    {isEditing ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Upload Profile Image:</label>
                                <input className="mt-1 block w-full border-gray-300 rounded-md" name="icon" type="file" onChange={handleImageChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name:</label>
                                <input name="name" className="mt-1 block w-full border-gray-300 rounded-md p-2" type="text" value={user.name} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email:</label>
                                <input name="email" className="mt-1 block w-full border-gray-300 rounded-md p-2" type="text" value={user.email} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone:</label>
                                <input name="phone" className="mt-1 block w-full border-gray-300 rounded-md p-2" type="text" value={user.phone} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description:</label>
                                <input name="description" className="mt-1 block w-full border-gray-300 rounded-md p-2" type="text" value={user.description} onChange={handleInputChange} />
                            </div>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleUserSave}>Save</button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <ul className="space-y-2">
                                <li><strong>Username:</strong> {user.name}</li>
                                <li><strong>Email:</strong> {user.email}</li>
                                <li><strong>Phone:</strong> {user.phone}</li>
                                <li><strong>Description:</strong> {user.description}</li>
                            </ul>
                        </div>
                    )}
                </div>
                <UserProducts />
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
    );
}
export default UserProfile;