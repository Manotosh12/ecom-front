import './index.css'; 
import React from 'react';
import UpperNavbar from './components/UpperNavbar';
import ProductUploadForm from './components/ProductUploadForm';
import ProductList from './components/ProductList';


const App: React.FC = () => {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden">
      <UpperNavbar />
      <main className="p-4">
        <h1 className="text-2xl">Welcome to the Store</h1>
        {/* Add product listing or content here */}
      </main>
      <ProductUploadForm/>
      <div>
      <h1 className="text-2xl font-bold text-center my-6">Product Catalog</h1>
      <ProductList />
    </div>
    </div>
  );
};


export default App;
