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
import AnalyticsDashboard from "./pages/AnalyticsDashboard";

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
    
    {/* Customer Routes */}
    <Route  element={<PrivateRouter/>}>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>  
    </Route>/

    {/* Admin Routes */}
    <Route  element={<AdminRouter/>}>
      <Route path="/admin/analytics" element={<AnalyticsDashboard />} />          
    </Route>


        
      
    
    
  </Routes>
 </Router>
)

}
export default App;
