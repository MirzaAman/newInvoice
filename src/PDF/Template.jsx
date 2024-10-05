import ReactPrint from 'react-to-print'
import { useRef, useState, useEffect } from 'react';
import Barcode from 'react-barcode';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Close } from '@mui/icons-material'

function PdfTemplate(props) {

    const ref = useRef();
    const [openAirPopup, setAirPopup] = useState(false);


    // const [Products, setProducts] = useState([]);

    const [Item, setItem] = useState('');
    const [Amount, setAmount] = useState(0);


    // const [productName, setProductName] = useState('');
    // const [productAmout, setProductAmount] = useState(0);

    const [List, setList] = useState([]);

    const addData = () => {
        List.push({
            product: Item,
            amount: Amount,
        })
        console.log(List);
        setItem('')
        setAmount('')
        setAirPopup(false);
    }

    let sum = 0;
    List.forEach(amount => {
        sum += parseInt(amount.amount)
    })
    // setTotal(sum)

// discount
    const [openAirPopup2, setAirPopup2] = useState(false);
    const [Discount, setDiscount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);l

    const addDiscount = () => {
        let trail = sum;
        let discount = (trail * Discount) / 100;
        setTotalAmount(sum - discount);
        setAirPopup2(false)
    }

    return (
        <>
            <div className="container" ref={ref} >
                <div className="container">
                    <div className="row">
                        <div >
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-4 brcode">
                                        <Barcode value={`4n%${props.InvoiceNumber}+ut%`} width={1} height={50} displayValue={false} />
                                    </div>
                                    <div className="col-md-8 text-right bbc">
                                        <h4 style={{ color: '#325aa8' }}><strong>M iT</strong></h4>
                                        <p>(+91) 8129004343</p>
                                        <p>mzawyd@gmail.com</p>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <h2 style={{ color: '#325aa8' }} >INVOICE</h2>
                                    </div>
                                </div>
                                <br />
                                <div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th><h5>Services</h5></th>
                                                <th><h5>Amount</h5></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                List.length ?
                                                    List.map((items, index) => {
                                                        return (
                                                            <tr key={index} >
                                                                <td className="col-md-9">{items.product}</td>
                                                                <td className="col-md-3"><i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {items.amount}  </td>
                                                            </tr>
                                                        )
                                                    }) : null
                                            }
                                            <tr>
                                                <td className="text-right">
                                                    <p>
                                                        <strong>Total: </strong>
                                                    </p>
                                                </td>
                                                <td>
                                                    <p>
                                                        <strong><i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {sum}</strong>
                                                    </p>
                                                </td>
                                            </tr>
                                            {
                                                Discount > 0 ?
                                                    <tr style={{ color: '#F81D2D' }}>
                                                        <td className="text-right"><h4><strong>Discount:</strong></h4></td>
                                                        <td className="text-left"><h4><strong><i className="fas fa-rupee-sign" area-hidden="true"></i> {Discount}%  </strong></h4></td>
                                                    </tr>
                                                    :
                                                    null
                                            }
                                            <tr>
                                                <td className="text-right">
                                                    <p>
                                                        <strong>Payable Amount: </strong>
                                                    </p>
                                                </td>
                                                <td>
                                                    <p>
                                                        <strong><i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {totalAmount === 0 ? sum : totalAmount} </strong>
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='details' >
                                    <div className="col-md-12">
                                        <p><b>Date :</b> {props.date} </p>
                                        <br />
                                        <p><b>Mirza Aman</b></p>
                                        <p><b>Contact: (+91) 8129004343</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ReactPrint trigger={() => <button>Print</button>} content={() => ref.current} documentTitle={`INVOICE ${props.InvoiceNumber}`} />

            <button onClick={() => setAirPopup(true)} >Add Product</button>
            {
                sum > 0 ?
                    <button onClick={() => setAirPopup2(true)} >Discount %</button> : null
            }




            {/* POPUP OPEN */}
            <Dialog open={openAirPopup} >
                <DialogTitle>
                    <div className="title">
                        <div className="hed">New product</div>
                        <div className="icon-cross" onClick={() => setAirPopup(false)} ><Close /></div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="container">
                        <div className="forms">
                            <input type="text" value={Item} onChange={(e) => setItem(e.target.value)} placeholder='PR Name' />
                            <input type="text" value={Amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount ₹' />
                        </div>
                        <div className="buttons">
                            <button onClick={addData} >Add</button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            {/* POPUP CLOSED */}

            {/* POPUP OPEN */}
            <Dialog open={openAirPopup2} >
                <DialogTitle>
                    <div className="title">
                        <div className="hed">New product</div>
                        <div className="icon-cross" onClick={() => setAirPopup2(false)} ><Close /></div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="container">
                        <div className="forms">
                            <input type="text" value={Discount} onChange={(e) => setDiscount(e.target.value)} placeholder='Discount %' />
                        </div>
                        <div className="buttons">
                            <button onClick={addDiscount} >Add</button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            {/* POPUP CLOSED */}
        </>

    );
}

export default PdfTemplate;