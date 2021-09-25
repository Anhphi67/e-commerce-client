import React, { useEffect } from 'react';
import config from '../../src/config'
import instance from "../https";
import Menu from '../partials/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NumberFormat from 'react-number-format';
import '../css/DetailsProduct.css';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Layout from "../partials/Layout";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// Button
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
//
//Icon
import FeedbackIcon from '@material-ui/icons/Feedback';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import SendIcon from '@material-ui/icons/Send';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


//
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams, useHistory,
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
  display: 'flex',
  flexDirection: 'column',
  '& > *': {
    marginBottom: theme.spacing(2),
  },
  '& .MuiBadge-root': {
    marginRight: theme.spacing(4),
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <span>{children}</span>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const formatter = new Intl.NumberFormat({
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0
})

function List({ isLoggedIn, user, dispatch }) {
  let history = useHistory();
  const [msg, setMsg] = React.useState({
    show: false,
    msg: '',
    title: ''
  });
  //get data
  let { id } = useParams();
  const [detail, setDetail] = React.useState([]);
  const [imgUrl, setimgUrl] = React.useState("");
  useEffect(() => {
    instance.get(
      '/Product/GetDetail?id=' + id + '',
    ).then(result => {
      setDetail(result.data.result);
      setParent(result.data.result.productCategory.id)
      setGrandBr(result.data.result.productCategory.parentCategory.id)
      setimgUrl(config.Image + result.data.result.avatarUrl)
      setdtlImage(result.data.result.imageUrl.split(","))
    });




  }, []);
  //
  const [dtlImage, setdtlImage] = React.useState([]);
  const [grandBr, setGrandBr] = React.useState(1);
  const [parent, setParent] = React.useState(1);
  const [count, setCount] = React.useState(1);
  const [value, setValue] = React.useState(0);
  const [rate, setRate] = React.useState(2);
  const [raq, setRaq] = React.useState(true);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  function AddToCart(id) {
    if (isLoggedIn) {
      var obj = {
        "quantity": count,
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
      confirmAlert({
        title: 'Thông báo',
        message: 'Bạn chưa đăng nhập - Đăng nhập để có thể mua hàng ?',
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
    <div>
      <Layout>
        <main className="flex-grow">
          <div className="w-full flex mx-auto px-4 sm:px-6 ">

            <div className="flex w-full h-auto justify-between breakcrum pb-2">
              <div className="pt-2 ">
                <Breadcrumbs aria-label="breadcrumb" className="uppercase">
                  <Link color="inherit" to="/">
                    Trang chủ
                  </Link>
                  <Link color="inherit" to="/" >
                    {detail.productCategory && detail.productCategory && detail.productCategory.parentCategory.name}
                  </Link>
                  <Link color="inherit" to={"/list/id/" + parent} >
                    {detail.productCategory && detail.productCategory.name}
                  </Link>
                  <Typography color="textPrimary">{detail.name}</Typography>
                </Breadcrumbs>
              </div>
            </div>
          </div>
          <section className="bg-white-to-b from-gray-100 to-white">
            <div className="w-full md:flex mx-auto px-4 sm:px-6">
              <div className="md:w-1/2 sm:full h-auto mr-2 pt-10">
                <div className="w-11/12 m-auto h-3/4">
                  <img className="m-auto w-full h-full" alt={detail.name} src={imgUrl} />
                </div>
                <div className='relative w-full h-32 leading-4 p-1 mt-3' >
                  {dtlImage.map((item)=>(
                    <div key={item} className="inline-block w-1/5 box-border p-1 hover:border-red-500 border rounded-none border-white" onClick={() => { setimgUrl(config.Image+item) }}>
                    <div className="relative">
                      <div className="relative">
                        <div className="w-full  bg-1/2">
                          <img className="w-full h-full min-h-1/115" alt={""} src={config.Image+item} />
                        </div>
                      </div>
                    </div>
                  </div>
                  ))}
                  
                  <button className="bg-btnDtl-100 absolute top-2/5 left-5 hover:bg-gray-400 text-white font-bold py-2 px-1 rounded inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="bg-btnDtl-100 absolute top-2/5 right-5 hover:bg-gray-400 text-white font-bold py-2 px-1 rounded inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 sm:full h-auto ">
                <span className="pt-8 font-bold text-xl" >{detail.name}</span>
                <div className=" text-red-600 mt-2">
                    <span className="mt-2 mb-2 font-bold text-lg font-sans"> {formatter.format(count * detail.oldPrice)} VNĐ</span>
                </div>
                <div className="flex items-center mt-2 mb-2">
                  {/* <ButtonGroup  >
                    <Button
                      aria-label="reduce"
                      onClick={() => {
                        setCount(Math.max(count - 1, 0));
                      }}
                    >
                      <RemoveIcon fontSize="small" />
                    </Button>
                    <TextField id="outlined-basic" color="secondary" className="w-12" size="small" value={count} variant="outlined" />
                    <Button
                      aria-label="increase"
                      onClick={() => {
                        setCount(count + 1);
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </Button>

                  </ButtonGroup> */}

                  <div className="flex">
                    <button className="text-base  rounded-r-none  hover:scale-110 focus:outline-none items-center flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-teal-700 hover:text-teal-100 
        bg-teal-100 
        text-teal-700 
        border duration-200 ease-in-out 
        border-teal-600 transition"
                      onClick={() => {
                        setCount(count - 1);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <input className="appearance-none border rounded-none w-12 py-2 text-center text-gray-700 leading-tight" onChange={(event) => { setCount(event.target.value) }} type="text" value={count} />
                    <button className="text-base  rounded-l-none items-center hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-teal-700 hover:text-teal-100 
        bg-teal-100 
        text-teal-700 
        border duration-200 ease-in-out 
        border-teal-600 transition"
                      onClick={() => {
                        setCount(count + 1);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <Button
                    variant="outlined"
                    className={classes.button}
                    startIcon={<AddShoppingCartIcon />}
                    onClick={event => AddToCart(detail.id)}
                  >
                    Mua ngay
                  </Button>


                </div>
                <div className="grid col-end-1">
                  <div className="flex items-center">
                    <MyLocationIcon fontSize="large" className="pr-2" />
                    <span>Giao hàng online toàn quốc</span>
                  </div>
                  <div className="flex items-center">
                    <MenuBookIcon fontSize="large" className="pr-2" />
                    <span>Chính sách membership, mua nhiều lợi nhiều</span>
                  </div>
                  <div className="flex items-center">
                    <LocalShippingIcon fontSize="large" className="pr-2" />
                    <span>Giao nhanh TP HCM 2, 4 giờ qua đối tác</span>
                  </div>
                  <div className="flex items-center">
                    <AssignmentIcon fontSize="large" className="pr-2" />
                    <span>Có đặt in theo yêu cầu, đăng kí ngay</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab className="font-bold" label="Chi tiết" {...a11yProps(0)} />
                    <Tab className="font-bold" label="Giao hàng và thanh toán" {...a11yProps(1)} />
                    <Tab className="font-bold" label="Đánh giá" {...a11yProps(2)} />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    <ul>
                      <li>Chất liệu: decal Vinyl cán màn nhám (Matte)</li>
                      <li>Mực in: cao cấp an toàn cho sức khỏe cho màu in sắc nét, rực rỡ.</li>
                      <li>Lớp keo: không bong tróc, độ bền trên 1 năm hoặc hơn nếu không bị va chạm mạnh. Dễ dàng lột ra và không để lại keo.</li>
                      <li>Ưu điểm: chống trầy (Anti Scratch), chống thấm nước (Waterproof) 100%, không phai màu dưới ánh nắng (Sun Protection).</li>
                      <li>Ứng dụng: dán nón bảo hiểm, laptop, xe đạp, xe máy, tủ lạnh, tủ quần áo, vali, ps4, máy tính, laptop,..</li>
                      <li>Kích thước: 10x15cm / sheet, từ 5-7cm / sticker</li>
                    </ul>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <ul>
                      <li>I. PHẠM VI GIAO HÀNG:</li>
                      <li>VIETNAM OUTFITTER Áp dụng hình thức giao hàng (ship) cho khách trên toàn quốc với đơn hàng từ 100.000 Đồng.
                        Trường hợp áp dụng mã giảm giá ( nếu có) , thì giá trị đơn hàng, sau khi giảm, giá trị đơn hàng cũng phải từ 100.000 Đồng .</li>
                    </ul>
                  </TabPanel>
                  <TabPanel value={value} index={2} >
                    <div className="border-gray-200 border-solid border bg-white">
                      <div className="">
                        <div className=" flex w-full md:justify-end justify-center "> 
                        <Button
                          variant="outlined"
                          className={classes.button}
                          startIcon={<FeedbackIcon />}
                          onClick={() => { setRaq(true) }}
                        >
                          Đánh giá
                        </Button>
                          <Button
                            variant="outlined"
                            className={classes.button}
                            startIcon={<ContactSupportIcon />}
                            onClick={() => { setRaq(false) }}
                          >
                            Câu hỏi
                          </Button></div>

                      </div>
                      <div style={{ display: raq ? "block" : "none" }}>
                        <div className="md:flex justify-around p-2">
                          <TextField id="outlined-basic" className="w-full pb-2 md:pb-0" size="small" label="Họ và Tên" variant="outlined" />
                          <TextField id="outlined-basic" className="w-full" size="small" label="Số điện thoại" variant="outlined" />
                        </div>
                        <div className="p-2">
                          <TextField id="outlined-basic" className="w-full" size="small" label="Email" variant="outlined" />
                        </div>
                        <div>
                          <div className="p-2 flex">
                            <span>Đánh giá</span>
                            <Rating className="pl-2"
                              name="simple-controlled"
                              value={rate}
                              onChange={(event, newValue) => {
                                setRate(newValue);
                              }}
                            />
                          </div>
                          <div className="p-2">
                            <TextField id="outlined-basic" fullWidth={true} size="small" label="Tiêu đề đánh giá" variant="outlined" />
                          </div>
                          <div className="p-2">
                            <textarea id="story" name="story" className="w-full rounded-sm border-gray-300 border-solid border"
                              rows="5" cols="33">
                            </textarea>
                          </div>
                          <div className="float-right">
                            <Button
                              variant="outlined"
                              className={classes.button}
                              startIcon={<SendIcon />}
                            >
                              Gửi đánh giá
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: !raq ? "block" : "none" }}>
                      <div className="md:flex justify-around p-2">
                          <TextField id="outlined-basic" className="w-full pb-2 md:pb-0" size="small" label="Họ và Tên" variant="outlined" />
                          <TextField id="outlined-basic" className="w-full" size="small" label="Số điện thoại" variant="outlined" />
                        </div>
                        <div className="p-2">
                          <TextField id="outlined-basic" className="w-full" size="small" label="Email" variant="outlined" />
                        </div>
                        <div>
                          <div className="p-2">
                            <span>Nội dung câu hỏi</span>
                          </div>
                          <div className="p-2">
                            <textarea id="story" name="story" className="w-full rounded-sm border-gray-300 border-solid border"
                              rows="5" cols="33">
                            </textarea>
                          </div>
                          <div className="float-right">
                            <Button
                              variant="outlined"
                              className={classes.button}
                              startIcon={<ContactSupportIcon />}
                            >
                              Gửi câu hỏi
                            </Button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </TabPanel>
                </div>

              </div>
            </div>
          </section>

        </main>
      </Layout>
    </div>
  );
}

// export default List;
function mapStateToProps(state) {
  const { isLoggedIn, user } = state.auth;
  return {
    isLoggedIn,
    user,
  };
}
export default connect(mapStateToProps)(List);
