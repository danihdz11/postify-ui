


import React from 'react'
import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import { GoHomeFill } from "react-icons/go";
import { GoVideo } from "react-icons/go";
import { GoPaperAirplane } from "react-icons/go";
import { GoSearch } from "react-icons/go";
import { GoPerson } from "react-icons/go";



function Profile() {

  const { userId } = useParams();
  const urlPosts = `http://localhost:8000/users/${userId}/posts`
  const { data, loading, error} = useFetch(urlPosts)

  console.log(data)

  const handleGetPost = (id) => {
    console.log(id)
  }

  return (
    <>
      <div className='flex flex-col'>
        <div className='h-[80px] bg-amber-500 flex gap-4'>
          <div>Dani</div>
          <div>followers</div>
          <div>posts</div>
        </div>
        <div className='h-[560px] bg-red-300 flex'>
            {data.map((post) => ( 
              <div onClick={() => handleGetPost(post.id)} className='h-[150px] w-[120px] bg-orange-800'> {post.id}</div> 
            ))}
          </div>
        <div className='h-[50px] bg-blue-300 flex gap-4 justify-center'>
          <GoHomeFill className="w-10 h-10" />
          <GoVideo className='w-10 h-10' />
          <GoPaperAirplane className='w-10 h-10' />
          <GoSearch className='w-10 h-10' />
          <GoPerson className='w-10 h-10' />


        </div>
      </div>
    </>
  )
}

export default Profile