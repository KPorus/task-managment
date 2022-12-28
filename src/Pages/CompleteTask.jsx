import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../component/Loading";
import { AuthContext } from "../component/context/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import CompleteTaskList from "./CompleteTaskList";

const CompleteTask = () => {
  const { user } = useContext(AuthContext);
  const {
    isLoading,
    refetch,
    data: tasks = [],
  } = useQuery({
    queryKey: ["userPuduct"],
    queryFn: async () => {
      const res = await fetch(
        `https://task-managment-server.vercel.app/completetasks/${user?.email}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1 className='text-center text-white text-xl font-medium my-4'>
        Complete tasks
      </h1>
      <section className='text-gray-600 body-font'>
        <div>
          <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
            {tasks.map((items) => (
              <CompleteTaskList
                key={items._id}
                refetch={refetch}
                items={items}></CompleteTaskList>
            ))}
          </div>
        </div>
        <div className='flex justify-center m-8'>
          <Link
            to='/'
            className='px-8 py-3 font-semibold rounded bg-[#003566] text-white'>
            Back to Home Page
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CompleteTask;
