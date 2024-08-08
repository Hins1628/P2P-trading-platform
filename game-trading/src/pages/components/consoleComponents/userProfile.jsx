import { useState, useEffect } from 'react';

function UserProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        description: ''
    });

    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleUserSave = async () => {
        try {
            const response = await fetch('http://localhost:5000/update-user-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(user)
            });
            if (response.ok) {
                console.log('User info updated');
                fetchUserData();
            } else {
                console.log('User info not updated');
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
                console.log('User info:', data);
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

    return (
        <div className="">
            <h1 className="text-2xl">User Profile</h1>
            <div className="p-5 bg-gray-400 rounded-md space-y-5">
                <h2 className="text-xl">User Information</h2>
                {isEditing ? (
                    <>
                        <div className='flex flex-col space-y-5'>
                            <input name="name" className="rounded" type="text" value={user.name} onChange={handleInputChange} />
                            <input name="email" type="text" value={user.email} onChange={handleInputChange} />
                            <input name="phone" type="text" value={user.phone} onChange={handleInputChange} />
                            <input name="description" type="text" value={user.description} onChange={handleInputChange} />
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleUserSave()}>Save</button>
                        </div>
                    </>
                ) : (
                    <>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsEditing(true)}>Edit</button>
                        <ul className="space-y-5">
                            <li>Username: {user.name}</li>
                            <li>Email: {user.email}</li>
                            <li>Phone: {user.phone}</li>
                            <li>Description: {user.description}</li>
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}
export default UserProfile;