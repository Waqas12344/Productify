import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import Navbar from './components/Navbar';
import { Navigate, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import CreatePage from './pages/CreatePage';
import EditProductPage from './pages/EditProductPage';
import useAuthReq from "./hooks/useAuthReq";
import useUserSync from "./hooks/useUserSync";

function App() {
  const{isClerkLoaded, isSignedIn }=useAuthReq();
  const { isSynced } = useUserSync();

  if(!isClerkLoaded) {
    return <div>Loading...</div>;
  }
  
  return <>
  <div className="min-h-screen bg-base-100">
    <Navbar />
    <main className="max-w-5xl mx-auto py-8 px-4">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create" element={isSignedIn? <CreatePage />: <Navigate to={'/'} />} />
        <Route path="/edit/:id" element={<EditProductPage />} />

      </Routes>
    </main>

  </div>

  </>;
}

export default App;
