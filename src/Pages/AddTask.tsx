import React from 'react';

const AddTask = () => {
    document.title = "Add tasks";
    return (
        <div className='container mx-3 flex flex-col'>
            <h1 className='text-[#4285f4] font-bold my-3'>ADD YOUR TASK : </h1>
            <form className='flex flex-col'>
                <textarea className='w-1/2 text-center font-medium' cols={10} rows={5} placeholder="ADD YOUR TASK"></textarea>
                <input
                    name='image'
                    type='file'
                    required
                    placeholder='Product name'
                    className='mt-3 input input-bordered rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-white'
                />
                <div className='mt-6'>
                <button
                  className='w-32 h-[3rem] bg-[#4285f4] text-white sm:text-xl'
                  type='submit'>
                  Submit
                </button>
              </div>
            </form>
        </div>
    );
};

export default AddTask;