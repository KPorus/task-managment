import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { route } from './Router/Route';
import './App.css';
import { Toaster } from 'react-hot-toast';



function App() {
  return (
    <div>
      <RouterProvider router={route}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
