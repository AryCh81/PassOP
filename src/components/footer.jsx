import React from 'react';

const footer = () => {
    return (

        <div className='px-[41vw] justify-center bg-blue-950 h-14 fixed bottom-0'>

            <div className='flex flex-col'>
                {/* passop */}
                <div className='ml-10 font-bold text-2xl'>
                    <span className=' text-green-600'>{"<"}</span>
                    <span className=' text-white'>Pass</span>
                    <span className=' text-green-600'>{"OP/>"}</span>
                </div>
                {/* madewithlove */}
                <div className=' text-white'>made with ♡ by Aryan Chaudhary</div>
            </div>

        </div>

    );
}

export default footer;
