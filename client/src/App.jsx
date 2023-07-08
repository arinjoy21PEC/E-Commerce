import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom"

import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/home/home";
import Products from "./pages/products/products";
import Product from "./pages/product/product";
import "./App.scss"

const Layout = () =>{
  return(
    <div className="app">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/products/:id",
        element:<Products/>
      },
      {
        path:"/product/:id",
        element:<Product/>
      },
    ]
  },
])


function App() {
    return(
      <div>
        <RouterProvider router={router} />
      </div>
    )
  }
  
  export default App;
