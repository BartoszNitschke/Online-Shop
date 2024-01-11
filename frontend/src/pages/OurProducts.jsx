import React, { useState, useEffect, useContext } from "react";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import { Range, getTrackBackground } from "react-range";

const OurProducts = () => {
  const [val, setVal] = useState([20, 80]);
  const [products, setProducts] = useState(null);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const json = await res.json();

      if (res.ok) {
        setProducts(json);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(filter); // Zaktualizowane wartości filter będą widoczne tutaj
  }, [filter]);

  //use state na filtry - tablica
  //use effect odswiezajacy co zmiane filtrow i zmieniajacy products nizej \/

  return (
    <div className="mt-[150px]">
      <Range
        values={val}
        step={10}
        min={0}
        max={1000}
        onChange={(values) => {
          console.log(values);
          setVal(values);
        }}
        renderTrack={({ props, children }) => (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",

                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "42px",
              width: "42px",
              borderRadius: "4px",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            <div
              style={{
                height: "16px",
                width: "5px",
                backgroundColor: isDragged ? "#548BF4" : "#CCC",
              }}
            />
          </div>
        )}
      />
      <p>
        {val[0]}, {val[1]}
      </p>
      <div>
        Filter by:
        <button
          onClick={() => {
            setFilter("men");
          }}
          className="border-2 border-black"
        >
          Men
        </button>
        <button
          onClick={() => {
            setFilter("women");
          }}
          className="border-2 border-black"
        >
          Women
        </button>
        <button
          onClick={() => {
            setFilter("tshirt");
          }}
          className="border-2 border-black"
        >
          T-shirts
        </button>
        <button
          onClick={() => {
            setFilter("pants");
          }}
          className="border-2 border-black"
        >
          Pants
        </button>
        <button
          onClick={() => {
            setFilter("shoes");
          }}
          className="border-2 border-black"
        >
          Shoes
        </button>
        <button
          onClick={() => {
            setFilter("socks");
          }}
          className="border-2 border-black"
        >
          Socks
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        {/* pozniej wyswietlane wg najlepszej oceny */}
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
            }
          })}
      </div>
    </div>
  );
};

export default OurProducts;
