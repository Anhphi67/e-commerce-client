import React, { useState, useEffect } from 'react';
import instance from "../https";
import Layout from "../partials/Layout";


import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PaymentIcon from '@material-ui/icons/Payment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import location from '../data/location.json';
import NumberFormat from 'react-number-format';
import { connect } from "react-redux";
import Pagination from '@material-ui/lab/Pagination';
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
        marginLeft: "1rem !important",
        marginBottom: "1rem !important",
    }
}));

function History({ isLoggedIn, user, dispatch }) {
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const [list, setList] = React.useState([]);
    const [rpt, setRpt] = React.useState({});
    function formatDate(date) {
        const d = date.substring(0, 10)
        return d
    }
    const formatter = new Intl.NumberFormat({
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    })
    useEffect(() => {
        const fetchData = async () => {
            instance.get(
                '/Order/getUiList?Page=' + page + '&RowsPerPage=5',
            ).then(res => {
                setList(res.data.result.results);
            })
                .catch(err => {
                    alert(err.response.data.errors)
                })
            instance.get(
                    '/Order/GetOderReport?userId='+user.id+'',
                ).then(res => {
                    setRpt(res.data);
                })
                    .catch(err => {
                        alert(err.response.data.errors)
                    })
        };
        fetchData();
    }, [page]);
    const handleChange = (event, value) => {
        setPage(value);
    };
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
                                Đơn hàng của tôi
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
                        <div className="w-3/4 h-auto pt-4 mt-2 mb-2 bg-gray-100 shadow-sm">
                            <div className="min-h-1/2">
                                {list.map((lst) => (
                                    <div className="w-98/100  h-auto pt-2 ml-2 mr-2 bg-white shadow-sm mb-4">
                                        <div className="flex border-b">
                                            <div className="ml-2 w-2/3">
                                                <label><b>Mã đơn hàng</b>  : </label> <a className="text-blue-600">{lst.code}</a>
                                                <br />
                                                <label><b>Người nhận</b> : {lst.receivingPerson}</label>
                                                <br />
                                                <label><b>Địa chỉ nhận</b> : </label> <label><i>{lst.receivingAddress}</i></label>

                                            </div>
                                            <div className="w-1/3">
                                                <span ><b>Đặt ngày</b> : </span><span className="text-blue-600">{formatDate(lst.s_CreatedDate)}</span>
                                                <br />
                                                <span><b>Số điện thoại</b> : </span><span className="text-blue-600"> {lst.receivingPhone}</span>
                                                <br />
                                                <span><b>Trạng thái</b> : </span><span className="text-blue-600"> {lst.status}</span>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="ml-2 pt-3 w-1/2">
                                                <label><b>Tổng tiền</b> : </label> <label className="text-blue-600 font-bold"> {formatter.format(lst.sumPrice)} đ</label>
                                            </div>
                                            <div className="w-1/2 flex justify-end mt-1 mb-1 mr-2">
                                                <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 rounded inline-flex items-center">
                                                    <svg class="h-8 w-8 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="5" y1="12" x2="19" y2="12" />  <line x1="15" y1="16" x2="19" y2="12" />  <line x1="15" y1="8" x2="19" y2="12" /></svg>
                                                    <span >Order Detail</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                ))}

                            </div>
                            <div className="mb-2">
                                <Pagination count={10} page={page} onChange={handleChange} />
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
export default connect(mapStateToProps)(History);