import React from "react";
import { toast } from "react-hot-toast";
import Cookies from "universal-cookie/cjs/Cookies";

const CompleteTaskList = ({ items, refetch }) => {
    const cookies = new Cookies();
  let { _id, details, email, taskComplete } = items;
  const handleStatusUpdate = (_id) => {
    fetch(`https://task-managment-server.vercel.app/completetasks/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${cookies.get("token")}`,
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
    fetch(`https://task-managment-server.vercel.app/completetasks/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${cookies.get("token")}`,
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
    <>
      {taskComplete && (
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
                  <span
                    onClick={() => handleStatusUpdate(_id)}
                    className='my-1 sm:my-0 text-center w-7/12 sm:mx-2 sm:w-[45%] btn px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900 cursor-pointer'>
                    <span>Not Complete</span>
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

export default CompleteTaskList;
