import React from "react";
import { Routes, Route } from "react-router-dom";

import ProductPage from "./ProductPage";
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import ProductList from "./admin/ProductList";
import Profile from "./admin/Profile";
import AdminManager from "./admin/AdminManager";
import ResetPassword from "./admin/ResetPassword";
import TeaManager from "./admin/TeaManager";
import CoconutManager from "./admin/CoconutManager";
import SpicesManager from "./admin/SpicesManager";
import RiceManager from "./admin/RiceManager";
import TeaLoader from "./components/TeaLoader";

// New UI imports
import Home from './user/pages/Home';
import Products from './user/pages/Products';
import TeaProducts from './user/pages/TeaProducts';
import CoconutProducts from './user/pages/CoconutProducts';
import SpicesProducts from './user/pages/SpicesProducts';
import RiceProducts from './user/pages/RiceProducts';
import About from './user/pages/About';
import Contact from './user/pages/Contact';
import './user/assets/styles/ui.css';



import TestHero from "./user/pages/TestHero";

function App() {
  return (
    <Routes>
      {/* User UI */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/tea" element={<TeaProducts />} />
      <Route path="/coconut" element={<CoconutProducts />} />
      <Route path="/spices" element={<SpicesProducts />} />
      <Route path="/rice" element={<RiceProducts />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Product View */}
      <Route path="/product/:id" element={<ProductPage />} />

      {/* Admin UI */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/loading" element={<TeaLoader />} />

      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/products" element={<ProductList />} />
      <Route path="/admin/profile" element={<Profile />} />
      <Route path="/admin/admins" element={<AdminManager />} />
      <Route path="/admin/reset-password" element={<ResetPassword />} />

      <Route path="/admin/tea" element={<TeaManager />} />
      <Route path="/admin/coconut" element={<CoconutManager />} />
      <Route path="/admin/spices" element={<SpicesManager />} />
      <Route path="/admin/rice" element={<RiceManager />} />

      <Route path="/admin" element={<Login />} />

      <Route path="/test-ui" element={<TestHero />} />

    </Routes>
  );
}

export default App;
