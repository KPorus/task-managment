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
          refetch();
          toast.success("Task Complete");
        }
      });
  };
  return (
    <>
      {taskComplete === false && (
        <>
          <div className='p-2'>
            <div className='border-2 rounded-lg border-gray-200 border-opacity-50 p-8 text-center'>
              <div className='sm:flex-grow'>
                <h2 className='text-gray-100 text-[0.8rem] sm:text-xl font-medium mb-3'>
                  {email}
                </h2>
                <h2 className='text-gray-100  font-medium mb-3'>
                  {details}
                </h2>
                <div className="flex sm:flex-row flex-col sm:justify-center items-center">
                  <span className=' my-1 sm:my-0 w-1/2 text-center sm:w-[20%] btn px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900 cursor-pointer'>
                    <span>Edit</span>
                  </span>
                  <span
                    onClick={() => handleStatusUpdate(_id)}
                    className='my-1 sm:my-0 text-center w-7/12 sm:mx-2 sm:w-[35%] btn px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900 cursor-pointer'>
                    <span>Complete</span>
                  </span>
                  <span
                    onClick={() => handleDelete(_id)}
                    className='my-1 sm:my-0 w-1/2 text-center sm:w-[30%] btn px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900 cursor-pointer'>
                    <span>Delete</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default userTask;
