import Home from './pages/Home';
import List from './pages/ListProduct';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import ProductDetails from './pages/ProductDetails';
import CartList from './pages/CartList';
import Payment from './pages/Payment';
import OrderHistory from './pages/OrderHistory';
import OrderDetail from './pages/OrderDetail';
import UserProfile from './pages/UserProfile';
const routes = [
    {
      path: "/signin",
      component: SignIn
    },
    {
      path: "/signup",
      component: SignUp
    },
    {
      path: "/list/:id",
      component: List
    },
    {
      path: "/reset-password",
      component: ResetPassword
    },
    {
      path: "/detail/:id",
      component: ProductDetails
    },
    {
      path: "/cart",
      component: CartList
    },
    {
      path: "/payment",
      component: Payment
    },
    {
      path: "/orderHis",
      component: OrderHistory
    },
    {
      path: "/orderDetail/:id",
      component: OrderDetail
    },
    {
      path: "/profile",
      component: UserProfile
    }
]
  
export default routes;