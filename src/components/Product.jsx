import { motion } from "motion/react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/Product.css";

function Product() {
  const id = useParams();
  const navigate = useNavigate();
  //   console.log(id);
  return (
    <>
      <motion.div
        className="background"
        initial={{ opacity: 0, backdropFilter: "blur(0)" }}
        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
        onClick={() => navigate("/")}
      >
        <motion.div
          className="product_container"
          layoutId={`product-1`}
          onClick={(e) => e.stopPropagation()}
        >
          Product
        </motion.div>
      </motion.div>
    </>
  );
}

export default Product;
