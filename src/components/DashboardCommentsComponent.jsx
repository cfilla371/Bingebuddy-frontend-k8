import React, { useState } from "react";
import SidebarComponent from "./SidebarComponent";
import { useNavigate } from "react-router-dom";


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
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardCommentsComponent;
