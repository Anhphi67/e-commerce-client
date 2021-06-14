import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
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
import axios from "axios";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
    "& > *": {
      margin: theme.spacing(1),
      width: "8ch",
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  input: {
    width: "30rem",
  },
  buttonsearch: {
    padding: "8px 8px",
  },
}));

function Header({ isLoggedIn, user, dispatch }) {
  let history = useHistory();
  const state = store.getState();
  const classes = useStyles();
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

  const instance = axios.create({
    baseURL: "https://localhost:44377/api/",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  const [countCart, setcountCart] = React.useState(0);
  useEffect(() => {
    instance
      .get(
        "https://localhost:44377/api/Cart/GetCurrentCartItem?Page=1&RowsPerPage=100"
      )
      .then((response) => {
        setcountCart(response.data.result.totalCount);
        return;
      });
  }, []);

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition left-0 right-0 px-24 duration-300 ease-in-out ${
        !top && "bg-white blur shadow-lg"
      }`}
    >
      <div className=" mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
              <svg
                className="w-8 h-8"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient
                    cx="21.152%"
                    cy="86.063%"
                    fx="21.152%"
                    fy="86.063%"
                    r="79.941%"
                    id="header-logo"
                  >
                    <stop stopColor="#4FD1C5" offset="0%" />
                    <stop stopColor="#81E6D9" offset="25.871%" />
                    <stop stopColor="#338CF5" offset="100%" />
                  </radialGradient>
                </defs>
                <rect
                  width="32"
                  height="32"
                  rx="16"
                  fill="url(#header-logo)"
                  fillRule="nonzero"
                />
              </svg>
            </Link>
          </div>
          <form className="lg:w-1/2 flex">
            <TextField
              className={classes.input}
              className="flex-1"
              size="small"
              id="outlined-basic"
              label="Search"
              variant="outlined"
            />
            <Button startIcon={<SearchIcon />} className={classes.buttonsearch}>
              Search
            </Button>
          </form>

          {/* Site navigation */}
          <nav className="flex">
            <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li>
                <Button startIcon={<AssignmentIcon />}>
                  Theo dõi đơn hàng
                </Button>
              </li>
              <li className="mx-6">
                <Button
                  startIcon={
                    <Badge badgeContent={countCart} color="primary">
                      <ShoppingCartIcon />
                    </Badge>
                  }
                  onClick={() => {
                    history.push("/cart");
                  }}
                >
                  Giỏ hàng
                </Button>
              </li>
              {isLoggedIn ? (
                <li>
                  <div>
                    <Button
                      onClick={handleClickLogin}
                      endIcon={<ExpandMoreIcon />}
                    >
                      {user && user.firstName + " " + user.lastName}
                    </Button>
                    <StyledMenu
                      id="customized-menu"
                      anchorEl={anchorEl1}
                      keepMounted
                      open={Boolean(anchorEl1)}
                      onClose={handleClose}
                    >
                      <StyledMenuItem>
                        <Link to={"/signin"} className="w-full">
                          <ListItemText primary="Thông tin" />
                        </Link>
                      </StyledMenuItem>
                      <StyledMenuItem>
                        <Link
                          to={"/signin"}
                          onClick={Logout}
                          className="w-full"
                        >
                          <ListItemText primary="Đăng xuất" />
                        </Link>
                      </StyledMenuItem>
                    </StyledMenu>
                  </div>
                </li>
              ) : (
                <li
                >
                  <div>
                    <Button onClick={handleClick} endIcon={<ExpandMoreIcon />}>
                      Tài khoản
                    </Button>
                    <StyledMenu
                      id="customized-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <StyledMenuItem>
                        <Link to={"/signin"} className="w-full">
                          {/* <ArrowForwardIcon fontSize="small" /> */}
                          <ListItemText primary="Đăng nhập" />
                        </Link>
                      </StyledMenuItem>
                      <StyledMenuItem>
                        <Link to={"/signup"} className="w-full">
                          {/* <PersonAddIcon fontSize="small" /> */}
                          <ListItemText primary="Đăng ký" />
                        </Link>
                      </StyledMenuItem>
                    </StyledMenu>
                  </div>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
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