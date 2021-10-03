import React, { useState, useEffect, Fragment } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import instance from "../https";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import config from '../../src/config'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { makeStyles } from '@material-ui/core/styles';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

const navigation = [

]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));


function Header({ isLoggedIn, user, dispatch }) {
  let history = useHistory();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [isCartAlert, setisCartAlert] = React.useState(false);
  const [isSearch, setIsSearch] = React.useState(false);
  const [isEndSession, setsEndSession] = React.useState(false);
  var link = config.Image

  const [isOpen, setIsOpen] = useState(false);
  const [menus, setMenu] = React.useState({ result: [] });
  useEffect(() => {
    const fetchData = async () => {
      instance.get(
        '/ProductCategory/GetUiList',
      ).then(res => {
        setMenu(res.data);
      })
        .catch(err => {
        })

    };
    fetchData();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickLogin = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl1(null);
  };
  function Logout() {
    dispatch(logout());
    history.push("/signin")
  }
  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);


  const [countCart, setcountCart] = React.useState(0);
  useEffect(() => {
    if (isLoggedIn) {
      instance
        .get(
          "/Cart/GetCurrentCartItem?Page=1&RowsPerPage=100"
        )
        .then((response) => {
          setcountCart(response.data.result.totalCount);
        }).catch(err => {
          if (err.status = "401") {
            setsEndSession(true)
          }
        });
    }
  }, []);

  function goToCart() {
    setIsSearch(false)
    if (isLoggedIn && !isEndSession) {
      if (countCart > 0) {
        history.push("/cart");
      }
      else {
        instance
          .get(
            "/Cart/GetCurrentCartItem?Page=1&RowsPerPage=100"
          )
          .then((response) => {
            if (response.data.result.totalCount == 0) {
              setisCartAlert(true)
              setTimeout(
                function () {
                  setisCartAlert(false);
                }
                  .bind(this),
                500
              );
            } else {
              history.push("/cart");
            }
            return;
          });
      }
    }
    else {
      if (isEndSession) {
        confirmAlert({
          title: 'Thông báo',
          message: 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại !',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                history.push("/signin")
              }
            },
            {
              label: 'No',
            }
          ]
        });
      } else {
        confirmAlert({
          title: 'Thông báo',
          message: 'Bạn cần đăng nhập để có thể xem giỏ hàng !',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                history.push("/signin")
              }
            },
            {
              label: 'No',
            }
          ]
        });

      }


    }
  }

  function goToOrderList() {
    setIsSearch(false)

    if (isLoggedIn && !isEndSession) {
      history.push("/orderHis");
    } else {
      if (isEndSession) {
        confirmAlert({
          title: 'Thông báo',
          message: 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại !',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                history.push("/signin")
              }
            },
            {
              label: 'No',
            }
          ]
        });
      } else {
        confirmAlert({
          title: 'Thông báo',
          message: 'Bạn cần đăng nhập để có thể xem giỏ hàng !',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                history.push("/signin")
              }
            },
            {
              label: 'No',
            }
          ]
        });

      }
    }
  }




  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 ">
            <div className="flex items-center justify-around md:hidden">
              <div >
                <div className="relative">
                  <button
                    className="text-gray-500 flex items-center justify-center hover:text-gray-600 w-8 h-8 lg:hidden rounded-full bg-gray-200"
                    aria-controls="sidebar"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {isOpen == false ? (
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="5" width="16" height="2" />
                        <rect x="4" y="11" width="16" height="2" />
                        <rect x="4" y="17" width="16" height="2" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
                <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-20 block transition-opacity bg-black opacity-50 lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      />
                <div className={` absolute inset-y-48 left-0 z-30 w-72 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border rounded-none lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
                  }`}>
                  <Navigation
                    onSelect={({ itemId }) => {
                      if (itemId.substring(0, 3) =="sub"){
                        setIsOpen(!isOpen)
                      }
                      history.push(itemId.replace(itemId.substring(0, 3),""));
                    }}
                    items={
                      menus.result.map(item => (
                        {
                          title: item.name,
                          itemId: 'par/list/' + item.id + '',
                          subNav: item.subCategories.map(sub => (
                            {
                              title: sub.name,
                              itemId: 'sub/list/' + sub.id + '',
                            }
                          ))
                        }
                      ))
                    }
                  />
                </div>
              </div>
              <div className="">
                <div className="flex items-center">
                  <div className="p-2 xl:col-span-3 sm:col-span-4">
                    <button
                      className={`w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-200 transition duration-150 rounded-full ml-3 ${isSearch && 'bg-gray-200'}`}
                      onClick={() => { setIsSearch(!isSearch) }}
                      aria-controls="search-modal"
                    >
                      <span className="sr-only">Search</span>
                      <svg className="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current text-gray-500" d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                        <path className="fill-current text-gray-400" d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                      </svg>
                    </button>
                    {isSearch ? (
                      <div className="absolute z-50 w-72 right-15">
                        <div className="bg-white  px-4 py-2 shadow-md" role="alert">
                          <div className="pt-2 relative mx-auto text-gray-600">
                            <input className="w-full border border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" type="search" name="search" placeholder="Search" />
                            <button type="submit" className="absolute right-0 top-0 mt-5 mr-4"
                              onClick={() => {
                                setIsSearch(!isSearch)
                              }}
                            >
                              <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style={{ enableBackground: 'new 0 0 56.966 56.966' }} xmlSpace="preserve" width="512px" height="512px">
                                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : null}


                  </div>
                  <div className="relative p-2 xl:col-span-2 sm:col-span-3">
                    <button
                      className={`w-8 h-8 relative flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-150 rounded-full ${'bg-gray-200'}`}
                      aria-haspopup="true"
                      onClick={() => goToCart()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-500 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-0 border-white rounded-full"></div>
                    </button>
                    <Transition
                      className="origin-top-right w-64 z-10 absolute top-full right-25 -mr-48 sm:mr-0 min-w-80  py-1.5 rounded shadow-lg overflow-hidden mt-1"
                      show={isCartAlert}
                      enter="transition ease-out duration-200 transform"
                      enterstart="opacity-0 -translate-y-2"
                      enterend="opacity-100 translate-y-0"
                      leave="transition ease-out duration-200"
                      leavestart="opacity-100"
                      leaveend="opacity-0"
                    >
                      <div
                      >
                        <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                          <div className="flex">
                            <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                            <div>
                              <p className="font-bold">Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Transition>
                  </div>

                  <div className="p-2 xl:col-span-3 sm:col-span-4">
                    <button
                      className={`w-8 h-8 relative flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-150 rounded-full ${'bg-gray-200'}`}
                      aria-haspopup="true"
                      onClick={() => goToOrderList()}
                    >
                      <span className="sr-only">Notifications</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-0 border-white rounded-full"></div>
                    </button>
                  </div>
                  <hr className="w-px h-6 bg-gray-200 mx-3" />
                  <Menu as="div" className="relative">
                    <div className="flex justify-center items-center group">
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        {(isLoggedIn && user.image != null) ? (
                          <img
                            className="h-8 w-8 rounded-full"
                            src={link + user.image}
                            alt=""
                          />) : (
                          <img
                            className="h-8 w-8 rounded-full"
                            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQHBg0QEBIPEA4QEBEQFRgQDRcQExAaFhUWFiATFRUYHSggGB4lGxgWITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NFQ0NDy0ZFRkrLSs3Ky0tLisrKzctNy0rNystLS0rKysrKy0rLSsrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwQFAgYBB//EADQQAQACAAMFBQcCBwEAAAAAAAABAgMEEQUSITFhQVFxgbETIlKRocHRFDQyQnKCkuHxJP/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A/TAGkAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAHVKTiW0iJmegOX2I1nSOM9F2mzL25zWv1lo5fLVy9eEce2Z5yauMzC2de8cdKx15/KE9dld9p8qtITVZ07Kj4p/wAUd9l2jlaJ8Y0aoaMHFyl8LnWdO+OMIHpVTNZGuNEzHu2747fGDUxijvFwpwbzW0aT69YcKgAAAAAAAAAAAAAAAAAA3Mjl/YYMfFPGfwx8vTfzFI77Q9ClWACKAAAAAAgzmXjMYWn80cpYUxuzMTzjg9IyNq4W5jxaOVo+sLEqiAqAAAAAAAAAAAAAAAALOz41zlPP0luMPZv7yvn6S3EqwARQAAAAABS2rTeyuvwzE/b7rqttGf8Ax316esAwwGmQAAAAAAAAAAAAAAAFrZ37ynn6S22FkJ0zlPH7S3UqwARQAAAAABibStM5u0azpGmnHlwhtsHPTrnL+P2WCABWQAAAAAAAAAAAAAAAE+SiZzNJiJmItHZybyHJ03MtSI7on5pkrQAgAAAAAAMDNxP6m+sTGtp5xz4t9U2nTeylp7Y0mPmsGKArIAAAAAAAAAAAAAAADc2fffylOnD5LLN2PicL1/uj0/DSZaAAAAAAAAFLa193LafFMR8uK6ydr4m9jVr8MeqwUAFZAAAAAAAAABQAAAAAEmXxpwMWLR/1t5XH/UYMW005xprrowGnsfE4Xr/d9vwlGkAigAAAAAIM3mP02Frprx056MPExJxMSbTzmdWhti/GlfGft+Wa1EAAAAAAAAAAABAAAAAABNlMb2GPW3ZynwlCA9LE6wKWysSb5eYn+WdIXWWgAAAAFbaN5plLadI+YMrOYvtszaezlHhCAGkABAAAAAAAAAAAAAAAAAAGxsmNMtPW0+kLqts+m5k6ddZ+c6rLLQAAAArbRjXJ38p+sLKPMU38C8d9Zj6A88A0yAAAAAAAAAAAAAAAAAAOqV37xEc5nQpSb20iJmejVyGS9jO9b+L0FXaxu1iO6NH0GVAAAAAAefzWH7LMWjrrHhKJt57KfqK6xwtHLr0lj4mHOFbS0TEtRHAAgAAAAAAAAAAAAPsRvTpHGei9l9mzfjf3Y7o5/wChVGtd+2kRMz0X8vsybcbzpHdHP5tHBwK4NdKxEes+aRNMR4WDXBrpWIhICKAAAAAAAAOcTDjErpaImOroBmZjZnbSfKftLPxMOcO2lomJ6vRuMTDjFrpaImOq6jzo0cxszTjSdek/aVC9JpbSYmJ6qOQBAAAAAH2OMg+LeVyNsbjPu1+s+ELeSyG5EWvxt2R2R+ZX01cRYGXrgR7sce+eMz5pQRQAAAAAAAAAAAAAAABHjYNcaulo19Y80gDIzOzpw+Nfej6x+VF6VTzmRjHiZrwv9J8VlTGMOrVmlpieEw5VAABpbKy2vvz4V/LOrG9aIjnM6PRYVPZ4cVjlEaFWOgGVAAAAAAAAAAAAAAAAAAAAAAUdqZffw9+P4q8+sMh6WY1h57Hw/ZY1q90rEqMBUTZX9zh/1R6t8EqwARQAAAAAAAAAAAAAAAAAAAAABibS/eW8vSAWJVUBUf/Z"
                            alt=""
                          />
                        )}

                      </Menu.Button>
                      <div className="flex items-center truncate">
                        {isLoggedIn ? (
                          <span className="truncate ml-2 text-sm font-medium group-hover:text-gray-800">{user.firstName || ''}</span>
                        ) : (
                          <span className="truncate ml-2 text-sm font-medium group-hover:text-gray-800">Login</span>
                        )}

                      </div>
                    </div>

                    {isLoggedIn ? (
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >

                        <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

                          <Menu.Item>
                            <a
                              onClick={() => { history.push("/profile") }}
                              className='cursor-pointer hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700'
                            >
                              Thông tin
                            </a>
                          </Menu.Item>
                          <Menu.Item>
                            <a
                              href="#"
                              className='cursor-pointer hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700'
                            >
                              Cài đặt
                            </a>
                          </Menu.Item>
                          <Menu.Item>
                            <a
                              onClick={() => { history.push("/signin") }}
                              className=' cursor-pointer  hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700'
                              onClick={Logout}
                            >
                              Đăng xuất
                            </a>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>


                    ) : (
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >

                        <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

                          <Menu.Item>
                            <a
                              onClick={() => { history.push("/signup") }}
                              className='hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700'
                            >
                              Tạo tài khoản
                            </a>
                          </Menu.Item>
                          <Menu.Item>
                            <a
                              onClick={() => { history.push("/signin") }}
                              className=' hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700'
                            >
                              Đăng nhập
                            </a>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    )}
                  </Menu>

                </div>
              </div>
            </div>



            <div className="hidden md:grid grid-cols-12 gap-4 relative items-center justify-between h-16">
              <div className="col-span-1 hidden md:block">
                <div className="flex-shrink-0 flex items-center ">
                  <img
                    className="block lg:hidden h-8 w-auto cursor-pointer"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow" onClick={e => (history.push('/'))}
                  />
                  <img
                    className="hidden lg:block h-8 w-auto cursor-pointer"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow" onClick={e => (history.push('/'))}
                  />
                </div>
              </div>
              <div className="xl:col-span-9 sm:col-span-10 hidden md:block">
                <div className="hidden sm:block sm:ml-6">
                  <div className="grid grid-cols-12">
                    <div className="xl:col-span-7 sm:col-span-5">
                      <div className="pt-2 relative mx-auto text-gray-600">
                        <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full" type="search" name="search" placeholder="Search" />
                        <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
                          <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style={{ enableBackground: 'new 0 0 56.966 56.966' }} xmlSpace="preserve" width="512px" height="512px">
                            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="p-2 xl:col-span-3 sm:col-span-4">
                      <Button startIcon={<AssignmentIcon />}
                        onClick={() => {
                          goToOrderList()
                        }}
                      >
                        Theo dõi đơn hàng
                      </Button>
                    </div>
                    <div className="relative p-2 xl:col-span-2 sm:col-span-3">
                      <Button
                        startIcon={
                          <Badge badgeContent={countCart} color="primary">
                            <ShoppingCartIcon />
                          </Badge>
                        }
                        onClick={() => {
                          goToCart()
                        }}
                      >
                        Giỏ hàng
                      </Button>
                      {isCartAlert ? (
                        <div className="absolute z-50 w-64">
                          <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                            <div className="flex">
                              <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                              <div>
                                <p className="font-bold">Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span className="hidden"></span>
                      )}


                    </div>
                  </div>
                </div>
              </div>
              <div className="xl:col-span-2 sm:col-span-1 flex justify-end">
                <div className="hidden md:block">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0 ">
                    {isLoggedIn ? (
                      <span className="mr-2">{user.firstName || ''}</span>
                    ) : (
                      <span className="mr-2">User</span>
                    )}
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative">
                      <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          {(isLoggedIn && user.image != null) ? (
                            <img
                              className="h-8 w-8 rounded-full"
                              src={link + user.image}
                              alt=""
                            />) : (
                            <img
                              className="h-8 w-8 rounded-full"
                              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQHBg0QEBIPEA4QEBEQFRgQDRcQExAaFhUWFiATFRUYHSggGB4lGxgWITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NFQ0NDy0ZFRkrLSs3Ky0tLisrKzctNy0rNystLS0rKysrKy0rLSsrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwQFAgYBB//EADQQAQACAAMFBQcCBwEAAAAAAAABAgMEEQUSITFhQVFxgbETIlKRocHRFDQyQnKCkuHxJP/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A/TAGkAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAHVKTiW0iJmegOX2I1nSOM9F2mzL25zWv1lo5fLVy9eEce2Z5yauMzC2de8cdKx15/KE9dld9p8qtITVZ07Kj4p/wAUd9l2jlaJ8Y0aoaMHFyl8LnWdO+OMIHpVTNZGuNEzHu2747fGDUxijvFwpwbzW0aT69YcKgAAAAAAAAAAAAAAAAAA3Mjl/YYMfFPGfwx8vTfzFI77Q9ClWACKAAAAAAgzmXjMYWn80cpYUxuzMTzjg9IyNq4W5jxaOVo+sLEqiAqAAAAAAAAAAAAAAAALOz41zlPP0luMPZv7yvn6S3EqwARQAAAAABS2rTeyuvwzE/b7rqttGf8Ax316esAwwGmQAAAAAAAAAAAAAAAFrZ37ynn6S22FkJ0zlPH7S3UqwARQAAAAABibStM5u0azpGmnHlwhtsHPTrnL+P2WCABWQAAAAAAAAAAAAAAAE+SiZzNJiJmItHZybyHJ03MtSI7on5pkrQAgAAAAAAMDNxP6m+sTGtp5xz4t9U2nTeylp7Y0mPmsGKArIAAAAAAAAAAAAAAADc2fffylOnD5LLN2PicL1/uj0/DSZaAAAAAAAAFLa193LafFMR8uK6ydr4m9jVr8MeqwUAFZAAAAAAAAABQAAAAAEmXxpwMWLR/1t5XH/UYMW005xprrowGnsfE4Xr/d9vwlGkAigAAAAAIM3mP02Frprx056MPExJxMSbTzmdWhti/GlfGft+Wa1EAAAAAAAAAAABAAAAAABNlMb2GPW3ZynwlCA9LE6wKWysSb5eYn+WdIXWWgAAAAFbaN5plLadI+YMrOYvtszaezlHhCAGkABAAAAAAAAAAAAAAAAAAGxsmNMtPW0+kLqts+m5k6ddZ+c6rLLQAAAArbRjXJ38p+sLKPMU38C8d9Zj6A88A0yAAAAAAAAAAAAAAAAAAOqV37xEc5nQpSb20iJmejVyGS9jO9b+L0FXaxu1iO6NH0GVAAAAAAefzWH7LMWjrrHhKJt57KfqK6xwtHLr0lj4mHOFbS0TEtRHAAgAAAAAAAAAAAAPsRvTpHGei9l9mzfjf3Y7o5/wChVGtd+2kRMz0X8vsybcbzpHdHP5tHBwK4NdKxEes+aRNMR4WDXBrpWIhICKAAAAAAAAOcTDjErpaImOroBmZjZnbSfKftLPxMOcO2lomJ6vRuMTDjFrpaImOq6jzo0cxszTjSdek/aVC9JpbSYmJ6qOQBAAAAAH2OMg+LeVyNsbjPu1+s+ELeSyG5EWvxt2R2R+ZX01cRYGXrgR7sce+eMz5pQRQAAAAAAAAAAAAAAABHjYNcaulo19Y80gDIzOzpw+Nfej6x+VF6VTzmRjHiZrwv9J8VlTGMOrVmlpieEw5VAABpbKy2vvz4V/LOrG9aIjnM6PRYVPZ4cVjlEaFWOgGVAAAAAAAAAAAAAAAAAAAAAAUdqZffw9+P4q8+sMh6WY1h57Hw/ZY1q90rEqMBUTZX9zh/1R6t8EqwARQAAAAAAAAAAAAAAAAAAAAABibS/eW8vSAWJVUBUf/Z"
                              alt=""
                            />
                          )}

                        </Menu.Button>
                      </div>

                      {isLoggedIn ? (
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >

                          <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

                            <Menu.Item>
                              <a
                                onClick={() => { history.push("/profile") }}
                                className='cursor-pointer hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700'
                              >
                                Thông tin
                              </a>
                            </Menu.Item>
                            <Menu.Item>
                              <a
                                href="#"
                                className='cursor-pointer hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700'
                              >
                                Cài đặt
                              </a>
                            </Menu.Item>
                            <Menu.Item>
                              <a
                                onClick={() => { history.push("/signin") }}
                                className=' cursor-pointer  hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700'
                                onClick={Logout}
                              >
                                Đăng xuất
                              </a>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>


                      ) : (
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >

                          <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

                            <Menu.Item>
                              <a
                                onClick={() => { history.push("/signup") }}
                                className='hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700'
                              >
                                Tạo tài khoản
                              </a>
                            </Menu.Item>
                            <Menu.Item>
                              <a
                                onClick={() => { history.push("/signin") }}
                                className=' hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700'
                              >
                                Đăng nhập
                              </a>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      )}
                    </Menu>
                  </div>

                </div>
              </div>
            </div>

          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
function mapStateToProps(state) {
  const { isLoggedIn, user } = state.auth;
  return {
    isLoggedIn,
    user,
  };
}
export default connect(mapStateToProps)(Header);