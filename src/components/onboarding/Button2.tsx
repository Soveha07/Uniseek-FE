import React from 'react';

interface Button2Props {
    imgPath: string;
    onClick: () => void; 
}

function Button2({ imgPath, onClick }: Button2Props) {
    return (
        <button
            className="rounded-xl mb-2 flex justify-center items-center bg-[#E5E7EB]"
            style={{ width: "6rem", height: "3rem" }}
            onClick={onClick} 
        >
            <img src={`${process.env.PUBLIC_URL}/${imgPath}.png`} alt="" style={{ width: "2rem" }} className='bg-[#E5E7EB]'/>
        </button>
    );
}

export default Button2;
