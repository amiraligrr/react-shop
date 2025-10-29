import React from 'react';
import Header from './header';
import Foter from './foter';

const Lut = ({children}) => {
    return (
        <div>
            <Header/>
            {children}
            <Foter/>
        </div>
    );
}

export default Lut;
