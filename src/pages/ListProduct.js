import React, { useState, useEffect } from 'react';
import Layout from "../partials/Layout";
import instance from "../https";

import { GridList, GridListTile } from '@material-ui/core';
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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link
} from "react-router-dom";

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
  const ref = React.useRef()
  let { id } = useParams();
  const [page, setPage] = React.useState(1);
  const [list, setList] = React.useState([]);
  const [category, setCategory] = React.useState({});
  useEffect(() => {
    const fetchData = async () => {
      instance.get(
        'https://localhost:44377/api/Product/GetUiList?Page=' + page + '&RowsPerPage=12&ProductCategoryId=' + id + '',
      ).then(res => {
        setList(res.data.result.results);
      })
        .catch(err => {
          alert(err.response.data.errors)
        })
      instance.get(
        'https://localhost:44377/api/ProductCategory/' + id + '',
      ).then(res => {
        setCategory(res.data);
      })
        .catch(err => {
          alert(err.response.data.errors)
        })
    };
    fetchData();
  }, [id, page]);

  function AddToCart(id) {
    var obj = {
      "quantity": 1,
      "productId": id
    }
    instance.post(
      'https://localhost:44377/api/Cart', obj
    ).then(res => {
      alert("Thêm sản phẩm vào giỏ hàng thành công")
    })
      .catch(err => {
        alert(err.response.data.errors)
      })
  }
  const handleChange = (event, value) => {
    setPage(value);
  };
  const top100Films = [
    { title: 'Theo giá', year: 1994 },
    { title: 'Ngày tạo', year: 1972 },
    { title: 'Theo Tên', year: 1974 },
  ];
  const formatter = new Intl.NumberFormat({
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  })

  var link = "https://localhost:44377/images/"

  const classes = useStyles();



  return (
    <div className="px-24 flex flex-col min-h-screen overflow-hidden">
      <Layout>
        <main className="flex-grow">
          <div className="w-full flex mx-auto px-4 sm:px-6">
            <div className="w-1/4 h-auto mr-2 pt-10">
            </div>
            <div className="flex w-3/4 h-auto justify-between breakcrum pb-2">
              <div className="pt-2 ">
                <Breadcrumbs aria-label="breadcrumb">
                  <Link color="inherit" to={"/"}>
                    Trang chủ
      </Link>
                  <Link color="inherit" to={"/list/id/" + category.id} >
                    {
                      category.name
                    }
                  </Link>
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
                  renderInput={(params) => <TextField {...params} size="small" variant="outlined" />}
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
                <GridList cellHeight={360} className={classes.content} cols={4}>
                  {list.map((item) => (
                    <GridListTile key={item.id} cols={item.cols || 1}>
                      <div className="text-center">
                        <div className="">
                          <div style={{ display: item.isProductSale ? "block" : "none" }} className="discount-label gray"> <span>-30%</span>
                          </div>
                          {/* <img className="imgproduct1" src={img1} alt={item.title} /> */}
                          <img className="imgproduct1" alt={item.name} src={link + item.avatarUrl} />
                        </div>
                        <div className="elipisis pt-2">
                          <Link
                            to={'/detail/id/' + item.id} >
                            {item.name}
                          </Link>
                        </div>

                        <div><span className='font-bold text-red-600'>
                          {formatter.format(item.oldPrice)} đ
                        </span>
                        </div>
                        <div>
                          <Tooltip disableFocusListener disableTouchListener title={item.name}>
                            <Button
                              variant="outlined"
                              className={classes.button}
                              startIcon={<AddShoppingCartIcon />}
                              onClick={event => AddToCart(item.id)}
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
      </Layout>
    </div>

  );
}

export default List;
