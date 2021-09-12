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
  useEffect(() => {
    const fetchData = async () => {
      instance.get(
        '/Product/GetUiList?Page=' + page + '&RowsPerPage=12&ProductCategoryId=' + id + '',
      ).then(res => {
        setList(res.data.result.results);
        setMaxPage((res.data.result.totalCount / 5) + 1)
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
        <div className="wrapper">
          <div className="d-lg-flex align-items-lg-center pt-2">
            <div className="form-inline d-flex align-items-center my-2 mr-lg-2 radio bg-light border"> <label className="options">Most Popular <input type="radio" name="radio" /> <span className="checkmark" /> </label> <label className="options">Cheapest <input type="radio" name="radio" defaultChecked /> <span className="checkmark" /> </label> </div>
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
                <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category">- Dưới 100.000đ</li>
                <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"> - Từ 100.000đ - 300.000đ </li>
                <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"> - Trên 300.000đ </li>
                <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"> - Chọn khoảng giá </li>
                <li>
                  <div className="flex justify-between items-center pt-2">
                  <NumberFormat
                      value={fromPrice}
                      className="w-5/12 flex items-center appearance-none h-8  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      thousandSeparator="."
                      decimalSeparator=","
                      onChange={event => { setfromPrice(event.target.value) }} 
                  />
                      <span> - </span>
                      <NumberFormat
                      value={toPrice}
                      className="w-5/12 flex items-center appearance-none h-8  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      thousandSeparator="."
                      decimalSeparator=","
                      onChange={event => { settoPrice(event.target.value) }} 
                  />
                  </div>
                  <div className="flex justify-center pt-2">
                    <button className="flex items-center bg-transparent h-8 hover:bg-blue-300 text-blue-500  hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      Áp dụng
                    </button>
                  </div>
                </li>
              </ul>
            </div>
            <div className="py-3 border-b border-gray-300">
              <h5 className="font-weight-bold">Dịch Vụ & Khuyến Mãi</h5>
              <form className="brand">
                <div className="form-inline d-flex align-items-center py-1"> <label className="tick">Đang giảm giá<input type="checkbox" /> <span className="check" /> </label> </div>
                <div className="form-inline d-flex align-items-center py-1"> <label className="tick">Hàng có sẵn <input type="checkbox" defaultChecked /> <span className="check" /> </label> </div>
                <div className="form-inline d-flex align-items-center py-1"> <label className="tick">Miễn phí vận chuyển <input type="checkbox" defaultChecked /> <span className="check" /> </label> </div>
              </form>
            </div>
            <div className="py-3">
              <h5 className="font-weight-bold">Đánh giá</h5>
              <form className="rating">
                <div className="form-inline d-flex align-items-center py-2"> <label className="tick"><span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <input type="checkbox" /> <span className="check" /> </label> </div>
                <div className="form-inline d-flex align-items-center py-2"> <label className="tick"> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="far fa-star px-1 text-muted" /> <input type="checkbox" /> <span className="check" /> </label> </div>
                <div className="form-inline d-flex align-items-center py-2"> <label className="tick"><span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <input type="checkbox" /> <span className="check" /> </label> </div>
                <div className="form-inline d-flex align-items-center py-2"> <label className="tick"><span className="fas fa-star" /> <span className="fas fa-star" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <input type="checkbox" /> <span className="check" /> </label> </div>
                <div className="form-inline d-flex align-items-center py-2"> <label className="tick"> <span className="fas fa-star" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <input type="checkbox" /> <span className="check" /> </label> </div>
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
                <ul className="list-group">
                  <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category">- Dưới 100.000đ</li>
                  <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"> - Từ 100.000đ - 300.000đ </li>
                  <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"> - Trên 300.000đ </li>
                  <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center category"> - Chọn khoảng giá </li>
                  <li>
                    <div className="flex justify-between items-center pt-2">
                    <NumberFormat
                      value={fromPrice}
                      className="w-5/12 flex items-center appearance-none h-8  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      thousandSeparator="."
                      decimalSeparator=","
                      onChange={event => { setfromPrice(event.target.value) }} 
                  />
                      <span> - </span>
                      <NumberFormat
                      value={toPrice}
                      className="w-5/12 flex items-center appearance-none h-8  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      thousandSeparator="."
                      decimalSeparator=","
                      onChange={event => { settoPrice(event.target.value) }} 
                  />
                    </div>
                    <div className="flex justify-center pt-2">
                      <button className="flex items-center bg-transparent h-8 hover:bg-blue-300 text-blue-500  hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Áp dụng
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="py-3  border-b border-gray-300">
                <h5 className="font-weight-bold">Dịch Vụ & Khuyến Mãi</h5>
                <form className="brand">
                  <div className="form-inline d-flex align-items-center py-1"> <label className="tick">Đang giảm giá <input type="checkbox" /> <span className="check" /> </label> </div>
                  <div className="form-inline d-flex align-items-center py-1"> <label className="tick">Hàng có sẵn <input type="checkbox" defaultChecked /> <span className="check" /> </label> </div>
                  <div className="form-inline d-flex align-items-center py-1"> <label className="tick">Miễn phí vận chuyển<input type="checkbox" defaultChecked /> <span className="check" /> </label> </div>
                </form>
              </div>
              <div className="py-3">
                <h5 className="font-weight-bold">Đánh giá</h5>
                <form className="rating">
                  <div className="form-inline d-flex align-items-center py-2"> <label className="tick"><span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <input type="checkbox" /> <span className="check" /> </label> </div>
                  <div className="form-inline d-flex align-items-center py-2"> <label className="tick"> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="far fa-star px-1 text-muted" /> <input type="checkbox" /> <span className="check" /> </label> </div>
                  <div className="form-inline d-flex align-items-center py-2"> <label className="tick"><span className="fas fa-star" /> <span className="fas fa-star" /> <span className="fas fa-star" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <input type="checkbox" /> <span className="check" /> </label> </div>
                  <div className="form-inline d-flex align-items-center py-2"> <label className="tick"><span className="fas fa-star" /> <span className="fas fa-star" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <input type="checkbox" /> <span className="check" /> </label> </div>
                  <div className="form-inline d-flex align-items-center py-2"> <label className="tick"> <span className="fas fa-star" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <span className="far fa-star px-1 text-muted" /> <input type="checkbox" /> <span className="check" /> </label> </div>
                </form>
              </div>
            </section> {/* Products Section */}
            <section id="products">
              <div className="container min-h-1/625 py-3">
                <div className="row">
                  {list.map((row) => (
                    <div className="col-lg-4 col-md-6 col-sm-10 offset-md-0 offset-sm-1 pt-md-0 pt-4" onClick={() => { history.push("/detail/id/" + row.id) }}>
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
              </div>
              <div className="mb-2">
                <Pagination count={10} page={page} onChange={handleChange} />
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
