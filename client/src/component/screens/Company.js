import React from 'react'

function Company() {
  return (
    <div className="container">
     <div className="row">
         <div className="col-md-12 text-center">
           <h5 className="display-5 text-success p-5">Company Info</h5>
         </div>
     </div>
 
     <div className="row">
         
         <div className="col-md-6 offset-md-3 mb-2">
           <div className="card">             
             <div className="card-body">
               <ul className="list-group">
                 <li className="list-group-item">
                   <strong>Company</strong>
                   <span className="text-secondary float-end"> Geeksynergy Technologies Pvt Ltd</span>
                 </li>
                 <li className="list-group-item">
                   <strong>Mobile</strong>
                   <span className="text-secondary float-end"> XXXXXXXXX09 </span>
                 </li>
                 <li className="list-group-item">
                   <strong>Email</strong>
                   <span className="text-secondary float-end"> XXXXXXX@gmail.com </span>
                 </li>
                 <li className="list-group-item">
                   <strong>Address</strong>
                   <span className="text-secondary float-end">Sanjayanagar, Bengaluru-56</span>
                 </li>
                                
               </ul>
             </div>
             </div>
         </div>
     </div>
    </div>
   )
}

export default Company