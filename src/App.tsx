import React from 'react';
import { useQuery } from "react-query";
import { getProducts } from './api/api';
import { IAppContext, Product } from './models';
import { AppContextProvider } from "./AppContext";
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Link from './pages/Link';
import Editor from './pages/Editor';
import About from './pages/About';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



function App() {
  const productsQuery = useQuery(["products"], getProducts, { staleTime: 60000 });

  const products: Array<Product> = productsQuery.data as Array<Product>;

  const appContext: IAppContext = {
    headline: "Bästa pizzorna",
    products: products
  };

  // console.log(appContext.products);


  return (
    <AppContextProvider value={appContext}>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/link" element={<Link />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <ProductList />
      </div>
    </AppContextProvider >
  );
}

export default App;
