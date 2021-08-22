import React, { useState, useEffect } from 'react';
import instance from "../https";
import Layout from "../partials/Layout";


import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import { connect } from "react-redux";
import Pagination from '@material-ui/lab/Pagination';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    button: {
        marginLeft: "1rem !important",
        marginBottom: "1rem !important",
    }
}));
var i ;
const TAX_RATE = 0.1;

function OrderDetail({ isLoggedIn, user, dispatch }) {
    const classes = useStyles();
    const [list, setList] = React.useState([]);
    const [rpt, setRpt] = React.useState({});
    const formatter = new Intl.NumberFormat({
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    })
    useEffect(() => {
        if (localStorage.getItem('token') != '' && localStorage.getItem('token') != null && localStorage.getItem('token') != undefined){
                instance.get('/Cart/GetCurrentCartItem?Page=1&RowsPerPage=10')
                .then(response => {
                    setList(response.data.result.results)
                return 
                });
            }
            instance.get(
                '/Order/GetOderReport?userId='+user.id+'',
            ).then(res => {
                setRpt(res.data);
            })
                .catch(err => {
                    alert(err.response.data.errors)
                })
      }, []);
        

    function priceRow(qty, unit) {
        return qty * unit;
    }
    function createRow(id,desc, qty, price) {
        const totalPrice = priceRow(qty, price);
        return {id,desc, qty, price, totalPrice };
    }
    
    function subtotal(items) {
        return items.map(({ totalPrice }) => totalPrice).reduce((sum, i) => sum + i, 0);
    }
    const rows = [
    ];
    for (i = 0;i<list.length;i++){
        rows.push(createRow(list[i].id,list[i].product.name, list[i].quantity, list[i].product.oldPrice))
    }
    
    const invoiceSubtotal = subtotal(rows);
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;
    
    const [ispayment,setPayment]=useState(false)
    return (
        <div className="px-24 flex flex-col min-h-screen overflow-hidden">
            <Layout>
                <main className="flex-grow">
                    <div className="w-full mx-auto px-4 sm:px-6 ">
                        <div className="mx-auto gap-6 md:grid-cols-2 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none bg-gray-200  p-3 sm:px-6 ">
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" to={"/"}>
                                    Trang chủ
                                </Link>
                                <Link color="inherit" to={"/orderHis"} >
                                    Danh sách đơn hàng
                                </Link>
                            </Breadcrumbs>

                        </div>
                    </div>
                    <div className="w-full flex mx-auto px-4 sm:px-6 ">
                    <div className="w-1/4 h-auto mr-2 pt-4 mt-2 mb-2 bg-gray-100  shadow-sm" >
                            <div id="dash-content" class="bg-gray-100 py-6 lg:py-0 w-full lg:max-w-sm flex flex-wrap content-start">

                                <div class="w-1/2 lg:w-full">
                                    <div class="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                                        <div class="flex flex-col items-center text-center">
                                            <div class="flex-shrink pr-4">
                                                <div class="rounded-full p-3 bg-gray-300"><i class="fa fa-wallet fa-fw fa-inverse text-indigo-500"></i></div>
                                            </div>
                                            <div class="flex-1">
                                                <h3 class="font-bold text-2xl font-mono ">{formatter.format(rpt.totalPrice)} đ</h3>
                                                <h5 class="font-bold text-gray-500">Tổng chi tiêu</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="w-1/2 lg:w-full">
                                    <div class="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                                        <div class="flex flex-col items-center text-center">
                                            <div class="flex-shrink">
                                                <div class="rounded-full p-3 bg-gray-300"><i class="fas fa-archive fa-fw fa-inverse text-indigo-500"></i></div>
                                            </div>
                                            <div class="flex-1">
                                                <h3 class="font-bold text-3xl text-center font-mono">{rpt.totalOrder}</h3>
                                                <h5 class="font-bold text-gray-500">Tổng đơn hàng</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="w-1/2 lg:w-full">
                                    <div class="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                                        <div class="flex flex-col items-center text-center">
                                            <div class="flex-shrink">
                                                <div class="rounded-full p-3 bg-gray-300"><i class="fas fa-paper-plane fa-fw fa-inverse text-indigo-500"></i></div>
                                            </div>
                                            <div class="flex-1">
                                                <h3 class="font-bold text-3xl text-center font-mono">{rpt.processOrder} </h3>
                                                <h5 class="font-bold text-gray-500">Đơn đang xử lý</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="w-1/2 lg:w-full">
                                    <div class="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                                        <div class="flex flex-col items-center text-center">
                                            <div class="flex-shrink">
                                                <div class="rounded-full p-3 bg-gray-300"><i class="fas fa-check-square fa-fw fa-inverse text-indigo-500"></i></div>
                                            </div>
                                            <div class="flex-1">
                                                <h3 class="font-bold text-3xl text-center font-mono">{rpt.finnishOrder}</h3>
                                                <h5 class="font-bold text-gray-500">Đơn đã hoàn thành</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                       <div className="w-3/4 h-auto pt-4 mt-2 mb-2 bg-gray-100 shadow-sm ">
                            <div className="px-4">
                                <label className="text-2xl">Chi tiết đơn hàng #716545983
                                    -
                                    Huỷ</label>
                            </div>
                            <div className="flex">
                                <div className="w-1/2 px-4 h-40">
                                    <label>
                                        ĐỊA CHỈ NGƯỜI NHẬN
                                    </label>
                                    <div className="bg-white shadow-sm rounded-sm p-2 h-3/4">
                                        <span className="font-bold leading-3">HỒ VĂN PHI</span>
                                        <br/>
                                        <span className="text-sm leading-3">Địa chỉ : </span><span className="text-sm leading-3"> Nhà 441/8 lê văn lương, Phường Tân Phong, Quận 7, Hồ Chí Minh, Việt Nam</span>
                                        <br/>
                                        <span className="text-sm leading-3">Số điện thoại : </span><span className="text-sm leading-3">0343488546</span>

                                    </div>

                                </div>
                                <div className="w-1/2 px-4">
                                    <label>
                                        HÌNH THỨC THANH TOÁN
                                    </label>
                                    <div className="bg-white shadow-sm rounded-sm p-2 h-3/4">
                                        <span className="text-sm leading-3">Thanh toán khi nhận hàng</span>
                                    </div>

                                </div>
                            </div>
                            <div className="min-h-1/625 px-4">
                            <TableContainer component={Paper} className="shadow-none">
                            <Table className={classes.table} aria-label="spanning table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Sản Phẩm</TableCell>
                                        <TableCell align="right">Số lượng</TableCell>
                                        <TableCell align="right">Giá</TableCell>
                                        <TableCell align="right">Thành tiền</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.desc}>
                                            <TableCell>{row.desc}</TableCell>
                                            <TableCell align="right">{row.qty}</TableCell>
                                            <TableCell align="right">
                                                <NumberFormat thousandSeparator={true} readOnly className="text-right" value={row.price} suffix=" " />
                                            </TableCell>
                                            <TableCell align="right">
                                                <NumberFormat thousandSeparator={true} readOnly className="text-right" value={row.totalPrice} suffix=" " />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell colSpan={3}>Tiền thanh toán</TableCell>
                                        <TableCell align="right">
                                            <NumberFormat thousandSeparator={true} readOnly className="font-bold text-right" value={invoiceTotal} suffix="" />
                                        </TableCell>
                                        <TableCell align="right"></TableCell>

                                        
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                            </div>
                        </div>

                    </div>
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
export default connect(mapStateToProps)(OrderDetail);