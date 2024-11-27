import { motion } from "motion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BaseElement from "./components/BaseElement";
import Product from "./components/Product";
import "./App.css";

function App() {
  return (
    <>
      <motion.div className="App">
        <NavBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BaseElement />}>
              <Route path="/product/:id" element={<Product />} />
            </Route>
            <Route path="*" element={<h1>not found</h1>} />
          </Routes>
        </BrowserRouter>
      </motion.div>
    </>
  );
}

export default App;

const NavBar = () => {
  return (
    <>
      <motion.div
        className="nav"
        initial={{ height: 0 }}
        animate={{
          height: "3.5em",
        }}
      >
        <span>
          <img
            src={"https://www.svgrepo.com/show/311482/wrench.svg"}
            alt="gear"
            id="gear"
          />
        </span>
        <span id="logo">ECOM</span>
        <span id="user_icons">
          <img
            src={"https://www.svgrepo.com/show/529450/cart-large-2.svg"}
            alt="cart"
            id="cart"
          />
          <img
            src={"https://www.svgrepo.com/show/527946/user-circle.svg"}
            alt="user"
            id="user"
          />
        </span>
      </motion.div>
    </>
  );
};
