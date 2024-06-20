import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Navbar from './Components/Navbar';
import HomePage from './Pages/HomePage';
import ArchivedNotes from './Pages/ArchivedNotes';
import Layout from './Layout';
import CreateNotePage from './Pages/CreateNotePage';
import EditNotePage from './Pages/EditNotePage'; 
import CategoryPage from './Pages/CategoryPage';
import ManageCategoriesPage from './Pages/ManageCategoriesPage';

const App = () => {
  const [user, setUser] = useState(null);

  // Load user from localStorage and listen for changes
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  return (
    <Router>
      <Layout>
        {user && <Navbar />}
        <div className="container mx-auto">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/" 
              element={user ? <HomePage /> : <Login />} 
            />
            <Route 
              path="/archived" 
              element={user ? <ArchivedNotes /> : <Login />} 
            />
            <Route 
              path="/notes/create" 
              element={user ? <CreateNotePage /> : <Login />} 
            />
            <Route 
              path="/edit/:noteId" 
              element={user ? <EditNotePage /> : <Login />} 
            />
            <Route 
              path="/user/:username/category/:categoryName" 
              element={user ? <CategoryPage /> : <Login />} 
            />
            <Route 
              path="/categories" 
              element={user ? <ManageCategoriesPage /> : <Login />} 
            />
          </Routes>
        </div>
      </Layout>
    </Router>
  );
};

export default App;
