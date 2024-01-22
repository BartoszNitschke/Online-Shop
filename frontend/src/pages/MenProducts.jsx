import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import { Range } from "react-range";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const MenProducts = () => {
  const [val, setVal] = useState([20, 160]);
  const [products, setProducts] = useState(null);
  const [filter, setFilter] = useState(null);
  const [sortDirection, setSortDirection] = useState({
    priceNoDelivery: null,
    priceDelivery: null,
    createdAt: null,
    rating: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products/men");
      const json = await res.json();

      if (res.ok) {
        setProducts(json);
      }
    };

    fetchProducts();
  }, []);

  const sortByAsc = (filteredProp) => {
    const sortedProducts = [...products];

    const newSortDirection =
      sortDirection[filteredProp] === null
        ? true
        : !sortDirection[filteredProp];

    setSortDirection({ ...sortDirection, [filteredProp]: newSortDirection });

    sortedProducts.sort((a, b) => {
      let first = a[filteredProp] === null ? 0 : a[filteredProp];
      let second = b[filteredProp] === null ? 0 : b[filteredProp];

      if (filteredProp === "createdAt") {
        first = new Date(a[filteredProp]);
        second = new Date(b[filteredProp]);
      }

      console.log("siemka", a[filteredProp]);
      const comparison = first - second;
      return newSortDirection ? comparison : -comparison;
    });

    setProducts(sortedProducts);
  };

  if (!products) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <AiOutlineLoading3Quarters className="text-[64px] animate-spin" />
      </div>
    );
  }

  return (
    <div className="mt-[130px]  w-[90%] mx-auto ">
      <h1 className="text-center text-orange-500 text-[44px] font-semibold py-2">
        Men
      </h1>
      <div className="flex justify-center items-start">
        <div className="w-[17%] mt-5">
          <h1 className="text-orange-500 text-[20px] font-semibold">
            Price Range:
          </h1>
          <Range
            values={val}
            step={10}
            min={0}
            max={750}
            onChange={(values) => {
              setVal(values);
            }}
            renderTrack={({ props, children }) => (
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                className="h-[36px] flex w-full items-center"
              >
                <div ref={props.ref} className="h-[15px] w-full border-2 ">
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="h-[32px] w-[32px] shadow-black shadow-sm bg-orange-500 flex justify-center items-center rounded-full"
              ></div>
            )}
          />
          <div className="flex justify-between items-center">
            <p className="text-[18px] font-semibold">{val[0]}</p>
            <p className="text-[18px] font-semibold">{val[1]}</p>
          </div>
          <div className="mt-4">
            <h1 className="text-orange-500 text-[20px] font-semibold">
              Filter by:
            </h1>
            <div className="mt-2 flex flex-wrap  ">
              <button
                onClick={() => {
                  setFilter(null);
                }}
                className={
                  filter === null
                    ? "bg-orange-500 px-5 py-1 m-1 font-bold text-[18px] rounded-xl"
                    : "bg-gray-400 px-5 py-1 m-1 font-bold text-[18px] rounded-xl"
                }
              >
                All
              </button>

              <button
                onClick={() => {
                  setFilter("tshirt");
                }}
                className={
                  filter === "tshirt"
                    ? "bg-orange-500 px-5 py-1 m-1 font-bold text-[18px] rounded-xl"
                    : "bg-gray-400 px-5 py-1 m-1 font-bold text-[18px] rounded-xl"
                }
              >
                T-shirts
              </button>
              <button
                onClick={() => {
                  setFilter("pants");
                }}
                className={
                  filter === "pants"
                    ? "bg-orange-500 px-5 py-1 m-1 font-bold text-[18px] rounded-xl"
                    : "bg-gray-400 px-5 py-1 m-1 font-bold text-[18px] rounded-xl"
                }
              >
                Pants
              </button>
              <button
                onClick={() => {
                  setFilter("shoes");
                }}
                className={
                  filter === "shoes"
                    ? "bg-orange-500 px-5 py-1 m-1 font-bold text-[18px] rounded-xl"
                    : "bg-gray-400 px-5 py-1 m-1 font-bold text-[18px] rounded-xl"
                }
              >
                Shoes
              </button>
              <button
                onClick={() => {
                  setFilter("socks");
                }}
                className={
                  filter === "socks"
                    ? "bg-orange-500 px-5 py-1 m-1 font-bold text-[18px] rounded-xl"
                    : "bg-gray-400 px-5 py-1 m-1 font-bold text-[18px] rounded-xl"
                }
              >
                Socks
              </button>
            </div>
          </div>
          <div className="mt-4">
            <h1 className="text-orange-500 text-[20px] font-semibold">
              Sort by:
            </h1>
            <div className="mt-2 flex flex-col text-center">
              <button
                onClick={() => sortByAsc("priceNoDelivery")}
                className="bg-orange-500 px-5 py-1 m-1 font-bold text-[18px] rounded-xl flex items-center justify-center"
              >
                Price{" "}
                {sortDirection.priceNoDelivery === null ? (
                  <></>
                ) : sortDirection.priceNoDelivery === true ? (
                  <FaArrowUp className="ml-1 " />
                ) : (
                  <FaArrowDown className="ml-1 " />
                )}
              </button>
              <button
                onClick={() => sortByAsc("priceDelivery")}
                className="bg-orange-500 px-5 py-1 m-1 font-bold text-[18px] rounded-xl flex items-center justify-center"
              >
                Price with Delivery
                {sortDirection.priceDelivery === null ? (
                  <></>
                ) : sortDirection.priceDelivery === true ? (
                  <FaArrowUp className="ml-1" />
                ) : (
                  <FaArrowDown className="ml-1" />
                )}
              </button>
              <button
                onClick={() => sortByAsc("createdAt")}
                className="bg-orange-500 px-5 py-1 m-1 font-bold text-[18px] rounded-xl flex items-center justify-center"
              >
                Date added
                {sortDirection.createdAt === null ? (
                  <></>
                ) : sortDirection.createdAt === true ? (
                  <FaArrowUp className="ml-1" />
                ) : (
                  <FaArrowDown className="ml-1" />
                )}
              </button>
              <button
                onClick={() => sortByAsc("rating")}
                className="bg-orange-500 px-5 py-1 m-1 font-bold text-[18px] rounded-xl flex items-center justify-center"
              >
                Rating
                {sortDirection.rating === null ? (
                  <></>
                ) : sortDirection.rating === true ? (
                  <FaArrowUp className="ml-1" />
                ) : (
                  <FaArrowDown className="ml-1" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center w-[83%]">
          {products &&
            products.map((product) => {
              if (
                product.priceNoDelivery >= val[0] &&
                product.priceNoDelivery <= val[1] &&
                product[filter]
              ) {
                return <Product key={product._id} product={product} />;
              } else if (
                product.priceNoDelivery >= val[0] &&
                product.priceNoDelivery <= val[1] &&
                filter === null
              ) {
                return <Product key={product._id} product={product} />;
              } else return <div key={product._id}></div>;
            })}
        </div>
      </div>
    </div>
  );
};

export default MenProducts;
