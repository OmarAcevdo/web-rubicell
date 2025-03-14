import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProductsPage from './pages/ProductsPage'
import RegisterPage from './pages/RegisterPage'
import DashboardHomePage from './pages/DashboardHomePage'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import NavbarDashboard from './components/NavbarDashboard'
import CartPage from './pages/CartPage'
import AboutUsPage from './pages/AboutUsPage'
import ContactPage from './pages/ContactPage'
import { useSelector } from 'react-redux'
import { getAuth } from './store/authSlice'
import Asidde from './components/Asidde'
import UsersDashboardPage from './pages/UsersDashboardPage'
import ProductsDashboardPage from './pages/ProductsDashboardPage'
import InventoryDashboardPage from './pages/InventoryDashboardPage'
import ProductSinglePage from './pages/ProductSinglePage'
import Success from './pages/Success'
import Failure from './pages/Failure'

const App = () => {

  const pathname=useLocation()

  const auth = useSelector(getAuth)
  return (
    <>
    {pathname.pathname.startsWith("/dashboard")?
      <>
        <NavbarDashboard />
        <Asidde />
      </>
    : <Navbar/>
  
  }

      <Routes>

        {auth.isAuth && auth.isAdmin ? 
        <>
          <Route path='/dashboard' element={<DashboardHomePage />} />
          <Route path='/dashboard/users' element={<UsersDashboardPage />} />
          <Route path='/dashboard/users/:id' element={<UsersDashboardPage />} />
          <Route path='/dashboard/products' element={<ProductsDashboardPage />} />
          <Route path='/dashboard/products/:id' element={<ProductsDashboardPage />} />
          <Route path='/dashboard/inventory' element={<InventoryDashboardPage />} />
        </>
          :
          <>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/products/:id' element={<ProductSinglePage/>} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/contact' element={<ContactPage/>}/>
            <Route path='/aboutus' element={<AboutUsPage/>}/>
            <Route path='/dashboard/*' element={<Navigate to="/login"/>} />
            <Route path="/success" element={<Success />} />
            <Route path="/failure" element={<Failure />} />
          </>
        }
        

      </Routes>
    </>
  )
}

export default App