import './index.css'; 
import React from 'react';
import UpperNavbar from './components/UpperNavbar';
import ProductUploadForm from './components/ProductUploadForm';
import ProductList from './components/ProductList';

const App: React.FC = () => {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-gray-50 flex flex-col">
      <UpperNavbar />
      <main className="flex-grow max-w-5xl mx-auto p-6 w-full">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
          Welcome to the Store
        </h1>

        <section className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">
            Upload a New Product
          </h2>
          <ProductUploadForm />
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
            Product Catalog
          </h2>
          <ProductList />
        </section>
      </main>

      <footer className="bg-gray-100 text-center p-4 text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Your Store. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
