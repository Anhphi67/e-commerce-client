import React, { useState } from 'react';
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import Menu from '../partials/Menu';
import { GridList, GridListTile } from '@material-ui/core';
import tileData from '../pages/data2.json';
import img1 from '../images/truyen-thong-minh-duong.jpg';
import img2 from '../images/hinh-nen-bien-dep-cho-may-tinh-1.jpg';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Pagination from '@material-ui/lab/Pagination';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Tooltip from '@material-ui/core/Tooltip';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import '../css/DetailsProduct.css';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  '& > *': {
    marginTop: theme.spacing(2),
  },
  root: {
    height: 48,
    padding: '10px 30px',
  },
  content: {
    paddingTop: '1rem'
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
  detailAcc: {
    display: 'block !important',
    marginLeft: theme.spacing(2),

  },
  title: {


  }

}));


function List() {
 
  const classes = useStyles();
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        <Menu />
        <div className="w-full flex mx-auto px-4 sm:px-6 ">
         
          <div className="flex w-full h-auto justify-between breakcrum pb-2">
            <div className="pt-2 ">
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/">
                  Trang chủ
      </Link>
                <Link color="inherit" href="/getting-started/installation/" >
                  Tiêu đề
      </Link>
                <Typography color="textPrimary">Breadcrumb</Typography>
              </Breadcrumbs>
            </div>
          </div>
        </div>
        <section className="bg-white-to-b from-gray-100 to-white">
          <div className=" w-full flex mx-auto px-4 sm:px-6">
            <div className="w-1/2 h-auto mr-2 pt-10 borderright">
                <img className="imgproduct" src={img1}  />
                <div className='flex'>
                <GridList cellHeight={150} className={classes.content} cols={5}>
                {tileData.map((tile) => (
                  <GridListTile key={tile.image} cols={tile.cols || 1}>
                    <div className="text-center pb-4">
                      <div className="flex">
                        <img className="smallimage" src={img1} alt={tile.title} />
                      </div>
                    </div>
                  </GridListTile>
                ))}
              </GridList>
                </div>
            </div>
            <div className="w-1/2 h-auto ">
              
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

export default List;
