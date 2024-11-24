import { useEffect, useState, useRef } from "react";
import Item from "./components/Item";
import { data } from "./assets/data";
import { motion } from "motion/react";
import { PropagateLoader } from "react-spinners";
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
    setSliceItems(items.slice(batchNumber, batchNumber + 7));
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
            <Item
              key={item.id}
              itemVarients={itemVarients}
              itemDetailsVarients={itemDetailsVarients}
            >
              {item}
            </Item>
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

const NavBar = () => {
  return (
    <>
      <div className="nav"></div>
    </>
  );
};
