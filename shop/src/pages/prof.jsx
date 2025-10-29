import { useContext, useEffect, useState } from 'react';
import { apiData } from '../context/context';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router';
import axios from 'axios';

function Prof() {
  const { userdata, api } = useContext(apiData);
  const { username, pass, email, age, meli, id } = userdata || {};
  const nav = useNavigate();

  const [cha, setCha] = useState(false);
  const [pas, setPas] = useState('');
  const [newp, setNewp] = useState('');
  const [newc, setNewc] = useState('');

  useEffect(() => {
    let token = Cookies.get("login");
    if (!token) {
      nav("/");
    }
  }, [nav]);

  const changeh = () => {
    if (!id) {
      alert('شناسه کاربر موجود نیست.');
      return;
    }

    if (pas !== pass) {
      alert('رمز فعلی اشتباه است');
      return;
    }

    if (newc !== newp) {
      alert('رمز جدید و تکرار آن یکسان نیستند');
      return;
    }

  
    axios.put(`${api}/${id}`, {
    
      username,
      pass: newp,
      email,
      age,
      meli
    }, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        console.log('پاسخ سرور:', res.data);
        alert('رمز با موفقیت تغییر کرد');
        setCha(false);
        setPas('');
        setNewp('');
        setNewc('');
      })
      .catch(e => {
        console.error('خطا در تغییر رمز:', e);
        alert('خطا در تغییر رمز، لطفا دوباره تلاش کنید');
      });
  };

  const changeHandler =(e)=>{
    e.preventDefault()
    setCha(true)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
        <h1 className="text-white text-3xl sm:text-4xl mb-4 text-center font-bold">
          پروفایل کاربری
        </h1>
        <div className="text-white text-lg sm:text-xl space-y-3 text-center">
          <p><span className="font-semibold">نام کاربری:</span> {username || '-'}</p>
          <p><span className="font-semibold">ایمیل:</span> {email || '-'}</p>
          <p><span className="font-semibold">سن:</span> {age || '-'}</p>
          <p><span className="font-semibold">کد ملی:</span> {meli || '-'}</p>

          {!cha && (
            <button
              onClick={changeHandler}
              className="px-4 py-2 bg-green-500 hover:bg-cyan-600 rounded transition text-sm font-medium mx-auto text-center"
            >
              عوض کردن رمز
            </button>
          )}

          {cha && (
            <>
              <h1 className="text-white mb-3">لطفا رمز فعلی و رمز جدید را وارد کنید</h1>
              <input
                onChange={(e) => setPas(e.target.value)}
                type="password"
                placeholder="رمز فعلی"
                className="bg-black text-white rounded-lg w-full mb-3 p-2"
                value={pas}
              />
              <input
                onChange={(e) => setNewp(e.target.value)}
                type="password"
                placeholder="رمز جدید"
                className="bg-black text-white rounded-lg w-full mb-3 p-2"
                value={newp}
              />
              <input
                onChange={(e) => setNewc(e.target.value)}
                type="password"
                placeholder="تکرار رمز جدید"
                className="bg-black text-white rounded-lg w-full mb-3 p-2"
                value={newc}
              />
              <button
                onClick={changeh}
                className="bg-gray-600 text-white rounded-lg w-full h-10"
              >
                تایید
              </button>
              <button
                onClick={() => setCha(false)}
                className="mt-2 text-red-500 underline"
              >
                انصراف
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Prof;
