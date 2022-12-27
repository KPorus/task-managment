import React,{useContext}from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../component/Loading";
import { AuthContext } from "../component/context/AuthProvider/AuthProvider";

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
  return (
    <div>
      <h1 className='text-center text-white text-xl font-medium my-4'>
        All the tasks
      </h1>
    </div>
  );
};

export default UserTasks;
