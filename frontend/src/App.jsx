import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import CheckoutPage from "./pages/CheckoutPage";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import PrivateRouter from "./components/PrivateRouter";
import AdminRouter from "./components/AdminRouter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupRole from "./pages/SignupRole";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import OrderPage from "./pages/OrderPage";
import SellerProducts from "./pages/SellerProducts.jsx";
import AddProduct from "./pages/AddProducts.jsx";
import EditProduct from "./pages/EditProduct.jsx";
function App(){
return(
 <Router>
    <Navbar/>

  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<ProductList/>}/> 
    <Route path="/product/:id" element={<ProductDetails/>}/>   
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/signup-role" element={<SignupRole />} />

    
    {/* Customer Routes */}
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>
        <Route path="/my-orders" element={<OrderPage/>}/>    


    {/* Admin Routes */}
    <Route  element={<AdminRouter/>}>
      <Route path="/admin/analytics" element={<AnalyticsDashboard />} />          
    </Route>

    {/* Seller Routes */}

    <Route path="/my-products" element={<SellerProducts />} />
    <Route path="/seller/products/create" element={<AddProduct />} />
    <Route path="/products/:id/edit" element={<EditProduct />} />


        
      
    
    
  </Routes>
 </Router>
)

}
export default App;
