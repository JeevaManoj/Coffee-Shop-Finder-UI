import './App.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import StoreDetails from './pages/store/StoreDetails';

function App() {

  const queryClient = new QueryClient()

  // Overall layout of the website with header, content and footer

  const Layout = () => {

    return (
      <div className="app">
  
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
  
      </div>
    );
  
  }

  // URL routes for the website
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/store/:storeId",
          element: <StoreDetails />
        }
  
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
  
}

export default App;
