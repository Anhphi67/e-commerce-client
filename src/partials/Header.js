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

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Header({ isLoggedIn, user, dispatch }) {
  let history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  var link = config.Image

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
    instance
      .get(
        "/Cart/GetCurrentCartItem?Page=1&RowsPerPage=100"
      )
      .then((response) => {
        setcountCart(response.data.result.totalCount);
        return;
      });
  }, []);

  function goToCart() {
    if (isLoggedIn) {
      history.push("/cart");
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

  function goToOrderList() {
    if (isLoggedIn) {
      history.push("/orderHis");
    } else {
      confirmAlert({
        title: 'Thông báo',
        message: 'Bạn cần đăng nhập để có thể xem danh sách đơn hàng ?',
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




  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2">
          <div className="grid grid-cols-12 gap-4 relative items-center justify-between h-16">
              <div className="col-span-1">
                <div className="flex-shrink-0 flex items-center">
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
              <div className="xl:col-span-9 sm:col-span-10">
              <div className="hidden sm:block sm:ml-6">
                  <div className="grid grid-cols-12">
                    <div className="xl:col-span-7 sm:col-span-5">
                      <div className="bg-white flex items-center rounded-full shadow-sm h-12">
                        <input className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none h-12" id="search" type="text" placeholder="Search" />
                        <div className="p-4">
                          <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-16 h-8 flex items-center justify-center">
                            Search
                          </button>
                        </div>
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
                    <div className="p-2 xl:col-span-2 sm:col-span-3">
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
                    </div>
                  </div>
                </div>
              </div>
              <div className="xl:col-span-2 sm:col-span-1 flex justify-end">
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
              {isLoggedIn? (
                <span className="mr-2">{user && user.firstname}</span>
              ):(
                <span className="mr-2">User</span>

              )}

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      {(isLoggedIn && user.image!=null) ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={link+user.image}
                        alt=""
                      />):(
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
                            onClick={()=>{history.push("/profile")}}
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
                        <Menu.Item c>
                          <a
                            onClick={()=>{history.push("/signin")}}
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
                             onClick={()=>{history.push("/signup")}}
                            className='hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700'
                          >
                            Tạo tài khoản
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            onClick={()=>{history.push("/signin")}}
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