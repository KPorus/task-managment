import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../component/context/AuthProvider/AuthProvider';

const AddTask = () => {
    const { user } = useContext(AuthContext);
    console.log(user)
    const imageHostKey = "352df8fe2fc9dcd8f6c608a683804722";
    let addProduct = (event) => {
        event.preventDefault();
        let form = event.target;
        let details = form.details.value;
        let img = event.target.image.files;
        let email = user?.email
      
    
        const image = img[0];
        console.log(image);
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((imgData) => {
            if (imgData.success) {
              console.log(imgData.data.url);
              let tasks = {
                email,
                details,
                photo: imgData.data.url,
              };
    
              console.log(tasks);
              fetch(
                `http://localhost:5000/alltasks`,
                {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(tasks),
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  toast.success("Tasks has beed added");
                  event.target.reset();
                });
            }
          });
      };
    document.title = "Add tasks";
    return (
        <div className='container mx-3 flex flex-col'>
            <h1 className='text-[#4285f4] font-bold my-3'>ADD YOUR TASK : </h1>
            <form className='flex flex-col' onSubmit={addProduct}>
                <textarea name='details' className='w-1/2 text-center font-medium' cols={10} rows={5} placeholder="ADD YOUR TASK"></textarea>
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