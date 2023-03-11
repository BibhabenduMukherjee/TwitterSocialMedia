import React, { useState } from "react";
import { BASE_URL } from "../config";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
const CONFIG_OBJ = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};
const showSuccessToast = (msg) => {
  toast.success(msg || `Added Successfully!`, {
    position: "top-center",
    autoClose: 700,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    
  });
};

const showSuccessToastDislike = (msg) =>{
  toast.success(msg || `Added Successfully!`, {
    position: "top-center",
    autoClose: 700,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    
  });
}

function Card(props) {
  const [like, setLike] = useState(props.t.likes.length);
  const [show, setShow] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [comment, setComment] = useState("Hey!💜 ");
  const [commentLength, setCommentLength] = useState(props.t.comments.length);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  function addcommentForTweet() {
    axios
      .put(`${BASE_URL}/comment`, { tweetId: props.t._id, comment }, CONFIG_OBJ)
      .then((response) => {
        setCommentLength(response.data.totalcomment);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function likeTweet() {
    if (hasLiked) {
      // implement dislike features

      axios
        .put(`${BASE_URL}/dislike`, { tweetId: props.t._id }, CONFIG_OBJ)
        .then((response) => {
          setLike(response.data.likesCount);
          showSuccessToastDislike("DisLiked")
          setHasLiked(false);
        })
        .catch((err) => {
          setHasLiked(false);
          console.log(err);
        });
    } else {
      axios
        .put(`${BASE_URL}/like`, { tweetId: props.t._id }, CONFIG_OBJ)
        .then((response) => {
          setLike(response.data.likesCount);
          showSuccessToast("Liked")
          setHasLiked(true);
        })
        .catch((err) => {
          console.log(err);
          setHasLiked(false);
        });
    }
  }

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
      <div className="border   mt-4 p-2">
        <div className="row">
          <div className="col-2 col-md-1 ">
            <img style={{ width: 40, height: 40 , borderRadius : 50}} src={props.t.postuser?.profileImg} />
          </div>
         

            <div  className="  col-10 ms-2 d-flex flex-column">
              <div className="d-flex flex-row ">
                <Link to = {`/profile/${props.t.postuser?._id}`} style={{ color : "black" , fontSize: 18, fontWeight: 700 , textDecoration : "underline"}} className="me-2 ">
                  @{props.t.postuser?.fullname}
                </Link>
                <p
                  className=""
                  style={{ fontSize: 12, marginTop: 5, fontWeight: 400 }}
                >
                  {new Date(props.t.created_at).toLocaleDateString("en-IN")}
                </p>
              </div>
               <div >
               <div onClick={()=>{navigate(`/tweet/${props.t._id}`)}} style={{cursor : "pointer"}} className="">
                <p>{props.t.description}</p>
              </div>
              <div onClick={()=>{navigate(`/tweet/${props.t._id}`)}} style={{cursor : "pointer"}} className="  ms-4">
                <img  style={{ width: 400, height: 400 }} src={props.t.image} />
              </div>
               </div>
             
            </div>
        
        </div>






        <div className=" border row mt-4 ">
          <div className="d-flex flex-row p-2 align-items-center">
            {/* div for like  */}
            <div className=" d-flex flex-row mx-4 align-items-center ">
              {hasLiked === false ? (
                <i
                  style={{ cursor: "pointer" }}
                  onClick={likeTweet}
                  className=" mb-1 fs-5 fa-sharp fa-regular fa-heart"
                ></i>
              ) : (
                <i
                  style={{ cursor: "pointer" }}
                  onClick={likeTweet}
                  className=" mb-1 fs-5 fa-solid fa-heart"
                ></i>
              )}

              <div className="d-flex flex-row align-items-center">
                <p className=" mx-2 sfs-5 mt-2">{like}</p>
              </div>
            </div>
            {/* div for retweet */}
            <div className=" d-flex flex-row mx-4 align-items-center ">
              <i
                style={{ cursor: "pointer" }}
                onClick={() => {
                  alert("hello");
                }}
                className=" mb-1 fs-5 fa-solid fa-retweet"
              ></i>
              <div className="d-flex flex-row align-items-center">
                <p className=" mx-2 sfs-5 mt-2">1</p>
              </div>
            </div>
            {/* div for comments */}
            <div className=" d-flex flex-row mx-4 align-items-center ">
              <i
                style={{ cursor: "pointer" }}
                onClick={handleShow}
                className=" mb-1 fs-5 fa-regular fa-comment"
              ></i>
              <div className="d-flex flex-row align-items-center">
                <p className=" mx-2 sfs-5 mt-2">{commentLength}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Add a comment</Form.Label>
              {/* <Form.Control as="textarea" rows={4} /> */}
              <div class="input-group">
                <textarea
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  class="form-control"
                  aria-label="With textarea"
                ></textarea>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={addcommentForTweet}>
            Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Card;
