import { useState, useEffect } from 'react';

function UserProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState("Default name");
    const [email, setEmail] = useState("Default email");
    const [phone, setPhone] = useState("12345678");
    const [description, setDescription] = useState("hi");
    const [user, setUser] = useState({});



    const handleUserSave = () => {
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
        //fetchUserData();
    }, []);

    return (
        <div className="">
            <h1 className="text-2xl">User Profile</h1>
            <div className="p-5 bg-gray-400 rounded-md space-y-5">
                <h2 className="text-xl">User Information</h2>
                {isEditing ? (
                    <>
                        <div className='flex flex-col space-y-5'>
                            <input className="rounded" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleUserSave()}>Save</button>
                        </div>
                    </>
                ) : (
                    <>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsEditing(true)}>Edit</button>
                        <ul className="space-y-5">
                            <li>Username: {username}</li>
                            <li>Email: {email}</li>
                            <li>Phone: {phone}</li>
                            <li>Description: {description}</li>
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}
export default UserProfile;