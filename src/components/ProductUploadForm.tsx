import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Plus, UploadCloud } from 'lucide-react';

interface Product {
  name: string;
  description: string;
  price: string;
  imageFile: File;
}

const ProductUploadForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetFields = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddProduct = () => {
    if (!name || !description || !price || !imageFile) {
      setMessage('Please fill in all fields and select an image.');
      return;
    }

    const newProduct: Product = { name, description, price, imageFile };
    setProducts([...products, newProduct]);
    resetFields();
    setMessage('✅ Product added. You can add more or upload all.');
  };

  const handleUploadAll = async () => {
    if (products.length === 0) {
      setMessage('⚠️ Add at least one product before uploading.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      products.forEach((product, index) => {
        formData.append(`products[${index}][name]`, product.name);
        formData.append(`products[${index}][description]`, product.description);
        formData.append(`products[${index}][price]`, product.price);
        formData.append(`products[${index}][image]`, product.imageFile);
      });

      await axios.post('http://localhost:3000/products/upload-multiple', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

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
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white py-10 px-4">
      <form className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-2xl space-y-6 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-green-700">🌿 Add New Product</h2>

        <div className="grid gap-5">
          <label className="flex flex-col">
            <span className="font-semibold text-gray-700">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="font-semibold text-gray-700">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 border px-4 py-2 rounded resize-none h-24 focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="font-semibold text-gray-700">Price (₹)</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
              min={0}
              required
            />
          </label>

          <div>
            <span className="font-semibold text-gray-700">Image</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file?.type.startsWith('image/')) {
                  setImageFile(file);
                } else {
                  setImageFile(null);
                  setMessage('⚠️ Please select a valid image.');
                }
              }}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="mt-2 inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded cursor-pointer hover:bg-green-200 transition"
            >
              <UploadCloud className="w-4 h-4" />
              Select Image
            </label>
            {imageFile && <p className="mt-1 text-sm text-green-700">Selected: {imageFile.name}</p>}
          </div>
        </div>

        <div className="flex justify-between items-center gap-4">
          <button
            type="button"
            onClick={handleAddProduct}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <Plus className="w-5 h-5" />
            Add
          </button>

          <button
            type="button"
            onClick={handleUploadAll}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload All Products'}
          </button>
        </div>

        {message && (
          <p className="text-center mt-4 font-medium text-gray-800">{message}</p>
        )}

        {products.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">🧾 Products Preview</h3>
            <ul className="space-y-3">
              {products.map((p, index) => (
                <li
                  key={index}
                  className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
                >
                  <p><span className="font-bold">Name:</span> {p.name}</p>
                  <p><span className="font-bold">Price:</span> ₹{p.price}</p>
                  <p><span className="font-bold">Image:</span> {p.imageFile.name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProductUploadForm;
