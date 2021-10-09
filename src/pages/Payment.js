import React, { useState, useEffect } from 'react';
import instance from "../https";
import Layout from "../partials/Layout";
import config from '../../src/config'


import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import location from '../data/location.json';
import { connect } from "react-redux";
import { Link, useHistory, Redirect } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

const useStyles = makeStyles((theme) => ({
    button: {
        marginLeft: "1rem !important",
        marginBottom: "1rem !important",
    }
}));

function List({ isLoggedIn, user, dispatch }) {
    var i
    var link = config.Image
    var sum = 0
    let history = useHistory();
    const [fname, setfName] = React.useState(user.firstName);
    const [lname, setlName] = React.useState(user.lastName);
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [addr, setAddr] = React.useState("");
    const [note, setNote] = React.useState("");

    const [value, setValue] = React.useState("1");
    const [districtList, setDistrictList] = React.useState([]);
    const [villageList, setvillageList] = React.useState([]);

    const [cityName, setcityName] = React.useState("");
    const [districtName, setdistrictName] = React.useState("");
    const [villageName, setvillageName] = React.useState("");
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const formatter = new Intl.NumberFormat({
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    })
    function renderDistrict(id) {
        for (const x of location) {
            if (x.Id == id) {
                setDistrictList(x.Districts)
                for (const b of x.Districts) {
                    if (b.Id == x.Districts[0].Id) {
                        setvillageList(b.Wards)
                    }
                }
            }
        }
    }
    function renderVillage(id) {
        for (const x of districtList) {
            if (x.Id == id) {
                setvillageList(x.Wards)
                renderVillage(x.Wards[0].Id)
            }
        }
    }
    const [list, setList] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    useEffect(() => {
        instance.get('/Cart/GetCurrentCartItem?Page=1&RowsPerPage=10')
            .then(response => {
                setList(response.data.result.results)
                for (i = 0; i < response.data.result.results.length; i++) {
                    sum = sum + response.data.result.results[i].quantity * response.data.result.results[i].product.retailPrice
                    setTotal(sum)
                }
                return
            });
    }, []);

    //Create order
    function checkvaid() {
        var data = false
        if (fname == "" ||lname == "" || phone == "" || cityName == "" || districtName == "" || villageName == "" || addr == "") {
            data = false
        }
        else {
            data = true
        }
        return data
    }
    function CreateOrder(e) {
        e.preventDefault();
        if (!checkvaid()) {
            alert("Nhập đủ thông tin người nhận hàng trước khi đặt hàng")
        } else {
            var obj = {
                "code": "",
                "discountCode": "",
                "receivingAddress": addr + "," + villageName + "," + districtName + "," + cityName,
                "receivingPhone": phone,
                "receivingPerson": lname+" "+fname,
                "paymentType": value,
                "status": 0,
                "note": note,
                "creatorUserId": user.id
            }

            instance.post(
                '/Order', obj
            ).then(res => {
                alert("Create Sucessfull")
                history.push("/orderHis")

            })
                .catch(err => {
                    alert(err.response.data.errors)
                })
        }
    }
    const classes = useStyles();
    return (
        <div>
            <Layout>
                <main className="flex-grow pt-5">
                    <div className="w-full mx-auto px-4">
                        <div className="mx-auto gap-6 md:grid-cols-2 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none bg-gray-200  p-2 sm:px-6 ">
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" to={"/"}>
                                    Trang chủ
                                </Link>
                                <Link color="inherit" to={"/cart"} >
                                    Thanh toán
                                </Link>
                            </Breadcrumbs>

                        </div>
                    </div>
                    <div className="container mx-auto mt-2">
                        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
                            <div className="flex flex-col md:w-full">
                                <h2 className="mb-4 font-bold md:text-xl text-heading ">Thông tin thanh toán
                                </h2>
                                <div className="justify-center w-full mx-auto">
                                    <div>
                                        <div className="space-x-1 flex lg:space-x-4">
                                            <div className="w-1/2">
                                                <div className="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <label htmlFor="firstName" className="block mb-1 text-sm font-semibold text-gray-500">Họ và tên đệm
                                                    </label>
                                                </div>

                                                <input name="firstName" type="text" value={lname} onChange={(e)=>{setlName(e.target.value)}} placeholder="Họ" className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                            </div>
                                            <div className="w-1/2 ">
                                                <div className="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                    </svg>
                                                    <label htmlFor="firstName" className="block mb-1 text-sm font-semibold text-gray-500">
                                                        Tên</label>
                                                </div>

                                                <input name="Last Name" type="text" value={fname} onChange={(e)=>{setfName(e.target.value)}} placeholder="Tên " className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                            </div>
                                        </div>
                                        <div className="mt-4 space-x-1 flex lg:space-x-4">
                                            <div className="w-1/2">
                                                <div className="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    <label htmlFor="Email"  className="block text-sm mb-1 font-semibold text-gray-500">Email</label>

                                                </div>
                                                <input name="Last Name" value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder="Email" className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                            </div>
                                            <div className="w-1/2">
                                                <div className="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3l-6 6m0 0V4m0 5h5M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                                                    </svg>
                                                    <label htmlFor="Phone Number" className="block mb-1 text-sm font-semibold text-gray-500">Số điện thoại</label>

                                                </div>
                                                <input name="Phone Number" value={phone} onChange={(e)=>{setPhone(e.target.value)}} type="text" placeholder="Phone Number" className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                            </div>


                                        </div>
                                        <div className="mt-4">
                                            <div className="w-full">
                                                <div className="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                    </svg>
                                                    <label htmlFor="Address" className="block mb-1 text-sm font-semibold text-gray-500">Địa chỉ nhận hàng</label>

                                                </div>
                                                <textarea value={addr} onChange={(e)=>{setAddr(e.target.value)}} className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" name="Address" cols={20} rows={4} placeholder="Số nhà / Tên đường" defaultValue={""} />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div className="w-full">
                                                <div className="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                                    </svg>
                                                    <label htmlFor="Address" className="block mb-1 text-sm font-semibold text-gray-500">Tỉnh / Thành phố</label>

                                                </div>
                                                <div className="" onChange={e => renderDistrict(e.target.value)} >
                                                    <select id="" className="form-select mt-1 block w-full pt-2 pb-2" onChange={e => setcityName(e.target.options[e.target.selectedIndex].text)} id="" >
                                                        <option value="0">Choose</option>
                                                        {location.map(item => (
                                                            <option key={item.Id} value={item.Id}>{item.Name}</option>
                                                        ))}
                                                    </select>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-x-1 flex lg:space-x-4 mt-4">
                                            <div className="w-1/2">
                                                <div className="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                                                    </svg>
                                                    <label htmlFor="city" className="block mb-1 text-sm font-semibold text-gray-500">Quận Huyện</label>

                                                </div>
                                                <div className="" onChange={e => renderVillage(e.target.value)} >

                                                    <select id="" className="form-select mt-1 block w-full pt-2 pb-2" onChange={e => setdistrictName(e.target.options[e.target.selectedIndex].text)} id="">
                                                        <option value="0">Choose</option>
                                                        {districtList.map(item => (
                                                            <option key={item.Id} value={item.Id}>{item.Name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="w-1/2 ">
                                                <div className="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                                                    </svg>
                                                    <label htmlFor="postcode" className="block mb-1 text-sm font-semibold text-gray-500">
                                                        Phường / Xã</label>
                                                </div>

                                                <div className="" >
                                                    <select id="" className="form-select mt-1 block w-full pt-2 pb-2" onChange={e => setvillageName(e.target.options[e.target.selectedIndex].text)} id="">
                                                        <option value="0">Choose</option>
                                                        {villageList.map(item => (
                                                            <option key={item.Id} value={item.Id}>{item.Name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative pt-3 xl:pt-6">
                                            <div className="flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                </svg>
                                                <label htmlFor="note" className="block mb-1 text-sm font-semibold text-gray-500"> Notes
                                                </label>
                                            </div>

                                            <textarea name="note" value={note} onChange={(e)=>{setNote(e.target.value)}} className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600" rows={4} placeholder="Notes for delivery" defaultValue={""} />
                                        </div>
                                        <div className="pt-3">
                                            <FormControl component="fieldset">
                                                <FormLabel className="font-semibold" component="legend">Phương thức thanh toán</FormLabel>
                                                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                                    <FormControlLabel value="1" control={<Radio />} label="	Thanh toán khi giao hàng (COD)" />

                                                    <FormControlLabel value="2" control={<Radio />} label="Chuyển khoản qua ngân hàng" />
                                                    <div style={{ display: value == 2 ? "block" : "none" }} className="border-gray-300 border rounded-md">
                                                        <ul>
                                                            <li className="text-center">
                                                                - Chuyển khoản đơn hàng vào Chủ TK: Lê Quỳnh Như STK: 0371000440830 Ngân hàng Vietcombank - Chi nhánh Tân Định
                                                            </li>
                                                            <li className="text-center">
                                                                - Thông tin CK: Tên KH – SĐT
                                                            </li>
                                                            <li className="text-center">
                                                                - Quý khách vui lòng gửi màn hình giao dịch thành công về email CSKH@Stickerfactory.vn hoặc Inbox Fanpage để nhân viên thu ngân đối chiếu
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <FormControlLabel value="3" control={<Radio />} label="Thanh toán bằng MOMO" />
                                                    <div style={{ display: value == 3 ? "block" : "none" }} className="border-gray-300 border rounded-md">
                                                        <ul>
                                                            <li className="text-center">
                                                                CHUYỂN MOMO - SĐT 0929059515 - NGUYỄN TRƯỜNG THI
                                                            </li>
                                                            <li className="text-center">
                                                                - Thông tin CK: Tên KH – SĐT
                                                            </li>
                                                            <li className="text-center">
                                                                - Quý khách vui lòng gửi màn hình giao dịch thành công về email CSKH@Stickerfactory.vn hoặc Inbox Fanpage để nhân viên thu ngân đối chiếu
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                        <div className="mt-4">
                                            <button className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900" onClick={(e)=>{CreateOrder(e)}}>Hoàn tất đơn hàng</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
                                <div className="pt-12 md:pt-0 2xl:ps-4">
                                    <h2 className="text-xl font-bold">Tổng kết đơn hàng
                                    </h2>
                                    <div className="mt-8 ">
                                        <div className="flex flex-col space-y-4">
                                            {list.map(item => (
                                                <div key={item.id} className="flex items-center justify-between pt-2" >
                                                    <img className="imgPayment h-16" src={link + item.product.avatarUrl} />
                                                    <span className="pl-2 w-6/12 font-serif">{item.product.name}</span>
                                                    <span className="font-serif w-2/12">x{item.quantity}</span>
                                                    <span className="font-serif">
                                                        {formatter.format(item.quantity * item.product.retailPrice)}
                                                    </span>
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                    <div className="flex pt-5 border-gray-300 border-b pb-4 space-x-4">
                                        <input type="text" placeholder="Mã giảm giá" className="w-3/5 px-2 py-1 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                        <button class="bg-gray-300 hover:bg-gray-500 py-1 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                            Áp dụng
                                        </button>
                                    </div>
                                    <div className="pt-5 border-gray-300 border-b">
                                        <div className="flex justify-between">
                                            <span className="font-serif">Tạm tính </span>
                                            <span className="font-serif">
                                                {formatter.format(total)} đ
                                            </span>
                                        </div>
                                        <div className="flex justify-between pb-4">
                                            <span className="font-serif"> Phí vận chuyển </span>
                                            <span className="font-serif">20 000 đ </span>
                                        </div>
                                    </div>
                                    <div className="pt-5 flex justify-between">
                                        <span className="font-serif"> Tổng cộng </span>
                                        <span className="font-serif">
                                            {formatter.format(total + 20000)} đ
                                        </span>
                                    </div>
                                </div>
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
export default connect(mapStateToProps)(List);