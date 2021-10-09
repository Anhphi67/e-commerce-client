import React, { useState, useEffect } from 'react';
import instance from "../https";
import Layout from "../partials/Layout";
import { connect } from "react-redux";
import Pagination from '@material-ui/lab/Pagination';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';



import {
    BrowserRouter as Router, useHistory,
    Link
} from "react-router-dom";

function OrderHistory({ isLoggedIn, user, dispatch }) {
    let history = useHistory();
    const [page, setPage] = React.useState(1);
    const [list, setList] = React.useState([]);
    const [rpt, setRpt] = React.useState({});
    const [sta, setSta] = React.useState("0");
    const [maxpage, setMaxPage] = React.useState(1);

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
                '/Order/getUiList?Page=' + page + '&RowsPerPage=5&FilterKeyword=' + sta,
            ).then(res => {
                setList(res.data.result.results);
                setMaxPage(parseInt((res.data.result.totalCount / 10)) + (parseInt((res.data.result.totalCount / 10))==0?1:0))

            })
                .catch(err => {
                    if (err.status = "401") {
                        alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại ")
                    } else {
                        alert(err.data.errors)
                    }
                })
            instance.get(
                '/Order/GetOderReport?userId=' + user.id + '',
            ).then(res => {
                setRpt(res.data);
            })
                .catch(err => {
                    alert(err.response.data.errors)
                })
        };
        fetchData();
    }, [page, sta]);
    const handleChange = (event, value) => {
        setPage(value);
    };
    return (
        <div>
            <Layout>
                <main className="flex-grow">
                    <div className="w-full mx-auto px-4 sm:px-6 ">
                        <div className="mx-auto gap-6 md:grid-cols-2 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none bg-gray-200  p-2 sm:px-6 ">
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
                    <div className="w-full md:flex mx-auto px-4 sm:px-6 ">
                        <div className="md:w-1/4 w-full h-auto mr-2 pt-4 mt-2 mb-2 bg-gray-100  shadow-sm" >
                            <div id="dash-content" className="bg-gray-100 py-6 lg:py-0 w-full lg:max-w-sm flex flex-wrap content-start">

                                <div className="cursor-pointer w-1/2 lg:w-full">
                                    <div className="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="flex-shrink pr-4">
                                                <div className="rounded-full p-3 bg-gray-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold md:text-2xl text-xl font-mono ">{formatter.format(rpt.totalPrice)} đ</h3>
                                                <h5 className="font-bold text-gray-500  text-sm md:text-base">Tổng chi tiêu</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=" cursor-pointer w-1/2 lg:w-full" onClick={() => setSta("0")}>
                                    <div className="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="flex-shrink">
                                                <div className="rounded-full p-3 bg-gray-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="#FFD700" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-2xl text-center font-mono">{rpt.totalOrder}</h3>
                                                <h5 className="font-bold text-gray-500  text-sm md:text-base" >Đơn đang xử lý</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=" cursor-pointer w-1/2 lg:w-full" onClick={() => setSta("30")}>
                                    <div className="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="flex-shrink">
                                                <div className="rounded-full p-3 bg-gray-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="red">
                                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-2xl text-center font-mono">{rpt.cancelOrder} </h3>
                                                <h5 className="font-bold text-gray-500  text-sm md:text-base" >Đơn đã hủy</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="cursor-pointer w-1/2 lg:w-full" onClick={() => setSta("20")}>
                                    <div className="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="flex-shrink">
                                                <div className="rounded-full p-3 bg-gray-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="green">
                                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-2xl text-center font-mono">{rpt.finnishOrder}</h3>
                                                <h5 className="font-bold text-gray-500 text-sm md:text-base" >Đơn hoàn thành</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="md:w-3/4 w-full h-auto pt-0 mt-2 mb-2 shadow-sm">
                            <div className="min-h-1/2">
                                <div className="flex justify-center mx-auto pb-2">
                                    <div className="flex flex-col w-full">
                                        <div className="w-full overflow-x-auto">
                                            <div className="border-b border-gray-200 shadow">
                                                <table>
                                                    <thead className="bg-gray-100">
                                                        <tr>
                                                            <th className=" px-6 py-2 text-xs text-gray-500 whitespace-no-wrap">
                                                                Mã đơn hàng
                                                            </th>
                                                            <th className="px-6 py-2 text-xs text-gray-500 whitespace-no-wrap">
                                                                Người mua
                                                            </th>
                                                            <th className="px-6 py-2 text-xs text-gray-500 whitespace-no-wrap">
                                                                Địa chỉ
                                                            </th>
                                                            <th className="px-6 py-2 text-xs text-gray-500 whitespace-no-wrap">
                                                                Ngày mua
                                                            </th>
                                                            <th className="px-6 py-2 text-xs text-gray-500 whitespace-no-wrap">
                                                                Tổng tiền
                                                            </th>
                                                            <th className="px-6 py-2 text-xs text-gray-500 whitespace-no-wrap">
                                                                Trạng thái
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white">
                                                        {list.map((lst) => (
                                                            <tr key={lst.id} className="whitespace-nowrap">
                                                                <td className="px-3 py-4 text-sm text-gray-500">
                                                                    <a onClick={() => { history.push("/orderDetail/" + lst.id) }} className="cursor-pointer px-4 py-1 text-sm text-blue-400 ">{lst.code}</a>
                                                                </td>
                                                                <td className="px-3 py-4">
                                                                    <div className="text-sm text-gray-900">
                                                                        {lst.receivingPerson}
                                                                    </div>
                                                                </td>
                                                                <td className="px-3 py-4">
                                                                    <div className="text-sm text-gray-500"><i>{lst.receivingAddress}</i></div>
                                                                </td>
                                                                <td className="px-3 py-4 text-sm text-gray-500">
                                                                    {formatDate(lst.s_CreatedDate)}
                                                                </td>
                                                                <td className="px-3 py-4 text-right">
                                                                    <span>{formatter.format(lst.sumPrice)}</span>
                                                                </td>
                                                                <td className="px-3 py-4">
                                                                    {lst.status == "Canceled" ? (
                                                                        <a className="px-4 py-1 text-sm text-white bg-red-400 rounded">{lst.status}</a>
                                                                    ) : null}
                                                                    {lst.status == "Processing" ? (
                                                                        <a className="px-4 py-1 text-sm text-white bg-blue-500 rounded">{lst.status}</a>
                                                                    ) : null}
                                                                    {lst.status == "Completed" ? (
                                                                        <a className="px-4 py-1 text-sm text-white bg-green-500 rounded">{lst.status}</a>
                                                                    ) : null}
                                                                    {lst.status == "Received" ? (
                                                                        <a className="px-4 py-1 text-sm text-white bg-gray-500 rounded">{lst.status}</a>
                                                                    ) : null}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="mb-2 pb-2">
                                <Pagination count={maxpage} page={page} onChange={handleChange} />
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
export default connect(mapStateToProps)(OrderHistory);