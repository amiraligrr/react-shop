import React, { useContext ,useEffect} from 'react';
import { apiData } from '../context/context';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
const Sabad = () => {
   const nav = useNavigate();
  const { sabad } = useContext(apiData);
const log = Cookies.get('login')
  const tota = sabad.reduce((acc, item) => acc + item.total, 0);
let token = Cookies.get("login");
  const render = () => {
    useEffect(() => {
        let token = Cookies.get("login");
        if (!token) {
          
          nav("/");
          alert('لطفا برای ورود به سبد خرید ابتدا وارد اکانت خود شود')
        }},[token])
    if (sabad.length === 0) {
      return (
        <h1 className="pt-25 text-white text-3xl text-center">
          سبد خرید شما خالی است!
        </h1>
      );
    }

    return sabad.map((it) => (
      <Link key={it.id} to={`/deatile/${it.id}`}>
        <div className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 w-full flex flex-col md:flex-row items-center p-4 mb-4 rounded-xl shadow-lg">
          <div className="w-full md:w-1/4 flex justify-center items-center">
            <img
              src={it.image}
              alt={it.title}
              className="max-h-52 w-auto object-contain rounded-lg"
            />
          </div>
          <div className="text-white px-4 w-full text-center md:text-right mt-4 md:mt-0">
            <h2 className="text-xl font-bold mb-2">
              {it.title.split(' ').slice(0, 3).join(' ')}
            </h2>
            <p>تعداد: {it.count}</p>
            <p>قیمت: {it.price}$</p>
            <p>جمع: {it.total}$</p>
          </div>
        </div>
      </Link>
    ));
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {render()}
      <div className="text-center text-white text-lg mt-8">
        <h1>تعداد انواع محصولات: {sabad.length}</h1>
        <h1>جمع کل: {tota}$</h1>
        <button
          className="bg-green-600 hover:bg-green-700 text-white mt-4 w-40 h-10 rounded-lg transition duration-300"
          onClick={() => {
            alert('این قابلیت هنوز فعال نمیباشد');
          }}
        >
          تکمیل خرید
        </button>
      </div>
    </div>
  );
};

export default Sabad;
