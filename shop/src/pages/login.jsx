import React, { useState, useContext, useEffect } from 'react';
import { apiData } from '../context/context';
import axios from 'axios';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router';

const Login = () => {
  const nav = useNavigate();
  const { login, setLogin, userdata, setUserdata, api } = useContext(apiData);
  const [acnt, setAcnt] = useState([]);
const [acntss,setAcntss]=useState([])
  useEffect(() => {
    let token = Cookies.get("login");
    if (token) {
      nav("/");
    }
    axios.get(api)
      .then((res) => {
        setAcnt(res.data);
      });
  }, []);

  const [mode, setMode] = useState('login');

  // Login states
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');

  // Signup states
  const [usernameu, setUsernameu] = useState('');
  const [passu, setPassu] = useState('');
  const [passtu, setPasstu] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [meli, setMeli] = useState('');

  const logout = () => {
    setUserdata({});
    setLogin(false);
    Cookies.remove('login');
  };

  let err = false;

  const uphandler = (e) => {
    e.preventDefault();
    if (passtu === passu) {
      acnt.forEach((a) => {
        if (a.username === usernameu) {
          alert('این نام کاربری قبلا استفاده شده است');
          err = true;
        } else if (a.email === email) {
          alert('این ایمیل قبلا استفاده شده است');
          err = true;
        } else if (a.meli === meli) {
          alert('این کد ملی قبلا ثبت نام شده است');
          err = true;
        }
      });
      if (!err) {
        Cookies.set('login', 'true', { expires: 7 });
        axios.post(api, {
          username: usernameu,
          pass: passu,
          email: email,
          age: age,
          meli: meli
        });
        
      axios.get(api)
      .then((res)=>{setAcntss(res.data)})
   const idf =  acntss.find((p)=>{
        if(p.username ===usernameu){
          return (p.id)
        }
      })
        setUserdata({
          id:idf,
          username: usernameu,
          pass: passu,
          email: email,
          age: age,
          meli: meli
        });
        setMode('login');
        nav("/");
      }
    } else {
      alert('رمز عبور و تایید رمز عبور یکسان نمیباشد');
    }
  };

  const loginhsndler = (e) => {
    e.preventDefault();
    const user = acnt.find((a) => a.username === username && a.pass === pass);
    if (user) {
      setUserdata(user);
      Cookies.set('login', 'true', { expires: 7 });
    
      nav('/');
    } else {
      alert('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  const render = () => {
    if (login) {
      return (
        <div className="text-center mt-24">
          <h1 className='text-black text-4xl mb-6'>شما در اکانت خود هستید و نیازی به ورود ندارید</h1>
          <button
            onClick={logout}
            className='bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition cursor-pointer shadow-lg'
          >
            خروج از اکانت
          </button>
        </div>
      );
    } else {
      if (mode === 'login') {
        return (
          <div className='bg-gray-700 rounded-xl mx-auto mt-24 mb-20 p-8
            w-full sm:w-3/4 md:w-1/2 lg:w-1/3
            flex flex-col items-center text-center shadow-lg
          '>
            <form onSubmit={loginhsndler} className='w-full'>
              <h1 className='text-white text-4xl mb-8 font-semibold'>ورود</h1>

              <label htmlFor="username" className='text-white block text-right mb-2 font-medium'>
                نام کاربری
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                id='username'
                type="text"
                className='bg-gray-800 text-white rounded-xl h-12 w-full px-4 mb-6
                  focus:outline-none focus:ring-2 focus:ring-blue-400
                  transition duration-300
                '
                placeholder="نام کاربری خود را وارد کنید"
                required
              />

              <label htmlFor="pass" className='text-white block text-right mb-2 font-medium'>
                رمز عبور
              </label>
              <input
                onChange={(e) => setPass(e.target.value)}
                id='pass'
                type="password"
                className='bg-gray-800 text-white rounded-xl h-12 w-full px-4 mb-6
                  focus:outline-none focus:ring-2 focus:ring-blue-400
                  transition duration-300
                '
                placeholder="رمز عبور خود را وارد کنید"
                required
              />

              <button
                type="submit"
                className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold
                  transition duration-300 shadow-lg
                  hover:scale-105
                '
              >
                ورود
              </button>

              <p
                onClick={() => setMode('sing up')}
                className='text-blue-400 mt-6 cursor-pointer hover:underline select-none'
              >
                حساب کاربری ندارید؟ ثبت نام کنید
              </p>
            </form>
          </div>
        );
      }

      if (mode === 'sing up') {
        return (
          <div className='bg-gray-700 rounded-xl mx-auto mt-24 mb-20 p-8
            w-full sm:w-3/4 md:w-1/2 lg:w-1/3
            flex flex-col items-center text-center shadow-lg
          '>
            <form onSubmit={uphandler} className='w-full'>

              <h1 className='text-white text-4xl mb-8 font-semibold'>ثبت نام</h1>

              <label htmlFor="usernameu" className='text-white block text-right mb-2 font-medium'>
                نام کاربری
              </label>
              <input
                onChange={(e) => setUsernameu(e.target.value)}
                id='usernameu'
                type="text"
                className='bg-gray-800 text-white rounded-xl h-12 w-full px-4 mb-6
                  focus:outline-none focus:ring-2 focus:ring-green-400
                  transition duration-300
                '
                placeholder="نام کاربری خود را وارد کنید"
                required
              />

              <label htmlFor="passu" className='text-white block text-right mb-2 font-medium'>
                رمز عبور
              </label>
              <input
                onChange={(e) => setPassu(e.target.value)}
                id='passu'
                type="password"
                className='bg-gray-800 text-white rounded-xl h-12 w-full px-4 mb-6
                  focus:outline-none focus:ring-2 focus:ring-green-400
                  transition duration-300
                '
                placeholder="رمز عبور خود را وارد کنید"
                required
              />

              <label htmlFor="passtu" className='text-white block text-right mb-2 font-medium'>
                تکرار رمز عبور
              </label>
              <input
                onChange={(e) => setPasstu(e.target.value)}
                id='passtu'
                type="password"
                className='bg-gray-800 text-white rounded-xl h-12 w-full px-4 mb-6
                  focus:outline-none focus:ring-2 focus:ring-green-400
                  transition duration-300
                '
                placeholder="رمز عبور خود را دوباره وارد کنید"
                required
              />

              <label htmlFor="email" className='text-white block text-right mb-2 font-medium'>
                ایمیل
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id='email'
                type="email"
                className='bg-gray-800 text-white rounded-xl h-12 w-full px-4 mb-6
                  focus:outline-none focus:ring-2 focus:ring-green-400
                  transition duration-300
                '
                placeholder="ایمیل خود را وارد کنید"
                required
              />

              <label htmlFor="age" className='text-white block text-right mb-2 font-medium'>
                سن
              </label>
              <input
                onChange={(e) => setAge(e.target.value)}
                id='age'
                type="number"
                min="1"
                className='bg-gray-800 text-white rounded-xl h-12 w-full px-4 mb-6
                  focus:outline-none focus:ring-2 focus:ring-green-400
                  transition duration-300
                '
                placeholder="سن خود را وارد کنید"
                required
              />

              <label htmlFor="meli" className='text-white block text-right mb-2 font-medium'>
                کد ملی
              </label>
              <input
                onChange={(e) => setMeli(e.target.value)}
                id='meli'
                type="number"
                className='bg-gray-800 text-white rounded-xl h-12 w-full px-4 mb-6
                  focus:outline-none focus:ring-2 focus:ring-green-400
                  transition duration-300
                '
                placeholder="کد ملی خود را وارد کنید"
                required
              />

              <button
                type="submit"
                className='w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold
                  transition duration-300 shadow-lg
                  hover:scale-105
                '
              >
                ثبت نام
              </button>

              <p
                onClick={() => setMode('login')}
                className='text-green-400 mt-6 cursor-pointer hover:underline select-none'
              >
                حساب کاربری دارید؟ وارد شوید
              </p>
            </form>
          </div>
        );
      }
    }
  };

  return (
    <div>
      {render()}
    </div>
  );
};

export default Login;
