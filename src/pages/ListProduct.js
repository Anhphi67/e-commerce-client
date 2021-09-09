import React, { useState, useEffect } from 'react';
import Layout from "../partials/Layout";
import instance from "../https";
import MessageLogin from "../popup/MessageLogin.js";
import config from '../../src/config'
import { GridList, GridListTile } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../css/ListProduct.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { connect } from "react-redux";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useHistory,
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
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
  },
  detailAcc: {
    display: 'block !important',
    marginLeft: theme.spacing(2),

  },
  title: {


  }

}));


function List({ isLoggedIn, user, dispatch }) {
  const ref = React.useRef()
  let { id } = useParams();
  let history = useHistory();
  const [msg, setMsg] = React.useState({
    show:false,
    msg:'',
    title:''
  });
  const [page, setPage] = React.useState(1);
  const [maxpage, setMaxPage] = React.useState(1);
  const [list, setList] = React.useState([]);
  const [category, setCategory] = React.useState({});
  useEffect(() => {
    const fetchData = async () => {
      instance.get(
        '/Product/GetUiList?Page=' + page + '&RowsPerPage=12&ProductCategoryId=' + id + '',
      ).then(res => {
        setList(res.data.result.results);
        setMaxPage((res.data.result.totalCount / 5)+1)
      })
        .catch(err => {
          alert(err.response.data.errors)
        })
      instance.get(
        '/ProductCategory/' + id + '',
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
    if (isLoggedIn){
      var obj = {
        "quantity": 1,
        "productId": id
      }
      instance.post(
        '/Cart', obj
      ).then(res => {
        alert("Thêm sản phẩm vào giỏ hàng thành công")
      })
        .catch(err => {
          alert(err.response.data.errors)
        })
    }
    else{
      setMsg({
        show:true,
        msg:'Bạn chưa đăng nhập - Đăng nhập để có thể mua hàng ?',
        title:'Thông báo'
      })
    }
    
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

  var link =config.Image

  const classes = useStyles();



  return (
    <div className="px-24 flex flex-col min-h-screen overflow-hidden">
      <Layout>
        <main className="flex-grow">
          <div className="max-w-sm mx-auto gap-6 md:grid-cols-2 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none bg-gray-200 p-3">
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
          <div>
            <div className="pt-1 pb-4 md:pt-1 ">
              <div className="text-center ">
                <img className="relative w-full h-64 " src="https://intphcm.com/data/upload/banner-la-gi.jpg" alt="Testimonial 01" />
              </div>
          </div>
          </div>
          <div className="w-full flex mx-auto pt-2">
            <div className="w-1/4 h-auto mr-2 pt-4">
            </div>
            <div className="flex w-3/4 h-auto justify-between breakcrum pb-2 border-b">
              <div className="pt-2 font-bold">
              In sticker
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


          <section className="bg-white">
            <div className=" w-full flex mx-auto">
              <div className="w-1/4 h-auto mr-2 pt-10">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="font-bold text-xl">CHỦ ĐỀ </Typography>
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
                    <Typography className="font-bold text-xl">GIÁ</Typography>
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
                    <Typography className="font-bold text-xl">NHÃN DÁN</Typography>
                  </AccordionSummary>
                </Accordion>

              </div>
              <div className="w-3/4 h-auto ">
                <GridList cellHeight={360} className={classes.content + " min-h-1/2"} cols={4}>
                  {list.map((item) => (
                    <GridListTile key={item.id} cols={item.cols || 1}>
                      <div className="text-center">
                        {/* <div className="">
                          <div style={{ display: item.isProductSale ? "block" : "none" }} className="discount-label gray"> <span>-30%</span>
                          </div>
                         
                          <img className="imgproduct1" alt={item.name} src={link + item.avatarUrl} />
                        </div> */}
                         <div className="WrapImg w-full">
                                <img  className="relative flex flex-col items-center bg-white shadow-xl w-full image " alt={item.name} src={link + item.avatarUrl}  alt="Testimonial 01" />
                                <div className="overlay">
                                    <div className="text">
                                        <img className="relative flex flex-col items-center bg-white shadow-xl w-full image " src={link + item.imageUrl} alt="Testimonial 01" />
                                    </div>
                                </div>

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
                          <button onClick={e=>AddToCart(item.id)} className="outline-none bg-transparent hover:bg-red-500 font-semibold hover:text-white py-2 px-4 border border-yellow-1000 hover:border-transparent rounded w-full">
                                          Mua Ngay
                          </button>
                        </div>
                      </div>
                    </GridListTile>
                  ))}
                </GridList>
                <div className={classes.root}>
                  <Pagination count={maxpage} page={page} onChange={handleChange} />
                </div>
              </div>
            </div>
          </section>
          <div>
          <MessageLogin obj={msg} handleChange={()=>{setMsg({...msg,show:false})}} />
        </div>

        </main>
      </Layout>
    </div>

  );
}
function mapStateToProps(state) {
  const { isLoggedIn, user } = state.auth;
  return {
    isLoggedIn,
    user,
  };
}
export default connect(mapStateToProps)(List);
