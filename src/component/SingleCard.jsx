import React from 'react'

function SingleCard(props) {
  return (
    <div>
    
    <div className="border   mt-4 p-2">
        <div className="row">
          <div className="col-2 col-md-1 ">
            <img style={{ width: 40, height: 40 , borderRadius : 50}} src={props.t.postuser.profileImg} />
          </div>
          {/* <Link
            to={`tweet/${props.t._id}`}
            style={{ textDecoration: "none", color: "black" }}
          > */}

            <div style={{cursor : "pointer"}} className="  col-10 ms-2 d-flex flex-column">
              <div className="d-flex flex-row ">
                <p style={{ fontSize: 18, fontWeight: 700 }} className="me-2 ">
                  @{props.t.postuser.fullname}
                </p>
                <p
                  className=""
                  style={{ fontSize: 12, marginTop: 5, fontWeight: 400 }}
                >
                  {new Date(props.t.created_at).toLocaleDateString("en-IN")}
                </p>
              </div>

              <div className="">
                <p>{props.t.description}</p>
              </div>
              <div className=" ms-4">
                <img style={{ width: 400, height: 400 }} src={props.t.image} />
              </div>
            </div>
        
        </div>
        </div>

    </div>
  )
}

export default SingleCard