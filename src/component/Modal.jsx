import { AuthContext } from "../component/context/AuthProvider/AuthProvider";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import "../App.css";

const Modal = ({ edit, setedit, refetch }) => {
  const { user } = useContext(AuthContext);
  
  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const details = form.details.value;
    console.log(details);
    let id = edit._id;
    console.log(id);
    fetch(`https://task-managment-server.vercel.app/updatetasks/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ details: details }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          refetch();
          toast.success("Task updated");
          setedit(null)
        }
      });
  };

  return (
    <>
      <input type='checkbox' id='book' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box relative'>
          <label
            htmlFor='book'
            className='btn btn-sm btn-circle absolute right-2 top-2'>
            ✕
          </label>
          <h3 className='text-lg font-bold'>Task update</h3>
          <form onSubmit={handleBooking} className='grid grid-cols-1'>
            <textarea
              name='details'
              className='w-1/2 text-center font-medium text-slate-900'
              cols={10}
              rows={5}
              placeholder='ADD YOUR TASK'></textarea>
            <br />
            <input
              className='btn px-4 py-2 text-white bg-[#003566] font-medium w-full'
              type='submit'
              value='Submit'
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
