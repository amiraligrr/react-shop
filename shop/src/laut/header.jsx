import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { apiData } from '../context/context';
import Cookies from 'js-cookie';
const Header = () => {
  const token= Cookies.get('login')
  const {prod,setProd,ma , userdata,setUserdata}=useContext(apiData)
  const [menuOpen, setMenuOpen] = useState(false);
const [search,setSearch]=useState('')
const logout=()=>{
  Cookies.remove('login')
setUserdata({})
}
const logre =()=>{
  if(!token){
            return(
              <>
              <Link
            to="/login"
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded transition text-sm font-medium"
          >
            ورود
          </Link>
         
          </>
            )
          }
          else{
            return(
              <div className='flex gap-6'>
                <h1 className='text-2xl text-center text-white mx-auto'>{userdata.username}</h1>
               <button  onClick={logout} className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded transition text-sm font-medium">خروج</button>
              <Link
            to="/prof"
            className="px-4 py-2 bg-green-500 hover:bg-cyan-600 rounded transition text-sm font-medium"
          >
            پروفایل
          </Link>
              </div>
            )
          }
}
const filter = (e) => {
  const category = e.target.value;
  if (category === '') {
    setProd(ma);
  } else {
    const filtered = ma.filter((item) => item.category === category);
    setProd(filtered);
  }
};

const searchf= (e) => {
  const value = e.target.value;
  setSearch(value); 

  if (value.trim() === '') {
    setProd(ma); 
    return;
  }

  const filtered = ma.filter((item) =>
    item.title.toLowerCase().includes(value.toLowerCase())
  );

  setProd(filtered);
};


  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#111] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
       
        <Link to="/" className="text-xl md:text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition">
          فروشگاه 😐
        </Link>

     
        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

     
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          
          <Link to="/" className="hover:text-cyan-400 transition duration-200">
            خانه
          </Link>
          <Link to="/products" className="hover:text-cyan-400 transition duration-200">
            محصولات
          </Link>
          <Link to="/about" className="hover:text-cyan-400 transition duration-200">
            درباره ما
          </Link>
          
        </nav>

        
        <div className="hidden md:flex gap-4">
          
          
          <Link
            to="/products"
            className="px-4 py-2 bg-gray-500 hover:bg-gray-300 rounded transition text-sm font-medium text-black"
          >
           <input onChange={searchf} value={search} type="search" />
           <select onChange={filter} className="px-2 py-1 rounded text-black">
  <option value="">همه دسته‌ها</option>
  <option value="electronics">الکترونیکی</option>
  <option value="women's clothing">لباس زنانه</option>
  <option value="men's clothing">لباس مردانه</option>
  <option value="jewelery">جواهرات</option>
</select>

          </Link>
          <Link
            to="/sabad"
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded transition text-sm font-medium"
          >
            سبد خرید
          </Link>
          {logre()}
        </div>
      </div>

      {/* منو موبایل */}
      {menuOpen && (
        <div className="md:hidden bg-[#1a1a1a] border-t border-gray-700">
          <nav className="flex flex-col px-4 py-3 space-y-3">
            <Link
              to="/"
              className="text-sm hover:text-cyan-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              خانه
            </Link>
            <Link
              to="/products"
              className="text-sm hover:text-cyan-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              محصولات
            </Link>
            <Link
              to="/about"
              className="text-sm hover:text-cyan-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              درباره ما
            </Link>
           
          
            <Link
              to="/sabad"
              className="text-sm text-yellow-400"
              onClick={() => setMenuOpen(false)}
            >
              سبد خرید
            </Link>
            {logre()}
              <Link
            to="/products"
            className="px-4 py-2 bg-gray-500 hover:bg-gray-300 rounded transition text-sm font-medium text-black"
          >
           <input onChange={searchf} value={search} type="search" />
            <select onChange={filter} className="px-2 py-1 rounded text-black">
  <option value="">همه دسته‌ها</option>
  <option value="electronics">الکترونیکی</option>
  <option value="women's clothing">لباس زنانه</option>
  <option value="men's clothing">لباس مردانه</option>
  <option value="jewelery">جواهرات</option>
</select>
          </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
