import React, { useState, useEffect } from 'react';
import instance from "../https";
import Layout from "../partials/Layout";

import config from '../../src/config'

import { connect } from "react-redux";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css



import {
    BrowserRouter as Router,
    useParams,
    Link,
    useHistory
} from "react-router-dom";
var i;
const TAX_RATE = 0.1;

function OrderDetail({ isLoggedIn, user, dispatch }) {
    var link = config.Image
    let history = useHistory();
    let { id } = useParams();
    const [list, setList] = React.useState([]);
    const [rpt, setRpt] = React.useState({});
    const [dtl, setDtl] = React.useState({});
    const formatter = new Intl.NumberFormat({
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    })
    const [msg, setMsg] = React.useState({
        show:false,
        msg:'',
        title:''
      });
    useEffect(() => {
        if (localStorage.getItem('token') != '' && localStorage.getItem('token') != null && localStorage.getItem('token') != undefined) {
            instance.get('/Order/GetOrderItem?order_Id=' + id + '')
                .then(response => {
                    setList(response.data)
                    return
                });
        }
        instance.get(
            '/Order/GetOderReport?userId=' + user.id + '',
        ).then(res => {
            setRpt(res.data);
        })
            .catch(err => {
                alert(err.response.data.errors)
            })
        instance.get(
            '/Order/GetById?id=' + id + '',
        ).then(res => {
            setDtl(res.data);
        })
            .catch(err => {
                alert(err.response.data.errors)
            })
    }, []);
    function CancelOrder(e) {
        e.preventDefault();
        confirmAlert({
            title: 'Thông báo',
            message: 'Bạn có chắc chắn muốn hủy đơn hàng này không ?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    var obj = {
                        "id": id    
                    }
                    instance.put(
                        '/Order/Cancel', obj
                    ).then(res => {
                        alert("Cancel Sucessfull")
                        history.push("/orderHis")
                    })
                        .catch(err => {
                            alert(err.response.data.errors)
                        })
                }
              },
              {
                label: 'No',
              }
            ]
          });
        

    }

    function priceRow(qty, unit) {
        return qty * unit;
    }
    function createRow(id, desc, img, qty, price) {
        const totalPrice = priceRow(qty, price);
        return { id, desc, img, qty, price, totalPrice };
    }

    function subtotal(items) {
        return items.map(({ totalPrice }) => totalPrice).reduce((sum, i) => sum + i, 0);
    }
    const rows = [
    ];
    for (i = 0; i < list.length; i++) {
        rows.push(createRow(list[i].id, list[i].product.name, list[i].product.avatarUrl, list[i].quantity, list[i].oldPrice))
    }

    const invoiceSubtotal = subtotal(rows);
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;

    const [ispayment, setPayment] = useState(false)
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
                                                <div class="rounded-full p-3 bg-gray-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="flex-1">
                                                <h3 class="font-bold text-2xl font-mono ">{formatter.format(rpt.totalPrice)} đ</h3>
                                                <h5 class="font-bold text-gray-500">Tổng chi tiêu</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="w-1/2 lg:w-full" >
                                    <div class="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                                        <div class="flex flex-col items-center text-center">
                                            <div class="flex-shrink">
                                                <div class="rounded-full p-3 bg-gray-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="#FFD700" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="flex-1">
                                                <h3 class="font-bold text-3xl text-center font-mono">{rpt.totalOrder}</h3>
                                                <h5 class="font-bold text-gray-500" >Đơn đang xử lý</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="w-1/2 lg:w-full" >
                                    <div class="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                                        <div class="flex flex-col items-center text-center">
                                            <div class="flex-shrink">
                                                <div class="rounded-full p-3 bg-gray-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="red">
                                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="flex-1">
                                                <h3 class="font-bold text-3xl text-center font-mono">{rpt.cancelOrder} </h3>
                                                <h5 class="font-bold text-gray-500" >Đơn đã hủy</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="w-1/2 lg:w-full" >
                                    <div class="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded p-6 m-2 md:mx-10 md:my-6">
                                        <div class="flex flex-col items-center text-center">
                                            <div class="flex-shrink">
                                                <div class="rounded-full p-3 bg-gray-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="green">
                                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="flex-1">
                                                <h3 class="font-bold text-3xl text-center font-mono">{rpt.finnishOrder}</h3>
                                                <h5 class="font-bold text-gray-500" >Đơn đã hoàn thành</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="w-3/4 h-auto pt-4 mt-2 mb-2 bg-gray-100 shadow-sm ">
                            <div className="px-4">
                                <label className="text-2xl">Chi tiết đơn hàng <a className="text-blue-600" >#{dtl.code}</a>
                                    -
                                </label>
                                <label className="uppercase text-2xl font-bold"> {dtl.status}</label>
                            </div>
                            <div className="flex">
                                <div className="w-1/2 px-4 h-40">
                                    <label>
                                        ĐỊA CHỈ NGƯỜI NHẬN
                                    </label>
                                    <div className="bg-white shadow-sm rounded-sm p-2 h-3/4">
                                        <span className="font-bold leading-3 uppercase">{dtl.receivingPerson}</span>
                                        <br />
                                        <span className="text-sm leading-3">Địa chỉ : </span><span className="text-sm leading-3"> {dtl.receivingAddress}</span>
                                        <br />
                                        <span className="text-sm leading-3">Số điện thoại : </span><span className="text-sm leading-3">{dtl.receivingPhone}</span>

                                    </div>

                                </div>
                                <div className="w-1/2 px-4">
                                    <label>
                                        HÌNH THỨC THANH TOÁN
                                    </label>
                                    <div className="bg-white shadow-sm rounded-sm p-2 h-3/4">
                                        {dtl.paymentType == "1" &&
                                            <span className="text-sm leading-3">Thanh toán khi nhận hàng</span>
                                        }
                                        {dtl.paymentType == "2" &&
                                            <span className="text-sm leading-3">Thanh toán qua tài khoản ngân hàng</span>
                                        }
                                        {dtl.paymentType == "3" &&
                                            <span className="text-sm leading-3">Thanh toán qua ví Momo</span>
                                        }
                                    </div>

                                </div>
                            </div>
                            <div className="min-h-1/625 px-4">
                                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                                    <div className="w-full overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="text-md font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                                    <th className="px-4 py-3">Sản Phẩm</th>
                                                    <th className="px-4 py-3">Hình ảnh</th>
                                                    <th className="px-4 py-3">Số lượng	</th>
                                                    <th className="px-4 py-3">Giá</th>
                                                    <th className="px-4 py-3">Thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white">
                                                {rows.map((row) => (

                                                    <tr className="text-gray-700" key={row.desc}>
                                                        <td className="px-4 py-3 border">
                                                            <div className="flex items-center text-sm">
                                                                <div>
                                                                    <p className=" text-black">{row.desc}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-ms  border">
                                                            <div>
                                                                <img className="imgPayment h-16 rounded-md " src={link + row.img} alt="Testimonial 01" />
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-ms  border">{formatter.format(row.qty)}</td>
                                                        <td className="px-4 py-3 text-xs border">
                                                            {formatter.format(row.price)}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm border">
                                                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> {formatter.format(row.totalPrice)} </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr className="text-gray-700">
                                                    <td className="px-4 py-3 border" colSpan="4">Tiền thanh toán</td>
                                                    <td className="px-4 py-3 border font-semibold" colSpan="1">{formatter.format(invoiceTotal)}</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span onClick={CancelOrder} >Hủy đơn hàng</span>
                                </button>
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