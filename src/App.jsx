import { useEffect, useState, useRef } from "react";

import { data } from "./assets/data";
import { motion } from "motion/react";
import PropTypes from "prop-types";
import { PropagateLoader } from "react-spinners";
import addToCart from "./assets/add-to-cart-3046.svg";
import "./App.css";

const containerVarients = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVarients = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemDetailsVarients = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1 },
};

function App() {
  const loaderRef = useRef(null);
  const items = data;
  const batch_size = 6;
  const [batchNumber, setBatchNumber] = useState(0);
  const [sliceitems, setSliceItems] = useState(
    items.slice(batchNumber, batch_size)
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("intersecting");
        setBatchNumber((prev) => prev + batch_size);
      }
    });
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setSliceItems((prev) => [
      ...prev,
      ...items.slice(batchNumber, batchNumber + 7),
    ]);
  }, [batchNumber, items]);

  return (
    <>
      <div className="App">
        <NavBar />
        <motion.div
          className=" items_container"
          variants={containerVarients}
          initial="hidden"
          animate="show"
        >
          {sliceitems.map((item) => (
            <Item key={item.id}>{item}</Item>
          ))}
          <div className="loader" ref={loaderRef}>
            <PropagateLoader color="#ffffff" />
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default App;

const Item = ({ children }) => {
  return (
    <>
      <motion.div className="item_container" variants={itemVarients}>
        <motion.div className="item" variants={itemVarients}>
          <motion.div className="img_container" variants={itemDetailsVarients}>
            <motion.img
              src={children.image}
              alt={children.title}
              variants={itemDetailsVarients}
              id="img"
            />
            <motion.img id="add-to-cart" src={addToCart} alt="add to cart" />
          </motion.div>
          <motion.span className="title" variants={itemDetailsVarients}>
            {children.title}
          </motion.span>
          <motion.span
            className="category_container"
            variants={itemDetailsVarients}
          >
            <motion.span className="category">{children.category}</motion.span>
          </motion.span>
          <motion.span className="price" variants={itemDetailsVarients}>
            <motion.span variants={itemDetailsVarients}>
              <span id="dollar">$</span>
              {children.price}
            </motion.span>
            <motion.button
              variants={itemDetailsVarients}
              whileHover={{ scale: 1.05 }}
            >
              Buy
            </motion.button>
          </motion.span>
        </motion.div>
      </motion.div>
    </>
  );
};

Item.propTypes = {
  children: PropTypes.node,
};

const NavBar = () => {
  return (
    <>
      <div className="nav"></div>
    </>
  );
};
