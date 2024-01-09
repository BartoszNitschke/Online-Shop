import React, { useState, useEffect } from "react";
import { useUserContext } from "../hooks/useUserContext";
import StarRatingComponent from "react-star-rating-component";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const ProductDetails = () => {
  const { user } = useUserContext();
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState(null);
  const [rating, setRating] = useState(0);
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

    if (user) {
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
    }
  };

  const onStarClick = async (nextValue, prevValue, name) => {
    setRating(nextValue);
    console.log(`Rated ${nextValue} stars`);

    const userRating = {
      rating: nextValue,
    };

    if (product && product._id && user) {
      const res = await fetch("/api/products/" + product._id, {
        method: "PATCH",
        body: JSON.stringify(userRating),
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
        console.log("new rating added", json);
      }
    }
  };

  const handleDelete = async (id) => {
    if (product && product._id && user && user.admin) {
      const res = await fetch("/api/reviews/" + id, {
        method: "DELETE",
      });

      const json = await res.json();

      if (!res.ok) {
        console.log(json.error);
      }

      if (res.ok) {
        console.log("review has been deleted");
      }
    }
  };

  if (!product) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <AiOutlineLoading3Quarters className="text-[64px] animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mt-[120px] flex flex-col items-center">
        {product && (
          <p className="text-[48px] text-orange-500 font-semibold pb-4">
            {product.name}
          </p>
        )}
        {product && (
          <div className="flex justify-evenly items-center w-[70%]">
            <img
              src={product.url}
              alt={product.name}
              style={{ width: "450px" }}
              className="rounded-xl shadow-black shadow-xl"
            />
            <div className="max-w-[500px]">
              <div className="flex  text-[24px] font-semibold text-center justify-evenly py-2">
                <p>
                  <span className="text-orange-500 font-bold">
                    {product.priceNoDelivery}
                  </span>{" "}
                  PLN
                </p>
                <p>
                  {" "}
                  From{" "}
                  <span className="text-orange-500 font-bold">
                    {product.priceDelivery}
                  </span>{" "}
                  PLN with Delivery
                </p>
              </div>

              <p className="text-[20px] font-semibold py-2">
                {product.description}
              </p>
              <p className="text-[20px] font-semibold py-1">{product.bio}</p>
              <div className="flex justify-between pt-3 text-[22px] font-semibold">
                {product.rating ? (
                  <p>
                    <span className="text-orange-500">
                      {product.rating.toFixed(2)}{" "}
                    </span>
                    rating
                  </p>
                ) : (
                  <></>
                )}
                <p>
                  <span className="text-orange-500">{product.quantity}</span> in
                  stock
                </p>
              </div>
              <form className="flex justify-center items-center pt-8">
                <input
                  className="w-[60px] text-[28px] border-2 border-black rounded-xl mx-1"
                  type="number"
                />
                <button className="text-[24px] w-full py-2 bg-orange-500 rounded-3xl mx-1 shadow-md shadow-gray-700">
                  Add to cart
                </button>
              </form>
            </div>
          </div>
        )}

        {product && product._id && (
          <div className="flex items-center pt-8 w-[70%] justify-evenly">
            <form
              className="flex flex-col items-center"
              onSubmit={handleReview}
            >
              <h1 className="py-10 text-[36px] text-orange-500 font-semibold">
                Share your review:
              </h1>
              <textarea
                cols="60"
                rows="5"
                className="border-2 border-black rounded-2xl text-[18px]"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
              <button className="text-[24px] w-[60%] py-2 bg-orange-500 rounded-3xl mx-1 shadow-md shadow-gray-700 mt-4">
                Share
              </button>
              {error && (
                <div>
                  <p>{error.message}</p>
                </div>
              )}
            </form>
            <div className="flex items-center">
              <h1 className="text-[36px] text-orange-500 font-semibold px-2">
                Your rating:
              </h1>

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
        )}
      </div>
      <div className="w-[60%] flex flex-col mx-auto py-12">
        {reviews &&
          product &&
          reviews.map((rev) => {
            if (rev.prodId === product._id) {
              return (
                <div className="py-3 flex items-center">
                  {user && user.admin && (
                    <button onClick={() => handleDelete(rev._id)}>
                      <MdDelete className="text-[32px] mr-8 text-gray-800 hover:text-orange-400" />
                    </button>
                  )}

                  <div>
                    <p className="font-bold text-orange-500 text-[24px]">
                      {rev.author}
                      <span className="text-gray-800 px-2 font-normal">
                        {formatDistanceToNow(new Date(rev.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </p>
                    <p className="text-[20px] font-semibold py-4">
                      {rev.review}
                    </p>
                  </div>
                </div>
              );
            } else return <></>;
          })}
      </div>
    </div>
  );
};

export default ProductDetails;
