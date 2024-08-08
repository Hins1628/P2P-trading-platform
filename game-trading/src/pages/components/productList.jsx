import { Link } from 'react-router-dom';
import moment from 'moment';


function ProductCard({ product }) {
    return (
        <div className="w-full md:w-1/2 lg:w-1/4 mb-10">
            <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow md:p-6 dark:border-gray-700 mx-4">
                <Link to="/Product">
                    <div className="flex items-center mb-4">
                        <img src={product.sellerIcon} className="max-w-none h-10 me-3" alt="Seller Icon"></img>
                        <div>
                            <div className="h-2.5 w-32 mb-2">{product.sellerName}</div>
                            <div className="w-48 h-2 text-gray-500">{moment(product.time).fromNow()}</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded">
                        <img className="bg-center bg-cover" src={`http://localhost:5000/uploads/${product.images}`}  alt={product.name}></img>
                    </div>
                    <div className="h-2.5 w-48 mb-4 ">{product.name}</div>
                    <div className="text-orange-400">${product.price}</div>
                    <div className="h-2 mb-2.5 ">{product.productStatus}</div>

    
                    <span className="sr-only">Loading...</span>
                </Link>
            </div>

        </div>
    );
}

function ProductList({ products }) {
    return (
        <div className="flex flex-wrap items-start justify-between mt-5">
            {products.map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
    );
}

export default ProductList;