import React, { useContext } from 'react';
import Carousel from '../component/carpusel';
import { apiData } from '../context/context';
import Cards from '../component/cards';
const Home = () => {
  const { prod } = useContext(apiData);

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-20 px-4">
      <h1 className="text-3xl text-center font-bold mb-6">
        به فروشگاه ما خوش آمدید
      </h1>

      <section className="bg-gray-800 rounded-2xl py-6 px-4 mb-10 shadow-lg text-center">
        <h2 className="text-lg mb-4">پرفروش‌ترین محصولات ۲۴ ساعت گذشته:</h2>
        <Carousel items={prod.slice(0, 6)} />
      </section>
     <section className="bg-gray-800 rounded-2xl py-6 px-4 mb-10 shadow-lg text-center">
        <h2 className="text-lg mb-4">بصرفه ترین محصولات:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {prod.slice(12,17).map((p) => (
          <Cards
            key={p.id}
            title={p.title}
            price={p.price}
            image={p.image}
            id={p.id}
          />
        ))}
      </div>
      </section>
      <section className="bg-gray-800 rounded-2xl py-6 px-4 shadow-lg text-center">
        <h2 className="text-lg mb-4">محصولات تخفیف‌خورده:</h2>
        <Carousel items={prod.slice(6, 12)} discountPercentage={20} />
      </section>
       <section className="bg-gray-800 rounded-2xl py-6 px-4 mb-10 shadow-lg mx-auto text-center">
        <h2 className="text-lg mb-4"> محصولات پیشنهادی برای شما</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mx-auto">
        {prod.slice(17,20).map((p) => (
          <Cards
            key={p.id}
            title={p.title}
            price={p.price}
            image={p.image}
            id={p.id}
          />
        ))}
      </div>
      </section>
    </div>
  );
};

export default Home;
