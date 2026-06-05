import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import CreatePage from './pages/CreatePage';
import EditProductPage from './pages/EditProductPage';


function App() {
  
  return <>
  <div className="min-h-screen bg-base-100">
    <Navbar />
    <main className="max-w-5xl mx-auto py-8 px-4">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit/:id" element={<EditProductPage />} />

      </Routes>
    </main>

  </div>

  </>;
}

export default App;
