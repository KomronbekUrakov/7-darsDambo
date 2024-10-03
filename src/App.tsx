import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "./REDUX/likeSlice";
import { RootState } from "./REDUX/store";

interface IProduct {
  availabilityStatus: string;
  brand: string;
  category: string;
  description: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  discountPercentage: number;
  id: number;
  images: string[];
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: Review[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
}

interface Review {
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const likedProducts = useSelector((state: RootState) => state.like.likedProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    axios("https://dummyjson.com/products").then((res) => setProducts(res.data.products));
  }, []);

  return (
    <div className="Card_wrap">
      {products &&
        products.map((product) => (
          <div className="Card" key={product.id}>
            <h2>{product.title}</h2>
            <img
              src={product.images[0]}
              alt={product.title}
              width={300}
              height={300}
            />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <div className="buttWrapBla">
              <button className="purcahse">Buy</button>
              <button
                className={`LikeBtn ${likedProducts.includes(product.id) ? 'liked' : ''}`}
                onClick={() => dispatch(toggleLike(product.id))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                </svg>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default App;
