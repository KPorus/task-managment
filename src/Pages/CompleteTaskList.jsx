import React from "react";
import { toast } from "react-hot-toast";

const CompleteTaskList = ({ items, refetch }) => {
  let { _id, details, email, taskComplete } = items;
  const handleStatusUpdate = (_id) => {
    fetch(`http://localhost:5000/completetasks/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ taskComplete: false }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          refetch();
          toast.success("Task Move to from complete tasks");
        }
      });
  };

  let handleDelete = (_id) => {
    fetch(`http://localhost:5000/completetasks/${_id}`, {
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
  return (
    <tr>
      {taskComplete && (
        <>
          <td className='text-center'>{email}</td>
          <td className='text-center'>{details}</td>
          <td className='p-3 text-right'>
            <span
              onClick={() => handleStatusUpdate(_id)}
              className=' btn px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900 cursor-pointer'>
              <span>Not Complete</span>
            </span>
          </td>
          <td className='p-3 text-right'>
            <span
              onClick={() => handleDelete(_id)}
              className=' btn px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900 cursor-pointer'>
              <span>Delete</span>
            </span>
          </td>
        </>
      )}
    </tr>
  );
};

export default CompleteTaskList;
