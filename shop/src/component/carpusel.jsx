import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Carousel({ items, discountPercentage = null }) {
  const [angle, setAngle] = useState(0);
  const itemCount = items.length;
  const theta = 360 / itemCount;
  const radius = 250;
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => prev - theta);
    }, 3000);
    return () => clearInterval(interval);
  }, [theta]);

  const calculateDiscountPrice = (originalPrice) => {
    if (!discountPercentage) return null;
    const discountAmount = (originalPrice * discountPercentage) / 100;
    return (originalPrice - discountAmount).toFixed(2);
  };

  const handleClick = (id) => {
    navigate(`/deatile/${id}`);
  };

  return (
    <>
      <div className="carousel">
        <div
          className="carousel-inner"
          style={{
            transform: `translateZ(-${radius}px) rotateY(${angle}deg)`,
          }}
        >
          {items.map((item, i) => {
            const discountedPrice = calculateDiscountPrice(item.price);
            return (
              <div
                key={item.id}
                className="carousel-item"
                style={{
                  transform: `rotateY(${i * theta}deg) translateZ(${radius}px)`,
                }}
                onClick={() => handleClick(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleClick(item.id);
                }}
              >
                <img src={item.image} alt={item.title} />
                <h3>{item.title.split(" ").slice(0, 2).join(" ")}</h3>

                {discountedPrice ? (
                  <div className="price-container">
                    <p className="original-price line-through">{item.price}$</p>
                    <p className="discounted-price">{discountedPrice}$</p>
                    <span className="discount-badge">
                      {discountPercentage}% OFF
                    </span>
                  </div>
                ) : (
                  <p className="price">{item.price}$</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .carousel {
          width: 100%;
          max-width: 600px;
          height: 400px;
          margin: 6rem auto;
          perspective: 1200px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          background: #121212;
          border-radius: 20px;
          box-shadow: 0 0 20px #000;
          overflow: visible;
        }
        .carousel-inner {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 1s ease;
        }
        .carousel-item {
          position: absolute;
          width: 280px;
          height: 350px;
          top: 50%;
          left: 50%;
          margin: -175px 0 0 -140px; /* نصف ارتفاع و نصف عرض */
          background: linear-gradient(145deg, #1f1f1f, #121212);
          border-radius: 20px;
          box-shadow: 0 0 15px rgba(0,0,0,0.7);
          color: #e0e0e0;
          padding: 15px;
          box-sizing: border-box;
          text-align: center;
          user-select: none;
          cursor: pointer;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .carousel-item:hover {
          box-shadow: 0 0 25px #03e9f4;
          transform: scale(1.05) translateZ(${radius}px);
          z-index: 10;
        }
        .carousel-item img {
          width: 100%;
          height: 160px;
          object-fit: contain;
          border-radius: 12px;
          margin-bottom: 10px;
          pointer-events: none;
          user-select: none;
        }
        .carousel-item h3 {
          margin: 8px 0;
          font-size: 1.2rem;
          color: #03e9f4;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .price-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          margin-top: 10px;
        }
        .original-price {
          text-decoration: line-through;
          color: #9ca3af;
          font-size: 0.9rem;
        }
        .discounted-price {
          color: #ef4444;
          font-weight: bold;
          font-size: 1.25rem;
        }
        .discount-badge {
          background-color: #ef4444;
          color: white;
          font-size: 0.75rem;
          padding: 3px 10px;
          border-radius: 9999px;
          margin-top: 5px;
          user-select: none;
        }
        .price {
          font-size: 1.1rem;
          color: #ccc;
          margin-top: 15px;
        }

        @media (max-width: 640px) {
          .carousel {
            max-width: 90vw;
            height: 320px;
          }
          .carousel-item {
            width: 180px;
            height: 230px;
            margin: -115px 0 0 -90px;
          }
          .carousel-item img {
            height: 110px;
          }
          .carousel-item h3 {
            font-size: 1rem;
          }
          .discounted-price {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </>
  );
}
