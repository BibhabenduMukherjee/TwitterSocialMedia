import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
  Link,
} from "react-router-dom";
import "./Home.css";
import "../App.css";
import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { useState } from "react";
import SingleCard from "./SingleCard";
const CONFIG_OBJ = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};
function Tweet() {
  const params = useParams();
  const _id = params.tweetid;
  const user = (JSON.parse(localStorage.getItem("user")))
  const [isLoding, setIsLoading] = useState(true);
  const [image, setImage] = useState("");
  const [time, setTime] = useState("");
  const [des, setDes] = useState("");
  const [username, SetUserName] = useState("");
  const [comments, setComments] = useState([]);
  const [userimg, setUserImg] = useState("");
  const [imgUser , setImgUser] = useState("")

  useEffect(() => {
   async function fun() {
      axios
        .get(`${BASE_URL}/tweet/${_id}`, CONFIG_OBJ)

        .then((response) => {
          setDes(response.data.description);
          setTime(response.data.created_at);
          setImage(response.data.image);
          setComments(response.data.comments);
          SetUserName(response.data.postuser.fullname);
          setUserImg(response.data.postuser.profileImg);

          console.log(response.data);
        })
        .catch((err) => {});

        const userOriginals  = await axios.get(`${BASE_URL}/originalperson/${user._id}`)
        setImgUser(userOriginals.data.profileImg)
    }
   
    fun();
  }, []);

  setTimeout(() => {
    setIsLoading(false);
    
  }, 400);

  return (
    <>
      {isLoding ? (
        <div className="d-flex justify-content-center mt-4">
          <div class="spinner-border text-success me-2" role="status"></div>
          <span class="">Loading...</span>
        </div>
      ) : (
        <>
          <div className="row">
            <div className=" sidebar col-3 col-md-3 d-flex flex-column  ">
              <div className=" menu d-flex align-items-center flex-column ">
                <Link className="d-flex text-decoration-none " to={"/Home"}>
                  <a href="/Home" className="home_icon mx-1">
                    {" "}
                    <i class="fa-solid fa-house"></i>
                  </a>
                  <p className="home">Home</p>
                </Link>

                {/* <Link className="d-flex text-decoration-none " to={"/profile"}>
                  <a href="/Profile" classNaxme="home_icon mx-1">
                    {" "}
                    <i class="fa-solid fa-user"></i>
                  </a>
                  <p className="home">Profile</p>
                </Link> */}
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
                    src={imgUser}
                    width={40}
                    height={40}
                  />
                  <div className="p-2">{user.fullname}</div>
                </div>
              </div>
            </div>
            <div className=" overflow-hidden d-flex flex-column">
              <div className="  p-4 rightfeed  flex flex-column">
                <div className="col-2 col-md-1 ">
                  <img
                    style={{ width: 40, height: 40, borderRadius: 50 }}
                    src={userimg}
                  />
                </div>

                <div
                  style={{ cursor: "pointer" }}
                  className="  col-10 ms-2 d-flex flex-column"
                >
                  <div className="d-flex flex-row ">
                    <p
                      style={{ fontSize: 18, fontWeight: 700 }}
                      className="me-2 "
                    >
                      @{username}
                    </p>
                    <p
                      className=""
                      style={{ fontSize: 12, marginTop: 5, fontWeight: 400 }}
                    >
                      {new Date(time).toLocaleDateString("en-IN")}
                    </p>
                  </div>

                  <div className="">
                    <p>{des}</p>
                  </div>
                  <div className="">
                    <img style={{ width: 390, height: 400 }} src={image} />
                  </div>
                </div>

                <hr />
                <div className="my-4 h-50">
                  {comments.length > 0 && (
                    <div className="  d-flex flex-column ">
                      {!isLoding ? (
                        comments.map((com, ind) => (
                          <div
                            key={ind}
                            className=" border d-flex mt-4 flex-column"
                          >
                            <div className="row mt-4">
                              <div className="col-1 ms-4">
                                <img
                                  className="rounded-circle"
                                  src={com.commentedBy.profileImg}
                                  width={30}
                                  height={30}
                                />
                              </div>
                              <div className="col-9 d-flex justify-content-between">
                                <div>
                                  <p className="fw-bold">
                                    @{com.commentedBy.fullname}
                                  </p>
                                </div>
                                <div className="text-muted fs-8">
                                  {new Date(com.created_at).toLocaleDateString(
                                    "en-IN"
                                  ) +
                                    "    " +
                                    new Date(com.created_at).toLocaleTimeString(
                                      "en-IN"
                                    )}
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 ms-4 mb-4">
                              {com.commentText}
                            </div>
                          </div>
                        ))
                      ) : (
                        <>Comment is loding</>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Tweet;
