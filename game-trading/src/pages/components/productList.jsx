import { Link } from 'react-router-dom';

function ProductCard({ product }) {
    return (
        <div className="w-full md:w-1/2 lg:w-1/4 mb-10">
            <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow md:p-6 dark:border-gray-700 mx-4">
                <Link to="/Product">
                    <div className="flex items-center mb-4 ">
                        <img src={product.sellerIcon} className="max-w-none h-10 me-3" alt="Seller Icon"></img>
                        <div>
                            <div className="h-2.5 w-32 mb-2">Selling</div>
                            <div className="w-48 h-2 ">{product.sellerName}</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded">
                        <img className="bg-center bg-cover" src={product.image} alt={product.name}></img>
                    </div>
                    <div className="h-2.5 w-48 mb-4 ">{product.name}</div>
                    <div className="h-2 mb-2.5 ">{product.description}</div>
                    <div className="h-2 mb-2.5 ">{product.phase}</div>
                    <div className="h-2 text-orange-400">${product.price}</div>
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
            <div className='max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4'>
                <ul className="flex items-center -space-x-px h-8 text-sm">
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Previous</span>
                            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page" className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Next</span>
                            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ProductList;