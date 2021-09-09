import React, { useState, useEffect } from 'react';
import instance from "../https";
import Layout from "../partials/Layout";

import config from '../../src/config'

import { connect } from "react-redux";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { confirmAlert } from 'react-confirm-alert'; // Import
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css



import {
  BrowserRouter as Router,
  useParams,
  Link,
  useHistory
} from "react-router-dom";


function UserProfile({ isLoggedIn, user, dispatch }) {
  var link = config.Image
  const [startDate, setStartDate] = useState(new Date());
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [userDtl, setuserDtl] = useState({
    id: "string",
    email: "string",
    birthday: "2021-09-05",
    gender: 0,
    firstName: "string",
    lastName: "string",
    address: "string",
    image: "string",
    phone_No: "string",
    password: "string"
    });
  let formData = new FormData();
  const onFileChange = event => {
    setSelectedFiles({ selectedFile: event.target.files[0] });
    setuserDtl({...userDtl,
      image: event.target.files[0].name
    })
  };
  const onFileUpload = () => {
    if (selectedFiles !=undefined){
      const formData = new FormData();
      formData.append("file", selectedFiles.selectedFile);
      instance.post("/UploadPicture/UploadFile", formData)
    }
    
  };
  function UpdateProfile(){
    onFileUpload()
    instance.post(
      '/User/Update',userDtl
  ).then(res => {
    alert("Cập nhật thông tin thành công.")
    window.location.reload();
  })
      .catch(err => {
        alert("Có lỗi xãy ra, kiểm tra lại các trường thông tin ngày tháng ...")
      })
  }
  useEffect(() => {
    instance.get(
        '/User/GetForEdit?id=' + user.id + '',
    ).then(res => {
      setuserDtl({...userDtl,id:user.id,
        email:res.data.email,
        birthday: res.data.birthday.substring(0,10),
        gender: res.data.gender,
        firstName: res.data.firstName,
        lastName:res.data.lastName,
        address: res.data.address,
        image: res.data.image,
        phone_No: res.data.phone_No,
      })
    })
        .catch(err => {
          alert("Có lỗi xãy ra")
        })
}, []);
  return (
    <div className="px-24 flex flex-col min-h-screen overflow-hidden">
      <Layout>
        <main className="flex-grow">
        <div className="w-full mx-auto px-4 sm:px-6 ">
                        <div className="mx-auto gap-6 md:grid-cols-2 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none bg-gray-200  p-3 sm:px-6 ">
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" to={"/"}>
                                    Trang chủ
                                </Link>
                                <Link color="inherit" to={"/orderHis"} >
                                    Thông tin cá nhân 
                                </Link>
                            </Breadcrumbs>

                        </div>
                    </div>
          <div className="container mx-auto my-5 p-5 pt-0">
            <div className="md:flex no-wrap md:-mx-2 ">
              {/* Left Side */}
              <div className="w-full md:w-3/12 md:mx-2">
                {/* Profile Card */}
                <div className="bg-white p-3 border-t-4 border-green-400">
                  <div className="image overflow-hidden">
                    <img className="h-64 w-full mx-auto" src={link+userDtl.image} alt="" />
                  </div>
                  <label className="pt-2">Choose Image</label>
                  <div className="input-group">
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" onChange={onFileChange}  id="inputGroupFile04" ></input>
                      <label className="custom-file-label overflow-hidden" placeholder="Choose file" >{selectedFiles && selectedFiles.selectedFile.name}</label>
                    </div>
                  </div>
                  <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{userDtl.lastName+" "+userDtl.firstName}</h1>
                  <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                    <li className="flex items-center py-3">
                      <span>Status</span>
                      <span className="ml-auto"><span className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                    </li>
                    <li className="flex items-center py-3">
                      <span>Member since</span>
                      <span className="ml-auto">Nov 07, 2016</span>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Right Side */}
              <div className="w-full md:w-9/12 mx-2 h-64">
                {/* Profile tab */}
                {/* About Section */}
                <div className="bg-white p-3 shadow-sm rounded-sm">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span clas="text-green-500">
                      <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <span className="tracking-wide">About</span>
                  </div>
                  <div className="text-gray-700">
                    <div className="grid md:grid-cols-2 text-sm">
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold flex align-items-center">First Name</div>
                        <div className="px-4 py-2">
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" value={userDtl.firstName} onChange={event => { setuserDtl({...userDtl,firstName:event.target.value}) }} type="text" placeholder="First Name"></input>
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold flex align-items-center">Last Name</div>
                        <div className="px-4 py-2"><input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" value={userDtl.lastName} onChange={event => { setuserDtl({...userDtl,lastName:event.target.value}) }} type="text" placeholder="Last Name"></input></div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold flex align-items-center">Gender</div>
                        <div className="px-4 py-2">
                        <label class="inline-flex items-center">
                            <input type="radio" class="form-radio" name="accountType" value="1" onChange={event => { setuserDtl({...userDtl,gender:event.target.value}) }} checked={userDtl.gender=='1'}/>
                            <span class="ml-2">Male</span>
                          </label>
                          <label class="inline-flex items-center ml-6">
                            <input type="radio" class="form-radio" name="accountType" value="0" onChange={event => { setuserDtl({...userDtl,gender:event.target.value}) }} checked={userDtl.gender=='0'}/>
                            <span class="ml-2">Female</span>
                          </label>
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold flex align-items-center">Contact No.</div>
                        <div className="px-4 py-2"><input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" value={userDtl.phone_No} onChange={event => { setuserDtl({...userDtl,phone_No:event.target.value}) }} type="text" placeholder="Contact No."></input></div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold flex align-items-center">Current Address</div>
                        <div className="px-4 py-2"><input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={userDtl.address} id="username" onChange={event => { setuserDtl({...userDtl,address:event.target.value}) }} type="text" placeholder="Current Address"></input></div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold flex align-items-center">Permanant Address</div>
                        <div className="px-4 py-2"><input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Permanant Address"></input></div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold flex align-items-center">Email.</div>
                        <div className="px-4 py-2">
                          <div className="text-blue-800" >
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Email" value={userDtl.email} type="text" onChange={event => { setuserDtl({...userDtl,email:event.target.value}) }} placeholder="Username"></input></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold flex align-items-center">Birthday</div>
                        <div className="px-4 py-2">
                          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" value={userDtl.birthday}  onChange={event => { setuserDtl({...userDtl,birthday:event.target.value}) }} type="text" placeholder="Birthday (yyyy-MM-dd)">
                          </input>
                          </div>
                      </div>
                    </div>
                  </div>
                  <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4" onClick={UpdateProfile} >Save
                    Full Information</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </div>

  );
}

// export default List;
function mapStateToProps(state) {
  const { isLoggedIn, user } = state.auth;
  return {
    isLoggedIn,
    user,
  };
}
export default connect(mapStateToProps)(UserProfile);