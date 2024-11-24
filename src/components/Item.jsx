import PropTypes from "prop-types";
import addToCart from "../assets/add-to-cart-3046.svg";
import { motion } from "motion/react";

const Item = ({ itemVarients, itemDetailsVarients, children }) => {
  return (
    <>
      <motion.div className="item_container" variants={itemVarients} layout>
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
          <motion.span
            className="category_container"
            variants={itemDetailsVarients}
          >
            <motion.span className="category">{children.category}</motion.span>
          </motion.span>
          <motion.span className="title" variants={itemDetailsVarients}>
            {children.title}
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
  itemVarients: PropTypes.any,
  itemDetailsVarients: PropTypes.any,
  children: PropTypes.any,
};

export default Item;
