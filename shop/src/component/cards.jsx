import React from 'react';
import { Link } from 'react-router-dom';

const Cards = ({title, price, image,id})=> {
function cutter(text) {
if (!text || typeof text !== 'string') {
return ''; 
}
return text.trim().split(/\s+/).slice(0, 3).join(' ');
}
return(
<Link to={`/deatile/${id}`} className='


"relative cursor-pointer
 bg-gradient-to-r from-gray-500-gray-500 to-gray-700
 rounded-3xl
 shadow-lg
 transform
 transition
 duration-300
 ease-in-out

 hover:scale-105
 hover:shadow-2xl
 hover:brightness-110
 hover:-translate-y-2

 flex flex-col items-center p-4"
'>
<img src={image} alt='عکس لود نشد!'  className='w-100 h-100'/>
<h1 className='mx-auto text-white text-xl text-center'>{cutter(title)}</h1>
<h1 className='mx-auto text-white text-lg text-center'>{price}</h1>
</Link>
)};

export default Cards;