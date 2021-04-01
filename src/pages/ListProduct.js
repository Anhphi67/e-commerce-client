import React, { useState } from 'react';
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import Menu from '../partials/Menu';
import { GridList, GridListTile } from '@material-ui/core';
import tileData from '../pages/data.json';
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
import '../css/ListProduct.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Tooltip from '@material-ui/core/Tooltip';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

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
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
  ];

  const classes = useStyles();
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        <Menu />
        <div className="w-full flex mx-auto px-4 sm:px-6 ">
          <div className="w-1/4 h-auto mr-2 pt-10">
          </div>
          <div className="flex w-3/4 h-auto justify-between breakcrum pb-2">
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
            <div className="flex">
              <Typography className="font-bold pt-2 pr-1">
                Sắp xếp theo
                  </Typography>
              <Autocomplete
                id="combo-box-demo"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                style={{ width: 200 }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
              />
            </div>
          </div>

        </div>


        <section className="bg-white-to-b from-gray-100 to-white">
          <div className=" w-full flex mx-auto px-4 sm:px-6">
            <div className="w-1/4 h-auto mr-2 pt-10">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Chủ đề </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.detailAcc} >
                  <Typography>
                    Chủ đề 1
                  </Typography>
                  <Typography>
                    Chủ đề 2
                  </Typography>
                  <Typography>
                    Chủ đề 3
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>Giá</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.detailAcc}>
                  <Typography>
                    Từ 10,000-50,000
                  </Typography>
                  <Typography>
                    Từ 50,000-200,000
                  </Typography>
                  <Typography>
                    Từ 200,000-500,000
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography className={classes.heading}>Nhãn dán</Typography>
                </AccordionSummary>
              </Accordion>

            </div>
            <div className="w-3/4 h-auto ">
              <GridList cellHeight={360} className={classes.content} cols={3}>
                {tileData.map((tile) => (
                  <GridListTile key={tile.image} cols={tile.cols || 1}>
                    <div className="text-center">
                      <div className="flex">
                        {/* <Button
                          variant="outlined"
                          className="buttonpri"
                          startIcon={<KeyboardArrowLeftIcon style={{ fontSize: 35 }} />}
                        >
                      </Button> */}
                        <img className="imgproduct1" src={img1} alt={tile.title} />
                        <img className="imgproduct2" src={img2} alt={tile.title} />
                        {/* <Button
                          variant="outlined"
                          className="buttonnext"
                          startIcon={<KeyboardArrowRightIcon style={{ fontSize: 35 }}/>}
                        >
                      </Button> */}
                      </div>
                      <div><span>{tile.title}</span></div>
                      <div className="mt-5"><span className='font-bold text-red-600'>{tile.price} đ</span></div>
                      <div>
                        <Tooltip disableFocusListener disableTouchListener title={tile.Desc}>
                          <Button
                            variant="outlined"
                            className={classes.button}
                            startIcon={<AddShoppingCartIcon />}
                          >
                            Mua ngay
                      </Button>
                        </Tooltip>

                      </div>
                    </div>
                  </GridListTile>
                ))}
              </GridList>
              <div className={classes.root}>
                <Pagination count={10} page={page} onChange={handleChange} />
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

export default List;
