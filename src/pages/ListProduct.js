import React, { useState, useEffect } from 'react';
import Layout from "../partials/Layout";
import instance from "../https";
import config from '../../src/config'
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Pagination from '@material-ui/lab/Pagination';

import { connect } from "react-redux";
import NumberFormat from 'react-number-format';
import '../css/ListProduct.css'


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
    show: false,
    msg: '',
    title: ''
  });
  const [page, setPage] = React.useState(1);
  const [maxpage, setMaxPage] = React.useState(1);
  const [fromPrice, setfromPrice] = React.useState(0);
  const [toPrice, settoPrice] = React.useState(0);
  const [list, setList] = React.useState([]);
  const [category, setCategory] = React.useState({});
  const [isCheap, setisCheap] = React.useState(false);
  const [isSale, setIsSale] = React.useState(false);
  const [isFreeShip, setIsFreeShip] = React.useState(false);
  const [isOutStock, setIsOutStock] = React.useState(false);
  const [ratingFillter, setRatingFillter] = React.useState(5);
  useEffect(() => {
    const fetchData = async () => {
      LoadProduct()
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
  }, [id, page, isCheap,isSale,isFreeShip,ratingFillter]);

  function LoadProduct() {
    instance.get(
      '/Product/GetUiList?Page=' + page + '&RowsPerPage=12&ProductCategoryId=' + id + '&fromPrice=' + fromPrice + '&toPrice=' + toPrice + '&isCheap=' + isCheap + '&RatingNumber='+ratingFillter+'&isFreeShip='+isFreeShip+'&isSale='+isSale+'',
    ).then(res => {
      setList(res.data.result.results);
      setMaxPage((res.data.result.totalCount / 5) + 1)
    })
      .catch(err => {
        alert(err.response.data.errors)
      })
  }
  function AddToCart(id) {
    if (isLoggedIn) {
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
    else {
      setMsg({
        show: true,
        msg: 'Bạn chưa đăng nhập - Đăng nhập để có thể mua hàng ?',
        title: 'Thông báo'
      })
    }

  }
  const handleChange = (event, value) => {
    setPage(value);
  };
  const formatter = new Intl.NumberFormat({
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  })

  var link = config.Image

  const classes = useStyles();



  return (
    <Layout>
      <main className="flex-grow">
        <div className="max-w-sm mx-auto gap-6 md:grid-cols-2 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none bg-gray-200 p-3">
          <Breadcrumbs aria-label="breadcrumb" className="uppercase">
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
        <div className="wrapper">
          <div className="d-lg-flex align-items-lg-center pt-2">
            <div className="form-inline d-flex align-items-center my-2 mr-lg-2 radio bg-light border"> <label className="options">Most Popular <input type="radio" name="radio" checked={!isCheap} onClick={() => { setisCheap(false) }} /> <span className="checkmark" /> </label> <label className="options">Cheapest <input type="radio" name="radio" checked={isCheap} onClick={() => { setisCheap(true) }} /> <span className="checkmark" /> </label> </div>
          </div>
          <div id="mobile-filter">
            {/* <div className="py-3">
                  <h5 className="font-weight-bold">Categories</h5>
                  <ul className="list-group">
                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"> vegetables <span className="badge badge-primary badge-pill">328</span> </li>
                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"> Fruits <span className="badge badge-primary badge-pill">112</span> </li>
                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"> Kitchen Accessories <span className="badge badge-primary badge-pill">32</span> </li>
                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"> Chefs Tips <span className="badge badge-primary badge-pill">48</span> </li>
                  </ul>
                </div> */}
            <div className="py-3 border-b border-gray-300">
              <h5 className="font-weight-bold">Giá</h5>
              <ul className="list-group">
                <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category bg-gray-100 hover:bg-gray-200" onClick={() => { setfromPrice(0); settoPrice(100000) }} >- Dưới 100.000đ</li>
                <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category bg-gray-100 hover:bg-gray-200" onClick={() => { setfromPrice(100000); settoPrice(300000) }} > - Từ 100.000đ - 300.000đ </li>
                <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category bg-gray-100 hover:bg-gray-200" onClick={() => { setfromPrice(300000); settoPrice(10000000) }} > - Trên 300.000đ </li>
                <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category bg-gray-100 hover:bg-gray-200" > - Chọn khoảng giá </li>
                <li>
                  <div className="flex justify-between items-center pt-2">
                    <NumberFormat
                      value={fromPrice}
                      className="w-5/12 flex items-center appearance-none h-8  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      thousandSeparator="."
                      decimalSeparator=","
                      onChange={event => { setfromPrice(event.target.value.replace(".","")) }}
                    />
                    <span> - </span>
                    <NumberFormat
                      value={toPrice}
                      className="w-5/12 flex items-center appearance-none h-8  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      thousandSeparator="."
                      decimalSeparator=","
                      onChange={event => { settoPrice(event.target.value.replace(".","")) }}
                    />
                  </div>
                  <div className="flex justify-center pt-2">
                    <button onClick={() => { LoadProduct() }} className="flex items-center bg-transparent h-8 hover:bg-blue-300 text-blue-500  hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      Áp dụng
                    </button>
                  </div>
                </li>
              </ul>
            </div>
            <div className="py-3 border-b border-gray-300">
              <h5 className="font-weight-bold">Dịch Vụ & Khuyến Mãi</h5>
              <form className="brand">
                <div className="form-inline d-flex align-items-center py-1"> <label className="tick">Đang giảm giá<input type="checkbox" value={isSale} onChange={() => setIsSale(!isSale)} /> <span className="check" /> </label> </div>
                <div className="form-inline d-flex align-items-center py-1"> <label className="tick">Hàng có sẵn <input type="checkbox" value={!isOutStock} onChange={() => setIsOutStock(!isOutStock)} /> <span className="check" /> </label> </div>
                <div className="form-inline d-flex align-items-center py-1"> <label className="tick">Miễn phí vận chuyển <input type="checkbox" value={!isFreeShip} onChange={() => setIsFreeShip(!isFreeShip)} /> <span className="check" /> </label> </div>
              </form>
            </div>
            <div className="py-3">
              <h5 className="font-weight-bold">Đánh giá</h5>
              <form className="rating">
                  <div className="form-inline d-flex align-items-center py-2"> <label className="tick"><span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <input type="checkbox" checked={ratingFillter==5} onClick={()=>{setRatingFillter(5)}} /> <span className="check" /> </label> </div>
                  <div className="form-inline d-flex align-items-center py-2"> <label className="tick"> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="far fa-star px-1 text-muted" /> <input type="checkbox" checked={ratingFillter==4}  onClick={()=>{setRatingFillter(4)}} /> <span className="check" /> </label> </div>
                  <div className="form-inline d-flex align-items-center py-2"> <label className="tick"><span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <input type="checkbox" checked={ratingFillter==3}  onClick={()=>{setRatingFillter(3)}}  /> <span className="check" /> </label> </div>
                  <div className="form-inline d-flex align-items-center py-2"> <label className="tick"><span className="fas fa-star" /> <span className="fas fa-star" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <input type="checkbox" checked={ratingFillter==2}  onClick={()=>{setRatingFillter(2)}}  /> <span className="check" /> </label> </div>
                  <div className="form-inline d-flex align-items-center py-2"> <label className="tick"> <span className="fas fa-star" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <input type="checkbox" checked={ratingFillter==1} onClick={()=>{setRatingFillter(1)}}  /> <span className="check" /> </label> </div>
              </form>
            </div>
          </div>
          <div className="content py-md-0 py-3">
            <section id="sidebar">
              {/* <div className="py-3">
                    <h5 className="font-weight-bold">Categories</h5>
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"> vegetables <span className="badge badge-primary badge-pill">328</span> </li>
                      <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"> Fruits <span className="badge badge-primary badge-pill">112</span> </li>
                      <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"> Kitchen Accessories <span className="badge badge-primary badge-pill">32</span> </li>
                      <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"> Chefs Tips <span className="badge badge-primary badge-pill">48</span> </li>
                    </ul>
                  </div> */}
              <div className="py-3 border-b border-gray-300">
                <h5 className="font-weight-bold">Giá</h5>
                <ul className="list-group ">
                  <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category bg-gray-100 hover:bg-gray-200" onClick={() => { setfromPrice(0); settoPrice(100000) }} >- Dưới 100.000đ</li>
                  <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category bg-gray-100 hover:bg-gray-200" onClick={() => { setfromPrice(100000); settoPrice(300000) }} > - Từ 100.000đ - 300.000đ </li>
                  <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category bg-gray-100 hover:bg-gray-200" onClick={() => { setfromPrice(300000); settoPrice(10000000) }} > - Trên 300.000đ </li>
                  <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category bg-gray-100 hover:bg-gray-200"> - Chọn khoảng giá </li>
                  <li>
                    <div className="flex justify-between items-center pt-2">
                      <NumberFormat
                        value={fromPrice}
                        className="w-5/12 flex items-center appearance-none h-8  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        thousandSeparator="."
                        decimalSeparator=","
                        onChange={event => { setfromPrice(event.target.value.replace(".","")) }}
                      />
                      <span> - </span>
                      <NumberFormat
                        value={toPrice}
                        className="w-5/12 flex items-center appearance-none h-8  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        thousandSeparator="."
                        decimalSeparator=","
                        onChange={event => { settoPrice(event.target.value.replace(".","")) }}
                      />
                    </div>
                    <div className="flex justify-center pt-2">
                      <button onClick={() => { LoadProduct() }} className="flex items-center bg-transparent h-8 hover:bg-blue-300 text-blue-500  hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Áp dụng
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="py-3  border-b border-gray-300">
                <h5 className="font-weight-bold">Dịch Vụ & Khuyến Mãi</h5>
                <form className="brand">
                  <div className="form-inline d-flex align-items-center py-1"> <label className="tick">Đang giảm giá <input type="checkbox" value={isSale} onChange={() => setIsSale(!isSale)} /> <span className="check" /> </label> </div>
                  <div className="form-inline d-flex align-items-center py-1"> <label className="tick">Hàng có sẵn <input type="checkbox" value={!isOutStock} onChange={() => setIsOutStock(!isOutStock)} /> <span className="check" /> </label> </div>
                  <div className="form-inline d-flex align-items-center py-1"> <label className="tick">Miễn phí vận chuyển<input type="checkbox" value={!isFreeShip} onChange={() => setIsFreeShip(!isFreeShip)} /> <span className="check" /> </label> </div>
                </form>
              </div>
              <div className="py-3">
                <h5 className="font-weight-bold">Đánh giá</h5>
                <form className="rating">
                  <div className="form-inline d-flex align-items-center py-2"> <label className="tick"><span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <input type="checkbox" checked={ratingFillter==5} onClick={()=>{setRatingFillter(5)}} /> <span className="check" /> </label> </div>
                  <div className="form-inline d-flex align-items-center py-2"> <label className="tick"> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="far fa-star px-1 text-muted" /> <input type="checkbox" checked={ratingFillter==4}  onClick={()=>{setRatingFillter(4)}} /> <span className="check" /> </label> </div>
                  <div className="form-inline d-flex align-items-center py-2"> <label className="tick"><span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <input type="checkbox" checked={ratingFillter==3}  onClick={()=>{setRatingFillter(3)}}  /> <span className="check" /> </label> </div>
                  <div className="form-inline d-flex align-items-center py-2"> <label className="tick"><span className="fas fa-star" /> <span className="fas fa-star" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <input type="checkbox" checked={ratingFillter==2}  onClick={()=>{setRatingFillter(2)}}  /> <span className="check" /> </label> </div>
                  <div className="form-inline d-flex align-items-center py-2"> <label className="tick"> <span className="fas fa-star" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <input type="checkbox" checked={ratingFillter==1} onClick={()=>{setRatingFillter(1)}}  /> <span className="check" /> </label> </div>
              </form>
              </div>
            </section> {/* Products Section */}
            <section id="products">
              {/* <div className="container min-h-1/625 py-3">
                <div className="row">
                  {list.map((row) => (
                    <div key={row.id} className="col-lg-4 col-md-6 col-sm-10 offset-md-0 offset-sm-1 pt-md-0 pt-4" onClick={() => { history.push("/detail/id/" + row.id) }}>
                      <div className="card"> <img className="card-img-top" src={link + row.avatarUrl} />
                        <div className="card-body">
                          <h6 className="font-weight-bold pt-1">{row.name}</h6>
                          <div className="text-muted description">Space for small product description</div>
                          <div className="d-flex align-items-center product">
                            <span className="fas fa-star text-#fb0" />
                            <span className="fas fa-star text-#fb0" />
                            <span className="fas fa-star text-#fb0" />
                            <span className="fas fa-star text-#fb0" />
                            <span className="far fa-star" />
                          </div>
                          <div className="d-flex align-items-center justify-content-between pt-3">
                            <div className="d-flex flex-column">
                              <div className="h6 font-weight-bold text-orange-500">{formatter.format(row.retailPrice)} đ</div>
                              <div className="text-muted rebate line-through">{formatter.format(row.oldPrice)} đ</div>
                            </div>
                            <div className="btn btn-primary">Buy now</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
              <div className="container mx-auto min-h-1/625">
                <div className="flex flex-wrap -mx-4">
                  {list.map((row) => (

                    <div key={row.id} className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4 cursor-pointer" onClick={() => { history.push("/detail/id/" + row.id) }}>
                      <a className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                        <div className="relative pb-48 overflow-hidden">
                          <img className="absolute inset-0 h-full w-full object-cover" src={link + row.avatarUrl} alt="" />
                        </div>
                        <div className="p-4">
                          <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">Highlight</span>
                          <h2 className="mt-2 mb-2  font-bold">{row.name}</h2>
                          <p className="text-sm"> {row.description}</p>
                          <div className="mt-3 flex items-center">
                            <span className="font-bold text-xl">{formatter.format(row.retailPrice)} <u className="text-xl text-black">đ</u></span>
                          </div>
                          <div className="text-muted rebate line-through">{formatter.format(row.oldPrice)} <u className="text-muted rebate line-through">đ</u></div>
                        </div>
                        <div className="p-4 border-t border-b text-xs text-gray-700">
                          <span className="flex items-center mb-1">
                            <i className="far fa-clock fa-fw mr-2 text-gray-900" /> 3 days
                          </span>
                          <span className="flex items-center">
                            <i className="fas fa-shipping-fast fa-fw text-gray-900 mr-2" /> Giao hàng toàn quốc
                          </span>
                        </div>
                        <div className="p-4 flex items-center text-sm text-gray-600">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-yellow-500"><path fill="#ffbb00" d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" /></svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-yellow-500"><path fill="#ffbb00" d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" /></svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-yellow-500"><path fill="#ffbb00" d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" /></svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-yellow-500"><path fill="#ffbb00" d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" /></svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-gray-400"><path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" /></svg><span className="ml-2">Đã bán 34</span></div>
                      </a>
                    </div>
                  ))}

                </div>
              </div>
              <div className="mb-2">
                <Pagination count={maxpage} page={page} onChange={handleChange} />
              </div>
            </section>
          </div>
        </div>
      </main>
    </Layout>
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
