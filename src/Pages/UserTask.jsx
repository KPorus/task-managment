import React from "react";
import { toast } from "react-hot-toast";


const userTask = ({ items, refetch }) => {
  let { _id, details, email, taskComplete } = items;
  let handleDelete = (_id) => {
    fetch(`http://localhost:5000/alltasks/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`deleted successfully`);
        }
      });
  };

  const handleStatusUpdate = (_id) => {
    fetch(`http://localhost:5000/alltasks/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ taskComplete: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
            toast.success("Task Complete")
        }
      });
  };
  return (
    <tr>
      <td className='text-center'>{email}</td>
      <td className='text-center'>{details}</td>
      <td className='p-3 text-right'>
        <span className=' btn px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900 cursor-pointer'>
          <span>Edit</span>
        </span>
      </td>
      <td className='p-3 text-right'>
        <span onClick={() => handleStatusUpdate(_id)} className=' btn px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900 cursor-pointer'>
          <span>Complete</span>
        </span>
      </td>
      <td className='p-3 text-right'>
        <span
          onClick={() => handleDelete(_id)}
          className=' btn px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900 cursor-pointer'>
          <span>Delete</span>
        </span>
      </td>
    </tr>
  );
};

export default userTask;
