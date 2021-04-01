import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import AssignmentIcon from '@material-ui/icons/Assignment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },

})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
    '& > *': {
      margin: theme.spacing(1),
      width: '8ch',
    },
  },
  
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  header: {
    width:'40rem',
  },
  input:{
    width:'30rem',
  },
  buttonsearch:{
    padding:'8px 8px'
  }
 

}));



function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px 
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  return (
    <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top && 'bg-white blur shadow-lg'}`}>
      <div className=" mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
              <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient cx="21.152%" cy="86.063%" fx="21.152%" fy="86.063%" r="79.941%" id="header-logo">
                    <stop stopColor="#4FD1C5" offset="0%" />
                    <stop stopColor="#81E6D9" offset="25.871%" />
                    <stop stopColor="#338CF5" offset="100%" />
                  </radialGradient>
                </defs>
                <rect width="32" height="32" rx="16" fill="url(#header-logo)" fillRule="nonzero" />
              </svg>
            </Link>
          </div>

          {/* Site navigation */}
          <nav className="flex">
            <form className={classes.header}>
              <TextField className={classes.input} size="small" id="outlined-basic" label="Search" variant="outlined" />
              <Button
                startIcon={<SearchIcon />}
                className={classes.buttonsearch}
              >
                Search
</Button>
            </form>

            <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li>
                <Button
                  startIcon={<AssignmentIcon />}
                >
                  Theo dõi đơn hàng
</Button>
              </li>
              <li>
                <Button
                  startIcon={ <Badge badgeContent={4} color="primary">
                  <ShoppingCartIcon/>
                </Badge>}
                >
                  Giỏ hàng
</Button>
              </li>
              <li>
                <div>
                  <Button

                    onClick={handleClick}
                    endIcon={<ExpandMoreIcon/>}
                  >
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
                      <ListItemIcon>
                        <ArrowForwardIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Đăng nhập" />
                    </StyledMenuItem>
                    <StyledMenuItem>
                      <ListItemIcon>
                        <PersonAddIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Đăng ký" />
                    </StyledMenuItem>

                  </StyledMenu>
                </div>
              </li>
            </ul>

          </nav>

        </div>
      </div>
    </header>
  );
}

export default Header;
