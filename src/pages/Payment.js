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
import NumberFormat from 'react-number-format';
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
    const [name, setName] = React.useState(user.lastName + " " + user.firstName);
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
        if (name == "" || phone == "" || cityName == "" || districtName == "" || villageName == "" || addr == "") {
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
                "id": 0,
                "code": "",
                "discountCode": "",
                "receivingAddress": addr + "," + villageName + "," + districtName + "," + cityName,
                "receivingPhone": phone,
                "receivingPerson": name,
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
                <div className="w-full mx-auto px-4 sm:px-6 ">
                        <div className="mx-auto gap-6 md:grid-cols-2 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none bg-gray-200  p-3 sm:px-6 ">
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
                                        <div className="space-x-0 lg:flex lg:space-x-4">
                                            <div className="w-full lg:w-1/2">
                                                <label htmlFor="firstName" className="block mb-3 text-sm font-semibold text-gray-500">Họ và tên đệm
                                                </label>
                                                <input name="firstName" type="text" placeholder="Họ" className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                            </div>
                                            <div className="w-full lg:w-1/2 ">
                                                <label htmlFor="firstName" className="block mb-3 text-sm font-semibold text-gray-500">
                                                    Tên</label>
                                                <input name="Last Name" type="text" placeholder="Tên " className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                            </div>
                                        </div>
                                        <div className="mt-4 space-x-0 lg:flex lg:space-x-4">
                                            <div className="w-full lg:w-1/2">
                                                <label htmlFor="Email" className="block mb-3 text-sm font-semibold text-gray-500">Email</label>
                                                <input name="Last Name" type="text" placeholder="Email" className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                            </div>
                                            <div className="w-full lg:w-1/2">
                                                <label htmlFor="Phone Number" className="block mb-3 text-sm font-semibold text-gray-500">Số điện thoại</label>
                                                <input name="Phone Number" type="text" placeholder="Phone Number" className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                            </div>


                                        </div>
                                        <div className="mt-4">
                                            <div className="w-full">
                                                <label htmlFor="Address" className="block mb-3 text-sm font-semibold text-gray-500">Địa chỉ nhận hàng</label>
                                                <textarea className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" name="Address" cols={20} rows={4} placeholder="Số nhà / Tên đường" defaultValue={""} />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div className="w-full">
                                                <label htmlFor="Address" className="block mb-3 text-sm font-semibold text-gray-500">Tỉnh / Thành phố</label>
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
                                        <div className="space-x-0 lg:flex lg:space-x-4 mt-4">
                                            <div className="w-full lg:w-1/2">
                                                <label htmlFor="city" className="block mb-3 text-sm font-semibold text-gray-500">Quận Huyện</label>
                                                <div className="" onChange={e => renderVillage(e.target.value)} >

                                                    <select id="" className="form-select mt-1 block w-full pt-2 pb-2" onChange={e => setdistrictName(e.target.options[e.target.selectedIndex].text)} id="">
                                                        <option value="0">Choose</option>
                                                        {districtList.map(item => (
                                                            <option key={item.Id} value={item.Id}>{item.Name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-1/2 ">
                                                <label htmlFor="postcode" className="block mb-3 text-sm font-semibold text-gray-500">
                                                    Phường / Xã</label>
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
                                        <div className="relative pt-3 xl:pt-6"><label htmlFor="note" className="block mb-3 text-sm font-semibold text-gray-500"> Notes
                                            (Optional)</label><textarea name="note" className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600" rows={4} placeholder="Notes for delivery" defaultValue={""} />
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
                                            <button className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900">Hoàn tất đơn hàng</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
                                <div className="pt-12 md:pt-0 2xl:ps-4">
                                    <h2 className="text-xl font-bold">Order Summary
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