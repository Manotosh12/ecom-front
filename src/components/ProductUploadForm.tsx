import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Plus, UploadCloud } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number; 
  imagePath: string | File;
}

const ProductUploadForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imagePath, setImagePath] = useState<File | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetFields = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImagePath(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddProduct = () => {
    if (!name || !description || !price || !imagePath) {
      setMessage('⚠️ Please fill all fields and choose an image.');
      return;
    }

    const newProduct: Product = {
      name, description, price: parseFloat(price), imagePath,
      id: 0
    };
    setProducts([...products, newProduct]);
    resetFields();
    setMessage('✅ Product added. Add more or upload all.');
  };

  const handleUploadAll = async () => {
  if (products.length === 0) {
    setMessage('⚠️ Add at least one product before uploading.');
    return;
  }

  setLoading(true);
  setMessage('');

  try {
    for (const product of products) {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price.toString());
      formData.append('image', product.imagePath); // key must match FileInterceptor('image')

      await axios.post('http://localhost:3000/products/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }

    setMessage(`🎉 Uploaded ${products.length} product(s) successfully!`);
    setProducts([]);
  } catch (error) {
    console.error(error);
    setMessage('❌ Failed to upload. Try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Add New Product</h2>

      {/* Name */}
      <label className="block mb-4">
        <span className="font-semibold">Name</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full mt-1"
          required
        />
      </label>

      {/* Description */}
      <label className="block mb-4">
        <span className="font-semibold">Description</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full mt-1"
          required
        />
      </label>

      {/* Price */}
      <label className="block mb-4">
        <span className="font-semibold">Price</span>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full mt-1"
          min={0}
          required
        />
      </label>

      {/* Image Upload */}
      <label className="block mb-4">
        <span className="font-semibold">Product Image</span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setImagePath(file || null);
          }}
          className="hidden"
          ref={fileInputRef}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded mt-2 hover:bg-gray-300"
        >
          Select Image
        </button>
        {imagePath && (
          <p className="text-sm text-gray-600 mt-2">Selected: {imagePath.name}</p>
        )}
      </label>

      {/* Add Button */}
      <div className="flex items-center gap-4 mb-6">
        <button
          type="button"
          onClick={handleAddProduct}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          <Plus size={18} />
          Add Product
        </button>
        <button
          type="button"
          onClick={handleUploadAll}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          <UploadCloud size={18} />
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {/* Message */}
      {message && (
        <p className="text-center text-gray-700 font-medium mt-4">{message}</p>
      )}

      {/* Preview Added Products */}
      {products.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2 text-gray-800">
            Added Products ({products.length})
          </h3>
          <ul className="space-y-2">
            {products.map((p, idx) => (
              <li
                key={idx}
                className="border rounded p-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-gray-600">{p.description}</p>
                  <p className="text-sm text-gray-800 font-medium">₹{p.price}</p>
                </div>
                <div>
                  <img
                    src={typeof p.imagePath === 'string' ? p.imagePath : URL.createObjectURL(p.imagePath)}
                    alt="Preview"
                    className="w-14 h-14 object-cover rounded"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductUploadForm;
