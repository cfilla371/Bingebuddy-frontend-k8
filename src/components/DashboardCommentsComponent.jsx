import React, { useState } from "react";
import SidebarComponent from "./SidebarComponent";
import { useNavigate } from "react-router-dom";
import Mufasa from "../Images/Movies/Mufasa.jpg";
import Godzilla from "../Images/Movies/GodzillaKong.jpg";
import InsideOut from "../Images/Movies/InsideOut.png";
import Moana from "../Images/Movies/Moana.png";

const DashboardCommentsComponent = () => {
  const [comments, setComments] = useState();
  const navigate = useNavigate();

  // useEffect(() => {
  //   getAllReviews();
  // }, [])

  // function getAllReviews(){
  //   listreviews()
  //   .then((response) => {
  //     setReviews(response.data);
  //   }).catch(error => {
  //     console.error(error);
  //   })
  // }

  //   function addNewReview(){
  //     navigator('/add-user') // when Add Employee button is clicked, will take user to /add-employee page
  //   }

  //   function updateReview(id){
  //     navigator(`/edit-review/${id}`);
  //   }

  //   function removeReview(id){
  //     console.log(id);
  //     deleteReview(id).then((response) => {
  //         getAllReviews();
  //     }).catch(error => {
  //         console.log(error);
  //     })
  // }

  return (
    <div className="flex">
      <div>
        <SidebarComponent />
      </div>

      {/* <div className='h-screen flex-1 p-7'>
        <h1 className='center'>
          User can view their comments here
        </h1>
      </div> */}

      <div className="container">
        <h2 className="text-center header"> Comments </h2>
        <div className="table-wrapper">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Movies</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {/* {
                reviews.map(review => 
                  <tr key={review.id}>
                      <td>{review.created_at}</td>
                      <td>{review.content}</td>
                      <td>{review.movieId}</td> */}
              <tr>
                <td>
                  <img
                    className="image-size"
                    src={Mufasa}
                    alt="Mufasa: The Lion King"
                  ></img>
                </td>
                <td>
                  <p> Agreed, a full-fledged family movie!</p>
                  <p>27th Dec 2025</p>
                  {/* <button
                    className="btn btn-secondary"
                    onClick={() => updateReview(review.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-dark"
                    onClick={() => removeReview(review.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
              <tr>
                <td>
                  <img className="image-size" src={Moana} alt="Moana 2"></img>
                </td>
                <td>
                  <p>Yes!</p>
                  <p>10th December 2024</p>
                  {/* <button
                    className="btn btn-secondary"
                    onClick={() => updateReview(review.id)}
                  >
                    {" "}
                    Update
                  </button>
                  <button
                    className="btn btn-dark"
                    onClick={() => removeReview(review.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    {" "}
                    Delete
                  </button> */}
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    className="image-size"
                    src={Godzilla}
                    alt="Godzilla x Kong"
                  ></img>
                </td>
                <td>
                  <p>
                    Just enough of a thriller for my 10-year old. Would watch it
                    again.
                  </p>
                  <p>4th April 2024</p>
                  {/* <button
                    className="btn btn-secondary"
                    onClick={() => updateReview(review.id)}
                  >
                    {" "}
                    Update
                  </button>
                  <button
                    className="btn btn-dark"
                    onClick={() => removeReview(review.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    {" "}
                    Delete
                  </button> */}
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    className="image-size"
                    src={InsideOut}
                    alt="Inside Out 2"
                  ></img>
                </td>
                <td>
                  <p>Yes, good family entertainer</p>
                  <p>7th July 2024</p>
                  {/* <button
                    className="btn btn-secondary"
                    onClick={() => updateReview(review.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-dark"
                    onClick={() => removeReview(review.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    className="image-size"
                    src={Mufasa}
                    alt="Mufasa: The Lion King"
                  ></img>
                </td>
                <td>
                  <p>We loved it too!</p>
                  <p>2nd Jan 2025</p>
                  {/* <button
                    className="btn btn-secondary"
                    onClick={() => updateReview(review.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-dark"
                    onClick={() => removeReview(review.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    {" "}
                    Delete
                  </button> */}
                </td>
              </tr>
              {/* </tr>)
              }
               */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardCommentsComponent;
