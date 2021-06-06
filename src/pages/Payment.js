import React, { useState, useEffect } from 'react';
import instance from "../https";
import Layout from "../partials/Layout";


import img1 from '../images/design.jpg';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import '../css/ListProduct.css';
import TextField from '@material-ui/core/TextField';
import PaymentIcon from '@material-ui/icons/Payment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import location from '../data/location.json';
import NumberFormat from 'react-number-format';
import store from "../store/index"

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

function List() {
    var i
    var sum = 0
    const user = store.getState();
    const [name, setName] = React.useState(""); 
    const [email, setEmail] = React.useState(""); 
    const [phone, setPhone] = React.useState(""); 
    const [addr, setAddr] = React.useState(""); 
    const [addrfull, setAddrFull] = React.useState(""); 

    const [value, setValue] = React.useState("1");
    const [districtList, setDistrictList] = React.useState([]);
    const [villageList, setvillageList] = React.useState([]);
    const handleChange = (event) => {
        setValue(event.target.value);
    };
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
        instance.get('https://localhost:44377/api/Cart/GetCurrentCartItem?Page=1&RowsPerPage=10')
        .then(response => {
            setList(response.data.result.results)
            for (i =0;i<response.data.result.results.length;i++){
                sum = sum + response.data.result.results[i].quantity * response.data.result.results[i].product.oldPrice
                setTotal(sum)
            }
          return 
        });
    }, []);
    const classes = useStyles();
    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <Layout>
            <main className="flex-grow pt-5">
                <div className="w-full flex mx-auto px-4 sm:px-6 ">
                    <div className="w-3/5 h-auto mr-20  ">
                        <div className="w-3/4 float-right">
                            <span className="pt-3 pb-3 font-bold text-xl">Thanh toán</span>
                            <div>
                                <span>Thông tin giao hàng</span>
                            </div>
                            <div className="pt-3">
                                <div className="flex">
                                    <TextField id="outlined-basic" fullWidth={true} value={user.todos.result&&user.todos.result.firstName +" "+ user.todos.result.lastName || ''} onChange={e=>{setName(e.target.value)}} size="small" label="Họ và Tên" variant="outlined" />
                                </div>
                                <div className="flex pt-3">
                                    <TextField id="outlined-basic" className="w-3/5 " value={user.todos.result&&user.todos.result.email || ''} size="small" onChange={e=>{setEmail(e.target.value)}} label="Email" variant="outlined" />
                                    <TextField id="outlined-basic" className="w-2/5" size="small" onChange={e=>{setPhone(e.target.value)}} label="Số điện thoại" variant="outlined" />
                                </div>
                                <div className="pt-3">
                                    <div>
                                        <TextField id="outlined-basic" fullWidth={true} onChange={e=>{setAddr(e.target.value)}} size="small" label="Địa chỉ nhận hàng" variant="outlined" />
                                    </div>
                                </div>
                                <div className="pt-3 flex">
                                    <div className="input-group w-full" onChange={e => renderDistrict(e.target.value)} >
                                        <select id="" className="form-select mt-1 block w-full pt-2 pb-2" id="">
                                            {location.map(item => (
                                                <option key={item.Id} value={item.Id}>{item.Id} - {item.Name}</option>
                                            ))}
                                        </select>

                                    </div>
                                </div>
                                <div className="pt-3 flex">
                                    <div className="input-group w-1/2" onChange={e => renderVillage(e.target.value)} >
                                        <select id="" className="form-select mt-1 block w-full pt-2 pb-2" id="">
                                            {districtList.map(item => (
                                                <option key={item.Id} value={item.Id}>{item.Name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="input-group w-1/2" >
                                        <select id="" className="form-select mt-1 block w-full pt-2 pb-2" id="">
                                            {villageList.map(item => (
                                                <option key={item.Id} value={item.Id}>{item.Name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full flex mx-auto px-4 sm:px-6 justify-between">
                        
                    </div>
                    <div className="pt-2 w-full">
                        <textarea className="resize border rounded-md w-full" rows="4" cols="50" placeholder="Ghi chú (Bạn có thể ghi chú đơn hàng tại đây.)"></textarea>
                        </div>

                                <div className="pt-3">
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Phương thức thanh toán</FormLabel>
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
                                <div className="float-right pt-3 pb-3">
                                    <Button
                                        variant="outlined"
                                        className={classes.button}
                                        startIcon={<PaymentIcon />}
                                    >
                                        Hoàn tất đơn hàng
                      </Button>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="w-2/5 h-auto  bg-gray-200 ">
                        <div className="float-right mr-2 ml-2 w-11/12">
                            <div>
                                <b><span>Thông tin đơn hàng</span></b>
                            </div>
                            <div className="pt-5">
                                
                                {list.map(item => (
                                <div key={item.id} className="flex items-center justify-between pt-2" >
                                    <img className="imgPayment h-16 rounded-md shadow-xs" src={"https://localhost:44377/api/UploadPicture/ShowPicture?name="+item.product.avatarUrl} />
                                    <span className="pl-2 w-6/12 font-serif">{item.product.name}</span>
                                    <span className="font-serif">x{item.quantity}</span>
                                    <span className="font-serif">
                                        <NumberFormat thousandSeparator={true} readOnly className="text-right bg-gray-200" value={item.quantity*item.product.oldPrice} suffix="đ " />
                                    </span>
                                </div>
                                ))}
                                
                                <div className="flex pt-5 border-gray-300 border-b">
                                    <TextField id="outlined-basic" className="w-3/5" size="small" label="Mã giảm giá" variant="outlined" />
                                    <Button
                                        variant="outlined"
                                        className=""
                                        startIcon={<PaymentIcon />}
                                    >
                                        Sử dụng
                      </Button>
                                </div>
                                <div className="pt-5 border-gray-300 border-b">
                                    <div className="flex justify-between">
                                        <span className="font-serif">Tạm tính </span>
                                        <span className="font-serif">
                                            <NumberFormat thousandSeparator={true} readOnly className="text-right bg-gray-200" value={total} suffix="đ" />
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
                                        <NumberFormat thousandSeparator={true} readOnly className="text-right bg-gray-200" value={total + 20000} suffix="đ" />
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

export default List;
