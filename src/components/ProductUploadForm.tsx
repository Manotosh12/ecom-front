import React, { useState } from 'react';
import axios from 'axios';
 
const ProductUploadForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 
    if (!name || !description || !price || !imageFile) {
      setMessage('Please fill in all fields and select an image.');
      return;
    }
 
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('image', imageFile);
 
    setLoading(true);
    setMessage('');
 
    try {
      const response = await axios.post('http://localhost:3000/products/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
 
      setMessage(`Product "${response.data.name}" uploaded successfully!`);
 
      // Clear form
      setName('');
      setDescription('');
      setPrice('');
      setImageFile(null);
    } catch (error) {
      console.error(error);
      setMessage('Failed to upload product. Please try again.');
    } finally {
      setLoading(false);
    }
  };
 
  return (
<form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 border rounded shadow">
<h2 className="text-xl font-bold mb-4">Add New Product</h2>
 
      <label className="block mb-2 font-semibold">
        Name
<input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-400 rounded px-3 py-2 w-full mt-1"
        />
</label>
 
      <label className="block mb-2 font-semibold">
        Description
<textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border border-gray-400 rounded px-3 py-2 w-full mt-1"
        />
</label>
 
      <label className="block mb-2 font-semibold">
        Price
<input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
          min={0}
          className="border border-gray-400 rounded px-3 py-2 w-full mt-1"
        />
</label>
 
      <label className="block mb-4 font-semibold">
  Image
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        setImageFile(file);
      } else {
        setImageFile(null);
      }
    }}
    required
    className="hidden" // Hide the default file input
    id="fileInput"
  />
  <button
    type="button"
    onClick={() => document.getElementById('fileInput')?.click()} // Trigger file input dialog
    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
  >
    Select Image
  </button>
  {imageFile && <p className="mt-2 text-sm text-gray-600">Selected: {imageFile.name}</p>}
</label>
 
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
>
        {loading ? 'Uploading...' : 'Upload Product'}
</button>
 
      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
</form>
  );
};
 
export default ProductUploadForm;