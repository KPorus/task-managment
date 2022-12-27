import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { route } from './Router/Route';
import './App.css';


function App() {
  return (
    <div>
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
