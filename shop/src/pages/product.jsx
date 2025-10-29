import React, { useContext } from 'react';
import { apiData } from '../context/context';
import Cards from '../component/cards';

const Product = () => {
  const { prod } = useContext(apiData);

  return (
    <div className="p-4">
      <h1 className="text-white pt-16 text-center text-xl mb-8">محصولات:</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {prod.map((p) => (
          <Cards
            key={p.id}
            title={p.title}
            price={p.price}
            image={p.image}
            id={p.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Product;
