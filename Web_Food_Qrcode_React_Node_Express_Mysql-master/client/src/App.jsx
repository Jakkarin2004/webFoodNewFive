// App.jsx
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Auth
import ProtectedRoute from './components/ProtectedRoute';
import useAuthStore from './stores/authStore';

//Owner
import ManageCategory from './pages/owner/ManageCategory';
import ManageStaff from './pages/owner/ManageStaff';
import ManageMenu from './pages/owner/ManageMenu';
import ManageTable from './pages/owner/ManageTable';
import Login from './pages/auth/Login';
import Dashboard from './pages/owner/Dashboard';
import OwnerLayout from './layouts/OwnerLayout';
import ManageOrders from './pages/owner/ManageOrders';
import OrderHistory from './pages/owner/OrderHistory';
import StoreManagement from './pages/owner/StoreManagement'
import UserProfileManagement from './pages/owner/UserProfileManagement';

// User
import UserMenu from './pages/user/UserMenu'
import UserProduct from './pages/user/UserProduct'
import UserHome from './pages/user/UserHome'
import UserOrderList from './pages/user/UserOrderList';
import ViewBill from './pages/user/ViewBill';

//on top
import ScrollToTop from "./ScrollToTop"; // หรือเส้นทางที่คุณวางไว้


// Error 
import Error404Page from './components/Error404Page';
import ViewRes from './pages/user/ViewRes';

function App() {
  const isHydrated = useAuthStore((state) => state._hasHydrated);

  // ✅ แสดงหน้า Loading จนกว่า Zustand จะ hydrate เสร็จ
  if (!isHydrated) return <div>⏳ Loading authentication...</div>;

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <OwnerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StoreManagement/>} />
          <Route path="/menu" element={<ManageMenu />} />
          <Route path="/category" element={<ManageCategory />} />
          <Route path="/staff" element={<ManageStaff />} />
          <Route path="/table" element={<ManageTable />} />
          <Route path="/orders" element={<ManageOrders />} />
          <Route path="/order-history" element={<OrderHistory />} />
          {/* <Route path="/store" element={<StoreManagement />} /> */}
          <Route path="/profile" element={<UserProfileManagement />} />
        </Route>

          <Route path="/user-menu/table/:table_number" element={<UserMenu />} />
          <Route path="/user-product/table/:table_number" element={<UserProduct />} />
          <Route path="/user-home/table/:table_number" element={<UserHome />} />
          <Route path="/user-orders/table/:table_number" element={<UserOrderList />} />
          <Route path="/user/viewOrder-list/:order_code" element={<ViewBill />} />
          <Route path="/user/viewRes/:table_number" element={<ViewRes />} />
      
          <Route path="/404" element={<Error404Page />} />
          <Route path="*" element={<Error404Page />} />
      </Routes>
    </Router>
  );
}

export default App;
