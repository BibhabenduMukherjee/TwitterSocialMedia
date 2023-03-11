import React, { useEffect, useState } from 'react'
import { Link ,useParams} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { BASE_URL } from '../config'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Profile.css"
import Card from './Card'
const CONFIG_OBJ = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("token")
  }
}

const showSuccessToast = (msg) => {
  toast.success(msg || `Added Successfully!`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    
  });
};

function Profile() {
  
  const [lgShow, setLgShow] = useState(false);
     const user = (JSON.parse(localStorage.getItem("user")))
     console.log(user)
     const [posts , setPosts] = useState([])
     const [userT , setUserT] = useState({})
     const [isAdmin , setIsAdmin] = useState(false)
     const [userImg , setUserImg] = useState("")
     const [userS , setUserS] = useState({})
     const [userfollow,setUserFollow] = useState(false)
     //const [updatedUserProfileImg , setUpdatedUserProfileImg]  = useState(false)
    // const [updatedUserProfileImgUrl , setUpdatedUserProfileImgUrl]  = useState("")
     const [foll , setFoll] = useState(0)
     const [userUpdateImage , setUserUpdateImage] = useState({})
     const [userNotAdImge , setUserNotAdImge] = useState("")
     const [notifcationImgUpdate,setNotifcationImgUpdate] = useState(false)
      const params = useParams();
      const id = params.id
     // console.log(user);
     // console.log(posts);
     // console.log(userT)

     function callUpdate(){
      setTimeout(()=>{
        window.location.reload()
      },2000)
     }

    async function unfollow(){
      setUserFollow(false)
  const ress = await axios.get(`${BASE_URL}/unfollow/${id}`, CONFIG_OBJ);
  if(ress.status == 200){
    setFoll(ress.data.followers.length)
  }else{
    console.log("error")
  }
    }

    async function follow(){
      setUserFollow(true)
      const ress = await axios.get(`${BASE_URL}/follow/${id}`, CONFIG_OBJ);
      if(ress.status === 200){
     setFoll(ress.data.followers.length)
      }else{
        console.log("error")
      }
    }

     useEffect(()=>{
   
      const getMyPosts = async () => {
        const response = await axios.get(`${BASE_URL}/specificallposts/${id}`, CONFIG_OBJ);
         const userOriginal  = await axios.get(`${BASE_URL}/originalperson/${id}`)
         const userOriginals  = await axios.get(`${BASE_URL}/originalperson/${user._id}`)
         const includeFollow = await axios.get(`${BASE_URL}/includefollow/${id}` , CONFIG_OBJ)
         if(includeFollow.data == "yes")
         {
          setUserFollow(true)
         }else{
          setUserFollow(false)
         }
        setFoll(response.data.posts[0]?.postuser?.followers?.length)
        user.profileImg = userOriginals.data.profileImg
        console.log(userOriginal.data);
         if(userOriginal.status === 200){
        setUserS(userOriginal.data)
        setUserNotAdImge(userOriginals.data)
         }
    
        if (response.status === 200) {

          setPosts(response.data.posts);
         
          setUserImg(response.data.posts?.postuser?.profileImg)
         // console.log(response.data);
           setUserT(response.data.posts[0]?.postuser)
       //  console.log("render");
        } else {
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Some error occurred while getting all your posts'
          // })

          console.log("error")
        }
      }
     
      getMyPosts()
      if( user._id === id){
     
        setIsAdmin(true)
      }
     },[])
   
     function handleUserProfileUpdate(e){
    const  img = {
        preview : URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0]
      }

      setUserUpdateImage(img)

     }
 


    async function updateServer()
    {
      setLgShow(false)
      // upload it to server storage
      let formData = new FormData();
      formData.append('file', userUpdateImage.data);
  
      const response = await axios.post(`${BASE_URL}/uploadFileProfile`, formData)
      const payload = {
        update : `${BASE_URL}/filesProfile/${response.data.fileName}`
      }
      const responseUpdate = await axios.put(`${BASE_URL}/updateUserprofileimage` , payload , CONFIG_OBJ)
      setNotifcationImgUpdate(true)
      showSuccessToast("updated")
      callUpdate()
       
     
      console.log(responseUpdate);
     
      // setUpdatedUserProfileImg(true)
     // setUpdatedUserProfileImgUrl( `${BASE_URL}/filesProfile/${response.data.fileName}`)
      console.log(response)

    }

    // console.log(userUpdateImage)

  return (
    <div>
    <ToastContainer
        position="top-right"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    {posts.length > 0 ?
    
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
                    src={userNotAdImge.profileImg}
                    width={40}
                    height={40}
                  />
                  <div className="p-2">{user.fullname}</div>
                </div>
              </div>
            </div>
            <div className=' rightfeed col-9 col-md-9 flex flex-column'>
              <section className='banner'></section>
              <div className='row gol'>
                <div className='col-4'>
                    <img className=' imageProfile rounded-circle' src = { userS.profileImg} width = {150} height = {150}/>
                </div>
                <div className = ' rightBellowBanner col-8 d-flex justify-content-end '>
   
                   {
                    isAdmin ? <button onClick={()=>{setLgShow(true)}} className= '  me-4 mt-2 btn '>Update</button> :
                
                    userfollow ? <button   onClick={()=>{unfollow()}} className= '  me-4 mt-2 btn '>UnFollow</button> : <button   onClick={()=>{follow()}} className= '  me-4 mt-2 btn '>Follow</button>

                   
                   }
                  
                    
                </div>
              </div>


               <div className='row'>
                <div className='col-12'>
                  <div className='d-flex'>
                  <p className='me-2'> {userT.fullname} <span className='me-2 ms-2 ' style={{fontWeight : 600}}>|</span> </p>
                    <p className=''> <span style={{fontWeight:600}}>{new Date(userT.userjoin).toLocaleDateString("en-IN",{
                       
                      month:"long",
                      year : "numeric"
                    
                    })} </span></p>
                  </div>
                  <div className='d-flex foll'>
                    <p style={{fontWeight : 700}} className='me-4'><span >{foll}</span> followers</p>
                    <p style={{fontWeight : 700}} className=''><span>{userS?.following?.length}</span> following</p>
                  </div>
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


    </div> : 
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
                  <a href="/profile" className="home_icon mx-1">
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
                    src={userS.profileImg}
                    width={40}
                    height={40}
                  />
                  <div className="p-2">{userS.fullname}</div>
                </div>
              </div>
            </div>
            <div className=' rightfeed col-9 col-md-9 flex flex-column'>
              <section className='banner'></section>
              <div className='row gol'>
                <div className='col-4'>
                    <img className=' imageProfile rounded-circle' src = { userS.profileImg} width = {150} height = {150}/>
                </div>
                <div className = ' rightBellowBanner col-8 d-flex justify-content-end '>
   
                   {
                    isAdmin ? <button onClick={()=>{setLgShow(true)}} className= '  me-4 mt-2 btn '>Update</button> :
                    <button onClick={()=>{follow()}} className= '  me-4 mt-2 btn '>Follow</button>
                   }
                  
                    
                </div>
              </div>


               <div className='row'>
                <div className='col-12'>
                  <div className='d-flex'>
                    <p className='me-2'> {user.fullname} <span className='me-2 ms-2 ' style={{fontWeight : 600}}>|</span> </p>
                    <p className=''> <span style={{fontWeight:600}}>{new Date(user.userjoin).toLocaleDateString("en-IN",{
                       
                      month:"long",
                      year : "numeric"
                    
                    })} </span></p>
                  </div>
                  <div className='d-flex foll'>
                  <p style={{fontWeight : 700}} className='me-4'><span >{userS?.followers?.length}</span> followers</p>
                    <p style={{fontWeight : 700}} className=''><span>{userS?.following?.length}</span> following</p>
                  </div>
                </div>
               </div>

              <div className=' overflow-hidden d-flex flex-column'>
 

                <div className='no_post'>
                  <h2>Not Enough Data..</h2>
                </div>

        </div>
            </div>


    </div>  }
    
    
    
    
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>


         <div className='d-flex flex-column'>
          <input type= "file" onChange={handleUserProfileUpdate}/>
          {userUpdateImage.preview && <div className='d-flex flex-column'>
           <p >{userUpdateImage.data.name}</p>
            <img src={userUpdateImage.preview}/>
            <button onClick={updateServer} className='btn btn-success '>Update</button>
          </div>}
         </div>

        </Modal.Body>
      </Modal>
    
    
    </div>
  )
}

export default Profile