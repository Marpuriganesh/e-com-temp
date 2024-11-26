import { useEffect, useState, useRef } from "react";
import Item from "./components/Item";
import { data } from "./assets/data";
import { catagories } from "./assets/data";
import { motion } from "motion/react";
import { PropagateLoader } from "react-spinners";
import "./App.css";

const containerVarients = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemContainerVarients = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
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

const selectionBarVarients = {
  hidden: { scaleY: 0 },
  show: {
    scaleY: 1,
    transition: {
      staggerChildren: 0.2,
      delay: 0.2,
    },
  },
};

function App() {
  const loaderRef = useRef(null);
  const batchSize = 6;

  const [items, setItems] = useState([]);
  const [batchIndex, setBatchIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCatagory, setSelectedCatagory] = useState("All");
  const [itemsData, setItemsData] = useState(data);

  useEffect(() => {
    // console.log(
    //   "itemsData",
    //   itemsData.filter((i) => i.category === "men's clothing")
    // );
    setItemsData(
      selectedCatagory === "All"
        ? data
        : data.filter((i) => i.category === selectedCatagory.toLowerCase())
    );
    setBatchIndex(0);
    setHasMore(true);
    setItems([]);
  }, [selectedCatagory]);

  useEffect(() => {
    const loadMore = () => {
      const start = batchIndex * batchSize;
      const end = start + batchSize;
      const nextBatch = itemsData.slice(start, end);

      if (nextBatch.length > 0) {
        setItems((prevItems) => [...prevItems, ...nextBatch]);
        setBatchIndex((prevIndex) => prevIndex + 1);
      }
      if (end >= itemsData.length) {
        setHasMore(false); // No more items to load
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("intersecting");
          loadMore();
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [batchIndex, itemsData]);

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
          <motion.div
            className="select_catagories"
            variants={selectionBarVarients}
            style={{ transformOrigin: "0 0" }}
          >
            {catagories.map((c, id) => {
              return (
                <motion.span
                  key={id}
                  // whileHover={{
                  //   scale: `${selectedCatagory === c ? 1 : 1.1}`,
                  // }}
                  variants={itemDetailsVarients}
                  style={{
                    color: `${selectedCatagory === c ? "white" : ""}`,
                  }}
                  onClick={() => setSelectedCatagory(c)}
                >
                  {selectedCatagory === c && (
                    <motion.div layoutId="animate" className="select_animate" />
                  )}
                  {c}
                </motion.span>
              );
            })}
          </motion.div>
          {items.map((item) => (
            <Item
              key={item.id}
              itemContainerVarients={itemContainerVarients}
              itemVarients={itemVarients}
              itemDetailsVarients={itemDetailsVarients}
            >
              {item}
            </Item>
          ))}
          {hasMore && (
            <div className="loader" ref={loaderRef}>
              <PropagateLoader color="#ffffff" />
            </div>
          )}
        </motion.div>
      </div>
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
        animate={{ height: "3.5em" }}
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
