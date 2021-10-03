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
//
//Icon
import FeedbackIcon from '@material-ui/icons/Feedback';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import SendIcon from '@material-ui/icons/Send';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import "react-responsive-carousel/lib/styles/carousel.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import {
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

  //get data
  let { id } = useParams();
  const [detail, setDetail] = React.useState([]);
  const [imgUrl, setimgUrl] = React.useState("");
  useEffect(() => {
    // async function fetchData() {
    //   setdtlImage(await getData());
    // }
    // fetchData();
    instance.get(
      '/Product/GetDetail?id=' + id + '',
    ).then(result => {
      setDetail(result.data.result);
      setParent(result.data.result.productCategory.id)
      setGrandBr(result.data.result.productCategory.parentCategory.id)
      setimgUrl(config.Image + result.data.result.avatarUrl)
      setdtlImage((result.data.result.avatarUrl + "," + result.data.result.imageUrl).split(","))
    });
  }, []);
  var arr = undefined

  async function getData() {
    try {
      const response = await instance.get(
        '/Product/GetDetail?id=' + id + '')
      arr = response.data.result.imageUrl.split(",")
      for (var i = 0; i < arr.length; i++) {
        arr[i] = config.Image + arr[i]
      }
      return await arr.map((image) => ({ image }))
    } catch (error) {
      console.error(error);
    }
  }

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
  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
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
                  {/* <Link color="inherit" to="/" >
                    {detail.productCategory && detail.productCategory && detail.productCategory.parentCategory.name}
                  </Link> */}
                  <Link color="inherit" to={"/list/" + parent} >
                    {detail.productCategory && detail.productCategory.name}
                  </Link>
                  <Typography color="textPrimary">{detail.name}</Typography>
                </Breadcrumbs>
              </div>
            </div>
          </div>
          <section className="bg-white-to-b from-gray-100 to-white">
            <div className="w-full md:flex mx-auto px-4 sm:px-6">
              <div className="md:w-1/2 sm:full h-auto mr-2 pt-10 ">
                <Carousel interval="2000" showStatus={false} transitionTime="1000" thumbWidth="18.8%" className="w-full h-full">
                  {dtlImage.map((item) => (
                    <div key={item} className="w-full  m-auto h-3/4 md:min-h-120 md:max-h-120">
                      <img className="h-full object-cover w-full" src={config.Image + item} />
                    </div>
                  ))}
                </Carousel>

              </div>
              <div className="md:w-1/2 ml-4 sm:full h-auto ">
                <span className="pt-8 font-bold text-xl" >{detail.name}</span>
                <div className=" text-red-600 mt-2">
                  <span className="mt-2 mb-2 font-bold text-lg font-sans"> {formatter.format(count * detail.retailPrice)} VNĐ</span>
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
                  <TabPanel value={value} index={0} className="bg-white">
                    <ul>
                      <li>Chất liệu: decal Vinyl cán màn nhám (Matte)</li>
                      <li>Mực in: cao cấp an toàn cho sức khỏe cho màu in sắc nét, rực rỡ.</li>
                      <li>Lớp keo: không bong tróc, độ bền trên 1 năm hoặc hơn nếu không bị va chạm mạnh. Dễ dàng lột ra và không để lại keo.</li>
                      <li>Ưu điểm: chống trầy (Anti Scratch), chống thấm nước (Waterproof) 100%, không phai màu dưới ánh nắng (Sun Protection).</li>
                      <li>Ứng dụng: dán nón bảo hiểm, laptop, xe đạp, xe máy, tủ lạnh, tủ quần áo, vali, ps4, máy tính, laptop,..</li>
                      <li>Kích thước: 10x15cm / sheet, từ 5-7cm / sticker</li>
                    </ul>
                  </TabPanel>
                  <TabPanel value={value} index={1} className="bg-white">
                    <ul>
                      <li>I. PHẠM VI GIAO HÀNG:</li>
                      <li>VIETNAM OUTFITTER Áp dụng hình thức giao hàng (ship) cho khách trên toàn quốc với đơn hàng từ 100.000 Đồng.
                        Trường hợp áp dụng mã giảm giá ( nếu có) , thì giá trị đơn hàng, sau khi giảm, giá trị đơn hàng cũng phải từ 100.000 Đồng .</li>
                    </ul>
                  </TabPanel>
                  <TabPanel value={value} index={2} className="border-gray-200 border-solid border bg-white">
                    <div >
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
                          
                        </div>
                        <div className="flex justify-end">
                            <Button
                              variant="outlined"
                              className={classes.button}
                              startIcon={<SendIcon />}
                            >
                              Gửi đánh giá
                            </Button>
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
