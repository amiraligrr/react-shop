import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiData } from "../context/context";

const Details = () => {
  const { ma, sabad, setSabad } = useContext(apiData);
  const { id } = useParams();
  const product = ma.find((p) => p.id === Number(id));

  const { title, price, image, description, rating } = product;
  const { rate } = rating;

  const [con, setCon] = useState(0);

  const increase = () => {
    const newCount = con + 1;
    setCon(newCount);
    updateCart(newCount);
  };

  const decrease = () => {
    const newCount = con - 1;
    if (newCount >= 0) {
      setCon(newCount);
      updateCart(newCount);
    }
  };

  const updateCart = (newCount) => {
    if (newCount === 0) {
      setSabad((prev) => prev.filter((item) => item.id !== Number(id)));
    } else {
      setSabad((prev) => [
        ...prev.filter((item) => item.id !== Number(id)),
        {
          id: Number(id),
          count: newCount,
          image,
          title,
          price,
          total: newCount * Number(price),
        },
      ]);
    }
  };

  useEffect(() => {
    if (sabad) {
      const sabadItem = sabad.find((p) => p.id === Number(id));
      setCon(sabadItem ? sabadItem.count : 0);
    }
  }, [sabad, id]);

  const renderButtons = () => {
    if (con === 0) {
      return (
        <button
          onClick={increase}
          className="bg-gray-700 hover:bg-gray-600 text-white w-60 h-12 rounded-3xl mx-auto block transition"
        >
          خرید
        </button>
      );
    }

    return (
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={increase}
          className="bg-gray-700 hover:bg-gray-600 text-white w-32 h-12 rounded-3xl transition"
        >
          اضافه کردن
        </button>

        <span className="text-white text-2xl">{con}</span>

        <button
          onClick={decrease}
          className="bg-gray-700 hover:bg-gray-600 text-white w-32 h-12 rounded-3xl transition"
          disabled={con === 0}
        >
          {con === 1 ? "حذف کردن" : "کم کردن"}
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={image}
        alt={title}
        className="w-full h-72 md:h-[400px] md:w-[400px] object-contain rounded-lg mx-auto pt-10"
      />

      <h1 className="text-white text-3xl text-center mt-8">{title}</h1>
      <h2 className="text-white text-2xl text-center mt-2 pt-10">{price}$</h2>
      <p className="text-gray-300 text-center mt-4">{description}</p>
      <h3 className="text-yellow-400 text-xl text-center mt-4 pb-20 pt-10">
        نمره: {rate}/5
      </h3>

      <div className="bg-gray-800 rounded-3xl p- mt-8 pt-2 pb-2">
        {renderButtons()}
      </div>

      {con > 0 && (
        <h3 className="text-white text-center text-xl mt-6 ">
          جمع قیمت: {con * Number(price)}$
        </h3>
      )}
    </div>
  );
};

export default Details;
