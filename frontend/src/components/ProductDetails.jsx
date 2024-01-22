import React, { useState, useEffect, useContext, useRef } from "react";
import { useUserContext } from "../hooks/useUserContext";
import StarRatingComponent from "react-star-rating-component";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDelete, MdStarRate } from "react-icons/md";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
  const { user } = useUserContext();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const quantityRef = useRef();
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState(null);
  const [rating, setRating] = useState(0);
  const [usersRating, setUsersRating] = useState(null);
  const [error, setError] = useState(null);
  const [deleteReviewModal, setDeleteReviewModal] = useState(false);
  const [deleteRatingModal, setDeleteRatingModal] = useState(false);
  const { addProducts } = useContext(CartContext);

  const url = window.location.pathname;
  const id = url.slice(url.indexOf("/product/") + 9);

  //blad gdy nie ma productu o tym id

  const fetchProduct = async () => {
    const res = await fetch("/api/products/" + id);
    const json = await res.json();

    if (res.ok) {
      setProduct(json);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, []);

  const handleAddToCart = () => {
    const inputValue = parseInt(quantityRef.current.value, 10);

    if (isNaN(inputValue) || inputValue < 1) {
      console.error("invalid quantity value");
      return;
    }

    addProducts(product, inputValue);
  };

  useEffect(() => {
    if (product && quantity > product.quantity) {
      setError("Product not available");
    }

    if (product && quantity <= product.quantity) {
      setError(null);
    }
  }, [product, quantity]);

  const fetchReviews = async () => {
    const res = await fetch("/api/reviews");
    const json = await res.json();

    if (res.ok) {
      setReviews(json);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchRatings = async () => {
    const res = await fetch("/api/rating");
    const json = await res.json();

    if (res.ok) {
      setUsersRating(json);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

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
        fetchReviews();
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

    const newRating = {
      value: nextValue,
      author: user.name,
      userId: user._id,
      prodId: product._id,
    };

    if (product && user) {
      const res = await fetch("/api/rating/", {
        method: "POST",
        body: JSON.stringify(newRating),
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
        fetchRatings();

        console.log("new rating added", json);
      }
    }

    if (product && user) {
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
        fetchProduct();
        console.log("new rating added in product collection", json);
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
        setDeleteReviewModal(false);
        fetchReviews();
      }
    }
  };

  const handleRatingDelete = async (id, value) => {
    if (product && product._id && user && user.admin && usersRating) {
      const res = await fetch("/api/rating/" + id, {
        method: "DELETE",
      });

      const json = await res.json();

      if (!res.ok) {
        console.log(json.error);
      }

      if (res.ok) {
        console.log("rating has been deleted");
        setDeleteRatingModal(false);
        fetchRatings();
      }
    }

    const userRating = {
      rating: value,
    };

    if (product && user) {
      const res = await fetch("/api/products/deleteRating/" + product._id, {
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
        fetchProduct();
        console.log("rating deleted in product collection", json);
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
          <div className="flex justify-evenly  w-[70%]">
            <img
              src={product.url}
              alt={product.name}
              style={{ width: "450px" }}
              className="rounded-xl shadow-black shadow-xl"
            />
            <div className="max-w-[500px] mt-[200px]">
              <div className="flex  text-[24px] font-semibold text-center justify-evenly py-2">
                <p className="after:content-['PLN']">
                  <span className="text-orange-500 font-bold">
                    {product.priceNoDelivery}
                  </span>{" "}
                </p>
                <p className="delivery">
                  {" "}
                  From{" "}
                  <span className="text-orange-500 font-bold">
                    {product.priceDelivery}
                  </span>{" "}
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

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddToCart();
                }}
                className="flex justify-center items-center pt-8"
              >
                <input
                  ref={quantityRef}
                  className="w-[60px] text-[28px] border-2 border-black rounded-xl mx-1"
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                  min={1}
                />
                <button className="text-[24px] w-full py-2 bg-orange-500 rounded-3xl mx-1 shadow-md shadow-gray-700">
                  Add to cart
                </button>
              </form>
              {error && (
                <p className="text-center text-[20px] mt-4 py-2 text-red-600 font-semibold">
                  {error}
                </p>
              )}
            </div>
          </div>
        )}
        {product && product._id && !user && (
          <p className="mt-8 py-8 text-[36px] text-orange-500 font-semibold">
            Log In to share your review
          </p>
        )}

        {product && product._id && user && (
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
                <div className="py-3 flex items-center" key={rev.prodId}>
                  {user && user.admin && (
                    <button onClick={() => setDeleteReviewModal(true)}>
                      <MdDelete className="text-[32px] mr-8 text-gray-800 hover:text-orange-400" />
                    </button>
                  )}
                  {deleteReviewModal && (
                    <div className="fixed top-0 left-0 w-full h-screen z-20 bg-black-rgba flex  flex-col justify-center items-center">
                      <p className="text-[48px] font-semibold text-white">
                        Sure?
                      </p>
                      <div className="flex">
                        <button
                          className="text-[32px] text-green-600 font-semibold px-2 hover:text-gray-400 "
                          onClick={() => handleDelete(rev._id)}
                        >
                          Yes
                        </button>
                        <button
                          className="text-[32px] text-red-600 font-semibold px-2 hover:text-gray-400"
                          onClick={() => setDeleteReviewModal(false)}
                        >
                          No
                        </button>
                      </div>
                    </div>
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
            } else return <div key={rev._id}></div>;
          })}
        {usersRating && (
          <div>
            <h1 className="text-[20px] text-orange-500 font-semibold py-5">
              User ratings
            </h1>
            {usersRating.map((rat) => {
              if (rat.prodId === product._id) {
                return (
                  <div className="flex items-center" key={rat._id}>
                    {user && user.admin && (
                      <button onClick={() => setDeleteRatingModal(true)}>
                        <MdDelete className="text-[32px] mr-8 text-gray-800 hover:text-orange-400" />
                      </button>
                    )}
                    {deleteRatingModal && (
                      <div className="fixed top-0 left-0 w-full h-screen z-20 bg-black-rgba flex flex-col justify-center items-center">
                        <p className="text-[48px] font-semibold text-white">
                          Sure?
                        </p>
                        <div className="flex ">
                          <button
                            className="text-[32px] font-semibold text-green-600 px-2 hover:text-gray-400"
                            onClick={() => {
                              handleRatingDelete(rat._id, rat.value);
                            }}
                          >
                            Yes
                          </button>
                          <button
                            className="text-[32px] font-semibold text-red-600 px-2 hover:text-gray-400"
                            onClick={() => setDeleteRatingModal(false)}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col justify-center py-2">
                      <div className="flex items-center">
                        {Array.from({ length: rat.value }).map((_, index) => (
                          <MdStarRate
                            key={index}
                            className="text-[20px] text-orange-600"
                          />
                        ))}
                      </div>
                      <p className="font-semibold py-2">by {rat.author}</p>
                    </div>
                  </div>
                );
              } else return <div key={rat._id}></div>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
