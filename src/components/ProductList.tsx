import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number; 
  imagePath: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products'); 
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-20 py-30">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {products.map((product) => (
      <div key={product.id} className="border rounded shadow p-4 bg-white">
        <img
          src={`http://localhost:3000/${product.imagePath}`}
          alt={product.name}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-blue-600 font-semibold mt-2">
          ₹{Number(product.price).toFixed(2)}
        </p>
      </div>
    ))}
  </div>
</div>

  );
};

export default ProductList;