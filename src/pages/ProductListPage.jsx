import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaShoppingCart } from 'react-icons/fa';
import FilterBar from '../components/FilterBar';
import SkeletonLoader from '../components/skeleton/SkeletonLoader';

const ProductListPage = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetchProductData();
    }, []);

    const fetchProductData = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/products');
            console.log(response);
            if (response && response.data && response.data.products) {
                setProducts(response.data.products);
                setFilteredProducts(response.data.products);
            }
        } catch (error) {
            toast.error('Data not available.');
            console.error(error);
        } finally {
            setLoading(false); // Set loading to false once data is fetched
        }
    };

    const handleFilterChange = (filters) => {
        let updatedProducts = [...products];

        // Filter by category
        if (filters.category) {
            updatedProducts = updatedProducts.filter(
                (product) => product.category.toLowerCase() === filters.category.toLowerCase()
            );
        }

        // Sort by price range
        if (filters.priceRange === 'asc') {
            updatedProducts.sort((a, b) => a.price - b.price);
        } else if (filters.priceRange === 'desc') {
            updatedProducts.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(updatedProducts);
    };

    const handleAddToCart = (productName) => {
        setCartCount(cartCount + 1);
        toast.success(`${productName} added to cart!`);
    };


    return (
        <div className="p-4">
            <div className='flex justify-between'>
                <h1 className="text-2xl font-bold mb-4">E-Commerce in React</h1>
                <div className="relative">
                    <FaShoppingCart className="text-2xl text-blue-500 mr-2" />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2 py-1">
                            {cartCount}
                        </span>
                    )}
                </div>

            </div>
            <FilterBar onFilterChange={handleFilterChange} />
            {loading ? (
                <SkeletonLoader /> // Show skeleton loader while loading
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-md p-4 hover:scale-105 transition-transform"
                        >
                            <img
                                src={product.images[0]} // Correct the image path
                                alt={product.name}
                                className="w-full h-40 object-cover rounded-t-md"
                            />
                            <div className="mt-4">
                                <h2 className="text-lg font-semibold">{product.title}</h2>
                                <p className="text-gray-600">$ {product.price}</p>
                                <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                                    onClick={() => handleAddToCart(product.title)}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductListPage;
