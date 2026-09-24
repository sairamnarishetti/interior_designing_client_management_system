
// PaymentPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const invoice = location.state;

  if (!invoice) {
    return (
      <div className="payment-page">
        <h2>No invoice selected</h2>
        <p>Please return to the invoice page and select an invoice to pay.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const cardNumber = form.cardNumber.value;
    const expiry = form.expiry.value;
    const cvv = form.cvv.value;

    const paymentData = {
      amount: Number(invoice.amount.replace(/[^0-9.-]+/g, "")),
      date: new Date(),
      orderId: invoice.id,
      project: invoice.project,
    };

    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(paymentData),
      });
      navigate('/payment-success');
    } catch (err) {
      alert('Payment failed!');
    }
  };

  return (
    <div className="payment-page">
      <h2>Payment for {invoice.id}</h2>
      <div className="invoice-details">
        <p><strong>Project:</strong> {invoice.project}</p>
        <p><strong>Amount:</strong> {invoice.amount}</p>
        <p><strong>Due Date:</strong> {invoice.dueDate}</p>
      </div>

      <form className="payment-form" onSubmit={handleSubmit}>
        <label>
          Card Number:
          <input name="cardNumber" type="text" placeholder="1234 5678 9012 3456" required />
        </label>
        <label>
          Expiry Date:
          <input name="expiry" type="text" placeholder="MM/YY" required />
        </label>
        <label>
          CVV:
          <input name="cvv" type="text" placeholder="123" required />
        </label>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentPage;