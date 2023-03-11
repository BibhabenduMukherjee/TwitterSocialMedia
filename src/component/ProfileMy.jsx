import React, { useEffect, useState } from 'react'
import { Link ,useParams} from 'react-router-dom'
import axios from "axios"
import { BASE_URL } from '../config'
import "./Profile.css"
import Card from './Card'
const CONFIG_OBJ = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("token")
  }
}

function Profile() {

     const user = (JSON.parse(localStorage.getItem("user")))
     const [posts , setPosts] = useState([])
     
    
 

     useEffect(()=>{
      const getMyPosts = async () => {

   
        debugger
        const response = await axios.get(`${BASE_URL}/myallposts`, CONFIG_OBJ);
    
        if (response.status === 200) {

          setPosts(response.data.posts);
         console.log(response.data)
        } else {
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Some error occurred while getting all your posts'
          // })

          console.log("error")
        }
      }

      getMyPosts()
     },[])

  return (
    <div>
    
    <div className = "row">
    <div className=" sidebar col-3 col-md-3 d-flex flex-column  ">
              <div className=" menu d-flex align-items-center flex-column ">
                <Link className="d-flex text-decoration-none " to={"/Home"}>
                  <a href="/Home" className="home_icon mx-1">
                    {" "}
                    <i class="fa-solid fa-house"></i>
                  </a>
                  <p className="home">Home</p>
                </Link>

                <Link className="d-flex text-decoration-none " to={"/profile"}>
                  <a href="/Profile" className="home_icon mx-1">
                    {" "}
                    <i class="fa-solid fa-user"></i>
                  </a>
                  <p className="home">Profile</p>
                </Link>
                <div className="d-flex ">
                  <Link className="d-flex text-decoration-none " to={"/logout"}>
                    <a href="/Logout" className="home_icon mx-1">
                      <i class="fa-solid fa-right-from-bracket"></i>
                    </a>
                    <p className="home">Logout</p>
                  </Link>
                </div>
              </div>

              <div className=" leftsideBottom  shawdow d-flex  flex-column  ">
                <div className="d-flex justify-content-center align-items-center ">
                  <img
                    style={{ borderRadius: 50 }}
                    src={user.profileImg}
                    width={40}
                    height={40}
                  />
                  <div className="p-2">{user.fullname}</div>
                </div>
              </div>
            </div>
            <div className=' rightfeed col-9 col-md-9 flex flex-column'>
              <section className='banner'></section>
              <div className='row '>
                <div className='col-4'>
                    <img className=' imageProfile rounded-circle' src = {"/Twitter.png"} width = {150} height = {150}/>
                </div>
                <div className = ' rightBellowBanner col-8 d-flex justify-content-end '>
                    <button className= '  me-4 mt-4 btn btn-info'>Follow</button>
                </div>
              </div>


              <div className=' overflow-hidden d-flex flex-column'>
 

         { posts.length > 0 &&  posts.map((t)=>(
          <div key={t._id}>
          <Card t = {t} />
          </div>
         ))}

        </div>
            </div>


    </div>
    
    
    
    
    
    </div>
  )
}

export default Profile