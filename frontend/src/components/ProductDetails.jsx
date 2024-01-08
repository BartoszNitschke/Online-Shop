import React, { useState, useEffect } from "react";
import { useUserContext } from "../hooks/useUserContext";
import StarRatingComponent from "react-star-rating-component";

const ProductDetails = () => {
  const { user } = useUserContext();
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);

  const url = window.location.pathname;
  const id = url.slice(url.indexOf("/product/") + 9);

  //blad gdy nie ma productu o tym id

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch("/api/products/" + id);
      const json = await res.json();

      if (res.ok) {
        setProduct(json);
      }
    };

    fetchProduct();
  }, [product, id]);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch("/api/reviews");
      const json = await res.json();

      if (res.ok) {
        setReviews(json);
      }
    };

    fetchReviews();
  }, [reviews]);

  const handleReview = async (e) => {
    e.preventDefault();

    const rev = {
      review,
      author: user.name,
      prodId: product._id,
    };

    const res = await fetch("/api/reviews/", {
      method: "POST",
      body: JSON.stringify(rev),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
    }

    if (res.ok) {
      setError(null);
      setReview("");
      console.log("new review added", json);
    }
  };

  const [rating, setRating] = useState(0);

  const onStarClick = (nextValue, prevValue, name) => {
    setRating(nextValue);
    console.log(`Rated ${nextValue} stars`);
  };

  return (
    <div className="mt-[200px]">
      <h1>Product details</h1>
      {product && (
        <div>
          <p>{product.name}</p>
          <img
            src={product.url}
            alt={product.name}
            style={{ width: "150px" }}
          />
          <p>{product.priceNoDelivery}</p>
          <p>{product.priceDelivery}</p>
          <p>{product.description}</p>
          <p>{product.bio}</p>
          <p>{product.quantity}</p>
        </div>
      )}

      <h1>Your review:</h1>
      <form onSubmit={handleReview}>
        <textarea
          cols="30"
          rows="6"
          className="border-2 border-black"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <button className="border-2 border-black">Share</button>
        {error && (
          <div>
            <p>{error.message}</p>
          </div>
        )}
      </form>
      <div>
        {reviews &&
          reviews.map((rev) => {
            if (rev.prodId === product._id) {
              return (
                <div>
                  <p>{rev.author}</p>
                  <p>{rev.review}</p>
                </div>
              );
            } else return <></>;
          })}
      </div>
      <div>
        <StarRatingComponent
          name="rating"
          value={rating}
          starCount={5}
          onStarClick={onStarClick}
          starColor="#ffb400"
          emptyStarColor="#333"
          editing={true}
          className="text-[48px]"
        />
      </div>
    </div>
  );
};

export default ProductDetails;
