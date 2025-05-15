import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Product One',
    description: 'Description for product one.',
    price: 100,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Product Two',
    description: 'Description for product two.',
    price: 200,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Product Three',
    description: 'Description for product three.',
    price: 300,
    image: 'https://via.placeholder.com/150',
  },
];

const Products: React.FC = () => {
  const [products] = useState<Product[]>(sampleProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<Product[]>([]);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="max-w-7xl mx-auto p-6 font-sans">

      {/* Top Bar: Profile - Logo - Cart */}
      <div className="flex justify-between items-center mb-6">
        {/* Profile Section - left */}
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-800">Profile</span>
        </div>

        {/* Logo - center */}
        <div className="text-center">
          <img src="/logo.png" alt="Logo" className="h-16 mx-auto" />
          <h1 className="text-xl font-bold">Product Shop</h1>
        </div>

        {/* Cart - right */}
        <div className="text-right">
          <div className="font-semibold">🛒 {totalItems} items</div>
          <div className="text-gray-700">Total: ₹{totalPrice}</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border border-gray-400 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="border rounded p-4 shadow hover:shadow-lg transition flex flex-col">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h2 className="font-semibold text-lg mb-1">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-1">ID: {product.id}</p>
            <p className="mb-2 flex-grow">{product.description}</p>
            <p className="font-bold mb-3">₹{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
