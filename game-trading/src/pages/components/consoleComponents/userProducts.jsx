function UserProducts() {
    return (
        <div className="">
            <h1 className="text-2xl">Selling Products</h1>
            <div className="p-5 bg-gray-400 rounded-md space-y-5">
                <h2 className="text-xl">User Information</h2>
                <ul className="space-y-5">
                    <li>Username: </li>
                    <li>Email: </li>
                    <li>Phone: </li>
                    <li>Description: </li>
                </ul>
            </div>
        </div>
    );
}
export default UserProducts;