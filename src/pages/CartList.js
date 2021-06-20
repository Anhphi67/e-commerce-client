import React, { useEffect ,useState} from 'react';
import instance from "../https";
import Layout from "../partials/Layout";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import UpdateIcon from '@material-ui/icons/Update';
import PaymentIcon from '@material-ui/icons/Payment';
import Payment from '../pages/Payment';
import NumberFormat from 'react-number-format';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link ,useHistory,Redirect } from 'react-router-dom';


const TAX_RATE = 0.1;

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    button_update: {
        marginRight: "0.5rem !important",
        background: "yellow"
    },
    button_payment: {
        background: "red"
    }
});


var i ;

function List() {
let history = useHistory();
const [reload, SetReLoad] = React.useState(true);
function handleChange(){
    if (reload){
        SetReLoad(false)
    }else{
        SetReLoad(true)
    }
}
    const [list, setList] = React.useState([]);
    useEffect(() => {
        if (localStorage.getItem('token') != '' && localStorage.getItem('token') != null && localStorage.getItem('token') != undefined){
                instance.get('/Cart/GetCurrentCartItem?Page=1&RowsPerPage=10')
                .then(response => {
                    setList(response.data.result.results)
                return 
                });
            }
      }, [reload]);
        

    function Delete (id){
            instance.delete(
                '/Cart/'+id+'',
              ).then(e=>{
                handleChange()
              });
    }
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
    
    const classes = useStyles();
    const [ispayment,setPayment]=useState(false)


    return (
        <div className="px-24 flex flex-col min-h-screen overflow-hidden">
            <Layout>
                <main  style={{ display: !ispayment  ? "block" : "none" }} className="flex-grow">
                    <div className="w-full flex mx-auto px-4 sm:px-6 justify-center text-3xl">
                        <span className=" font-bold">GIỎ HÀNG CỦA BẠN</span>
                    </div>
                    <section className="bg-white-to-b from-gray-100 to-white mx-auto px-4 sm:px-6">
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
                                            <TableCell align="right">
                                            <Button
                                                variant="outlined"
                                                startIcon={<DeleteIcon />}
                                                onClick={e=>Delete(row.id)}
                                            >
                                                Xóa
                                            </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    {/* <TableRow>
                                        <TableCell rowSpan={3} />
                                        <TableCell colSpan={2}>Tổng tiền</TableCell>
                                        <TableCell align="right">
                                            <NumberFormat thousandSeparator={true} readOnly className=" text-right" value={invoiceSubtotal} suffix=" " />
                                        </TableCell>
                                        <TableCell align="right"></TableCell>

                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Thuế (Nếu có)</TableCell>
                                        <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                                        <TableCell align="right">
                                            <NumberFormat thousandSeparator={true} readOnly className=" text-right" value={invoiceTaxes} suffix=" " />
                                        </TableCell>
                                        <TableCell align="right"></TableCell>

                                    </TableRow> */}
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
                    </section>
                    <div className="w-full flex mx-auto px-4 sm:px-6 justify-between">
                        <div className="pt-2">
                            <textarea id="story" name="story" placeholder="Ghi chú (Bạn có thể ghi chú đơn hàng tại đây.)" className="w-full rounded-sm border-gray-300 border-solid border"
                                rows="4" cols="50">
                            </textarea>
                        </div>
                        <div className="pt-2">
                            <Button
                                variant="outlined"
                                className={classes.button_update}
                                startIcon={<UpdateIcon />}
                                onClick={handleChange}
                            >
                                Cập nhật giỏ hàng
                            </Button>
                            <Button
                                variant="outlined"
                                className={classes.button_payment}
                                startIcon={<PaymentIcon />}
                                onClick={()=>{history.push("/payment")}}
                            >
                                Thanh toán
                      </Button>
                        </div>
                    </div>

                </main>

                {/* <div  style={{ display: ispayment  ? "block" : "none" }}>
                    <Payment/>
                </div> */}
            </Layout>
        </div>
    );
}

export default List;
