import React, { useEffect, useState } from 'react';
import instance from "../https";
import Layout from "../partials/Layout";
import { Link, useHistory, Redirect } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';


import config from '../../src/config'

const TAX_RATE = 0.0;

var i;

function List() {
    var link = config.Image

    let history = useHistory();
    const [reload, SetReLoad] = React.useState(true);
    function handleChange() {
        if (reload) {
            SetReLoad(false)
        } else {
            SetReLoad(true)
        }
    }
    const [list, setList] = React.useState([]);
    const [numItem, setnumItem] = React.useState(0);
    useEffect(() => {
        if (localStorage.getItem('token') != '' && localStorage.getItem('token') != null && localStorage.getItem('token') != undefined) {
            instance.get('/Cart/GetCurrentCartItem?Page=1&RowsPerPage=10')
                .then(response => {
                    setList(response.data.result.results)
                    setnumItem(response.data.result.totalCount)
                    return
                });
        }
    }, [reload]);


    function Delete(id) {
        instance.post(
            '/Cart/' + id + '',
        ).then(e => {
            handleChange()
        });
    }
    function priceRow(qty, unit) {
        return qty * unit;
    }
    function createRow(id, desc, qty, price) {
        const totalPrice = priceRow(qty, price);
        return { id, desc, qty, price, totalPrice };
    }

    function subtotal(items) {
        return items.map(({ totalPrice }) => totalPrice).reduce((sum, i) => sum + i, 0);
    }
    const rows = [
    ];
    for (i = 0; i < list.length; i++) {
        rows.push(createRow(list[i].id, list[i].product.name, list[i].quantity, list[i].product.retailPrice))
    }

    const invoiceSubtotal = subtotal(rows);
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;

    const formatter = new Intl.NumberFormat({
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    })

    return (
        <div>
            <Layout>
                <main className="flex-grow">
                <div className="w-full mx-auto px-4 sm:px-6 ">
                        <div className="mx-auto gap-6 md:grid-cols-2 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none bg-gray-200  p-3 sm:px-6 ">
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" to={"/"}>
                                    Trang chủ
                                </Link>
                                <Link color="inherit" to={"/cart"} >
                                    Giỏ hàng của tôi
                                </Link>
                            </Breadcrumbs>

                        </div>
                    </div>
                    <div className="container mx-auto mt-2">
                        <div className="md:flex shadow-md">
                            <div className="md:w-3/4 w-full bg-white md:px-10 px-4 pb-10">
                                <div className="flex justify-between border-b pb-8">
                                    <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                                    <h2 className="font-semibold text-2xl">{numItem} Items</h2>
                                </div>
                                <div className="flex mt-10 mb-5">
                                    <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                                    <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                                    <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                                    <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                                </div>
                                {list.map((row) => (
                                    <div key={row.id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                                        <div className="flex w-2/5"> {/* product */}
                                            <div className="w-20">
                                                <img className="h-24 w-full" src={link+row.product.avatarUrl} alt="" />
                                            </div>
                                            <div className="flex flex-col justify-between ml-4 flex-grow">
                                                <span className="font-bold text-sm">{row.product.name}</span>
                                                <span className="text-red-500 text-xs">{row.product.productCategory.name}</span>
                                                <a className="cursor-pointer font-semibold hover:text-red-500 text-gray-500 text-xs" onClick={e => Delete(row.id)}>Remove</a>
                                            </div>
                                        </div>
                                        <div className="flex justify-center w-1/5">
                                            <span className="text-center w-1/5 font-semibold text-sm">{row.quantity}</span>
                                        </div>
                                        <span className="text-center w-1/5 font-semibold text-sm">{formatter.format(row.product.retailPrice)}</span>
                                        <span className="text-center w-1/5 font-semibold text-sm">{formatter.format(row.product.retailPrice * row.quantity)}</span>
                                    </div>
                                ))}
                                <a href="/" className="cursor-pointer flex font-semibold text-indigo-600 text-sm mt-10">
                                    <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                                    Continue Shopping
                                </a>
                            </div>
                            <div id="summary" className=" md:w-1/4 w-full px-8 pb-10">
                                <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                                <div className="flex justify-between mt-10 mb-2">
                                    <span className="font-semibold text-sm uppercase">Items {numItem}</span>
                                    <span className="font-semibold text-sm">{formatter.format(invoiceSubtotal)} đ</span>
                                </div>
                                <div className="flex justify-between">
                                    <span></span>
                                    <span className="mr-5">+</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="font-semibold text-sm">VAT Tax</span>
                                    <span className="font-semibold text-sm">{formatter.format(invoiceSubtotal)} * {TAX_RATE*100} %</span>
                                </div>
                                <div className="border-t mt-8">
                                    <div className="flex font-semibold justify-between py-6 text-sm">
                                        <span>Total cost</span>
                                        <span>{formatter.format(invoiceTotal)} đ</span>
                                    </div>
                                    <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full" onClick={() => { history.push("/payment") }}>Checkout</button>
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
