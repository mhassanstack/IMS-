import React, { useEffect, useState, useRef } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";

import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { Table, Modal, Button } from "antd";
import "../styles/InvoiceStyles.css";

const BillsPage = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [popupModal, setPopModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get("/api/bills/get-bills");
      setBillsData(data);
      dispatch({ type: "HIDE_LOADING" });
      //   console.log(data);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };
  // useEffect
  useEffect(() => {
    getAllBills();
    // eslint-disable-next-line
  }, []);
  //   Print Function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // table data
  const columns = [
    { title: "ID", dataIndex: "_id" },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    { title: "Contact No", dataIndex: "customerNumber" },
    { title: "Sub Total", dataIndex: "subTotal" },
    { title: "Tax", dataIndex: "tax" },
    { title: "Total Amount", dataIndex: "totalAmount" },

    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            style={{ Cursor: "pointer" }}
            onClick={() => {
              setSelectedBill(record);
              setPopModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Invoice List</h1>
      </div>

      <Table columns={columns} dataSource={billsData} bordered />

      {popupModal && (
        <Modal
          title="Invoice Details"
          open={popupModal}
          onCancel={() => {
            setPopModal(false);
          }}
          footer={false}>
          {/*========== invoice modal start ==========*/}
          <div id="invoice-ims" ref={componentRef}>
            <center id="top">
              <div className="logo" />
              <div className="info">
                <h2>Abdullah IMS</h2>
                <p> Contact : +92 307 6873536 | Gujrat</p>
              </div>
              {/*End Info*/}
            </center>
            {/*End InvoiceTop*/}
            <div id="mid">
              <div className="mt-2">
                <p>
                  Customer Name : <b>{selectedBill.customerName}</b>
                  <br />
                  Phone No : <b>{selectedBill.customerNumber}</b>
                  <br />
                  Date : <b>{selectedBill.date.toString().substring(0, 10)}</b>
                  <br />
                </p>
                <hr style={{ margin: "5px" }} />
              </div>
            </div>
            {/*End Invoice Mid*/}
            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item">
                        <h2>Item</h2>
                      </td>
                      <td className="Hours">
                        <h2>Qty</h2>
                      </td>
                      <td className="Rate">
                        <h2>Price</h2>
                      </td>
                      <td className="Rate">
                        <h2>Total</h2>
                      </td>
                    </tr>
                    {selectedBill.cartItems.map((item) => (
                      <>
                        <tr className="service">
                          <td className="tableitem">
                            <p className="itemtext">{item.name}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.quantity}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.price}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">
                              {item.quantity * item.price}
                            </p>
                          </td>
                        </tr>
                      </>
                    ))}

                    <tr className="tabletile">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>Tax</h2>
                      </td>
                      <td className="payment">
                        <h2>${selectedBill.tax}</h2>
                      </td>
                    </tr>
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>Grand Total</h2>
                      </td>
                      <td className="payment">
                        <h2>
                          <b>${selectedBill.totalAmount}</b>
                        </h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/*End Table*/}
              <div id="legalcopy">
                <p className="legal">
                  <stong>Thank you for your order!</stong> 10% GST application
                  on total amount.Please note that this is non Refundable Amount
                  for any Assistance Please Write Email
                  <b> help@gmail.com</b>
                </p>
              </div>
            </div>
            {/*End invoicebot*/}
          </div>
          {/*End Invoice*/}
          <div className="d-flex justify-content-end mt-3">
            <Button type="primary" onClick={handlePrint}>
              Print
            </Button>
          </div>
          {/*========== invoice modal ends ==========*/}
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;
