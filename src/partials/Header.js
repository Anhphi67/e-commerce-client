import React, { useState, useEffect, Fragment } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import store from "../store/index";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import instance from "../https";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css



// const StyledMenu = withStyles({
//   paper: {
//     border: "1px solid #d3d4d5",
//   },
// })((props) => (
//   <Menu
//     elevation={0}
//     getContentAnchorEl={null}
//     anchorOrigin={{
//       vertical: "bottom",
//       horizontal: "center",
//     }}
//     transformOrigin={{
//       vertical: "top",
//       horizontal: "center",
//     }}
//     {...props}
//   />
// ));

// const StyledMenuItem = withStyles((theme) => ({
//   root: {
//     "&:focus": {
//       backgroundColor: theme.palette.primary.main,
//       "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
//         color: theme.palette.common.white,
//       },
//     },
//     "& > *": {
//       margin: theme.spacing(1),
//       width: "8ch",
//     },
//   },
// }))(MenuItem);

// const useStyles = makeStyles((theme) => ({
//   input: {
//     width: "30rem",
//   },
//   buttonsearch: {
//     padding: "8px 8px",
//   },
// }));

// function Header({ isLoggedIn, user, dispatch }) {
//   let history = useHistory();
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [anchorEl1, setAnchorEl1] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClickLogin = (event) => {
//     setAnchorEl1(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setAnchorEl1(null);
//   };
//   function Logout() {
//     dispatch(logout());
//   }
//   const [top, setTop] = useState(true);

//   // detect whether user has scrolled the page down by 10px
//   useEffect(() => {
//     const scrollHandler = () => {
//       window.pageYOffset > 10 ? setTop(false) : setTop(true);
//     };
//     window.addEventListener("scroll", scrollHandler);
//     return () => window.removeEventListener("scroll", scrollHandler);
//   }, [top]);


//   const [countCart, setcountCart] = React.useState(0);
//   useEffect(() => {
//     instance
//       .get(
//         "/Cart/GetCurrentCartItem?Page=1&RowsPerPage=100"
//       )
//       .then((response) => {
//         setcountCart(response.data.result.totalCount);
//         return;
//       });
//   }, []);

//   function goToCart(){
//     if(isLoggedIn){
//       history.push("/cart");
//     }else{
//       confirmAlert({
//         title: 'Thông báo',
//         message: 'Bạn cần đăng nhập để có thể xem giỏ hàng !',
//         buttons: [
//           {
//             label: 'Yes',
//             onClick: () => {
//               history.push("/signin")
//             }
//           },
//           {
//             label: 'No',
//           }
//         ]
//       });
//     }
//   }

//   function goToOrderList(){
//     if(isLoggedIn){
//       history.push("/orderHis");
//     }else{
//       confirmAlert({
//         title: 'Thông báo',
//         message: 'Bạn cần đăng nhập để có thể xem danh sách đơn hàng ?',
//         buttons: [
//           {
//             label: 'Yes',
//             onClick: () => {
//               history.push("/signin")
//             }
//           },
//           {
//             label: 'No',
//           }
//         ]
//       });
//     }
//   }





//   return (
//     <header
//       className={`fixed w-full z-30 md:bg-opacity-90 transition left-0 right-0 px-24 duration-300 ease-in-out ${
//         !top && "bg-white blur shadow-lg"
//       }`}
//     >
//       <div className=" mx-auto px-5 sm:px-6">
//         <div className="flex items-center justify-between h-16 md:h-20">
//           {/* Site branding */}
//           <div className="flex-shrink-0 mr-4">
//             {/* Logo */}
//             <Link to="/" className="block" aria-label="Cruip">
//               <svg
//                 className="w-8 h-8"
//                 viewBox="0 0 32 32"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <defs>
//                   <radialGradient
//                     cx="21.152%"
//                     cy="86.063%"
//                     fx="21.152%"
//                     fy="86.063%"
//                     r="79.941%"
//                     id="header-logo"
//                   >
//                     <stop stopColor="#4FD1C5" offset="0%" />
//                     <stop stopColor="#81E6D9" offset="25.871%" />
//                     <stop stopColor="#338CF5" offset="100%" />
//                   </radialGradient>
//                 </defs>
//                 <rect
//                   width="32"
//                   height="32"
//                   rx="16"
//                   fill="url(#header-logo)"
//                   fillRule="nonzero"
//                 />
//               </svg>
//             </Link>
//           </div>

//           <form className="lg:w-1/2 flex">
//             <TextField
//               className={classes.input}
//               className="flex-1"
//               size="small"
//               id="outlined-basic"
//               label="Search"
//               variant="outlined"
//             />
//             <Button startIcon={<SearchIcon />} className={classes.buttonsearch}>
//               Search
//             </Button>
//           </form>

//           {/* Site navigation */}
//           <nav className="flex">
//             <ul className="flex flex-grow justify-end flex-wrap items-center">
//               <li>
// <Button startIcon={<AssignmentIcon />}
// onClick={() => {
//   goToOrderList()
// }}
// >
//   Theo dõi đơn hàng
// </Button>
//               </li>
//               <li>

//           </li>
//               <li className="mx-6">
//                 <Button
//                   startIcon={
//                     <Badge badgeContent={countCart} color="primary">
//                       <ShoppingCartIcon />
//                     </Badge>
//                   }
//                   onClick={() => {
//                     goToCart()
//                   }}
//                 >
//                   Giỏ hàng
//                 </Button>
//               </li>
//               {isLoggedIn ? (
//                 <li>
//                   <div>
//                     <Button
//                       onClick={handleClickLogin}
//                       endIcon={<ExpandMoreIcon />}
//                     >
//                       {user && user.firstName + " " + user.lastName}
//                     </Button>
//                     <StyledMenu
//                       id="customized-menu"
//                       anchorEl={anchorEl1}
//                       keepMounted
//                       open={Boolean(anchorEl1)}
//                       onClose={handleClose}
//                     >
//                       <StyledMenuItem>
//                         <Link to={"/signin"} className="w-full">
//                           <ListItemText primary="Thông tin" />
//                         </Link>
//                       </StyledMenuItem>
//                       <StyledMenuItem>
//                         <Link
//                           to={"/signin"}
//                           onClick={Logout}
//                           className="w-full"
//                         >
//                           <ListItemText primary="Đăng xuất" />
//                         </Link>
//                       </StyledMenuItem>
//                     </StyledMenu>
//                   </div>
//                 </li>
//               ) : (
//                 <li
//                 >
//                   <div>
//                     <Button onClick={handleClick} endIcon={<ExpandMoreIcon />}>
//                       Tài khoản
//                     </Button>
//                     <StyledMenu
//                       id="customized-menu"
//                       anchorEl={anchorEl}
//                       keepMounted
//                       open={Boolean(anchorEl)}
//                       onClose={handleClose}
//                     >
//                       <StyledMenuItem>
//                         <Link to={"/signin"} className="w-full">
//                           {/* <ArrowForwardIcon fontSize="small" /> */}
//                           <ListItemText primary="Đăng nhập" />
//                         </Link>
//                       </StyledMenuItem>
//                       <StyledMenuItem>
//                         <Link to={"/signup"} className="w-full">
//                           {/* <PersonAddIcon fontSize="small" /> */}
//                           <ListItemText primary="Đăng ký" />
//                         </Link>
//                       </StyledMenuItem>
//                     </StyledMenu>
//                   </div>
//                 </li>
//               )}
//               <li>

//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }
// function mapStateToProps(state) {
//   const { isLoggedIn, user } = state.auth;
//   return {
//     isLoggedIn,
//     user,
//   };
// }
// export default connect(mapStateToProps)(Header);

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
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">

                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
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
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    <div className="">
                      <div className="bg-white flex items-center rounded-full shadow-sm h-12">
                        <input className="rounded-l-full w-128 py-4 px-6 text-gray-700 leading-tight focus:outline-none h-12" id="search" type="text" placeholder="Search" />
                        <div className="p-4">
                          <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-16 h-8 flex items-center justify-center">
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Button startIcon={<AssignmentIcon />}
                        onClick={() => {
                          goToOrderList()
                        }}
                      >
                        Theo dõi đơn hàng
                      </Button>
                    </div>
                    <div className="p-2">
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
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {isLoggedIn ? (
                <span>{user && user.lastName}</span>
              ):(
                <span>User</span>

              )}

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      {isLoggedIn ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                            href="/profile"
                            className='hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700'
                          >
                            Thông tin
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            href="#"
                            className='hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700'
                          >
                            Cài đặt
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            href="/signin"
                            className=' hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700'
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
                            href="/signup"
                            className='hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700'
                          >
                            Tạo tài khoản
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            href="/signin"
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