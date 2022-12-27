import React,{useContext}from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../component/Loading";
import { AuthContext } from "../component/context/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import UserTask from "./UserTask";

const UserTasks = () => {
    const {user} = useContext(AuthContext);
  const {
    isLoading,
    refetch,
    data: tasks = [],
  } = useQuery({
    queryKey: ["userPuduct"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/alltasks/${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  console.log(tasks);
  return (
    <div>
      <h1 className='text-center text-white text-xl font-medium my-4'>
        All the tasks
      </h1>
      <div className='overflow-x-auto m-10 text-slate-100 bg-slate-800'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Tasks</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((items) => (
              <UserTask
                key={items._id}
                refetch={refetch}
                items={items}
               ></UserTask>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-center m-10'>
        <Link
          to='/'
          className='px-8 py-3 font-semibold rounded bg-[#003566] text-white'>
          Back to Home Page
        </Link>
      </div>
    </div>
      
  );
};

export default UserTasks;
