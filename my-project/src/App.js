import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import ProductDetail from './components/ProductDetail';
import ProductBox from './components/ProductBox';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Shopping from './components/Shopping';
import ContactUs from './components/ContactUs';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import Success from './components/Success';
import Pagination from './components/Pagination';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HouseIcon from '@mui/icons-material/House';
import TableRowsIcon from '@mui/icons-material/TableRows';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const App = () => {
  const [fake, setFake] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Sayfada gösterilecek ürün sayısı

  useEffect(() => {
    fakestore();
  }, []);

  useEffect(() => {
    const results = fake.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, fake]);

  const fakestore = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const jsonData = await response.json();
      setFake(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const BackButton = () => (
    <Button
      onClick={() => window.history.back()} // Back işlevi
      variant="contained"
      color="secondary"
      className="back-button"
    >
      <ArrowBackIcon />
    </Button>
  );

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Sayfalama için ürünleri belirle
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[
          { text: 'Home', icon: <HouseIcon />, path: '/' },
          { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
          { text: 'Shopping', icon: <ShoppingBasketIcon />, path: '/shopping' },
          { text: 'Contact Us', icon: <ContactMailIcon />, path: '/contact-us' },
          { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
          { text: 'Settings', icon: <SettingsIcon />, path: '/settings' }
        ].map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={path}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Router>
      <div className="button-container">
        <Button onClick={toggleDrawer(true)} variant="contained" color="primary">
          <TableRowsIcon />
        </Button>
      </div>

      <header className="header">
        <div className="header-content">
          <h1>FAKE API STORE</h1>
          <div className="search-form">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="auth-buttons">
          <Button variant="contained" color="secondary" component={Link} to="/signin">Sign In</Button>
          <Button variant="contained" color="secondary" component={Link} to="/signup">Sign Up</Button>
        </div>
      </header>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      <Routes>
        <Route path="/signin" element={<><BackButton /><SignIn /></>} />
        <Route path="/signup" element={<><BackButton /><SignUp /></>} />
        <Route path="/profile" element={<><BackButton /><Profile /></>} />
        <Route path="/shopping" element={<><BackButton /><Shopping cart={cart} /></>} />
        <Route path="/contact-us" element={<><BackButton /><ContactUs /></>} />
        <Route path="/notifications" element={<><BackButton /><Notifications /></>} />
        <Route path="/settings" element={<><BackButton /><Settings /></>} />
        <Route path="/success" element={<><BackButton /><Success /></>} />
        <Route
          path="/product-detail/:id"
          element={<><BackButton /><ProductDetail products={fake} addToCart={addToCart} /></>}
        />
        <Route
          path="/"
          element={
            <>
              <ProductBox products={currentProducts} addToCart={addToCart} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
