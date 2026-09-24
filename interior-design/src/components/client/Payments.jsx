import React, { useEffect, useState } from 'react';
import './styles/Payments.css';

const Payments = () => {
  const [paymentsData, setPaymentsData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/payments')
      .then(res => res.json())
      .then(data => setPaymentsData(data));
  }, []);

  return (
    <div className="payment-history">
      <div className="payment-header">
        <h3>Payment History</h3>
        <button className="payment-button">Make Payment</button>
      </div>

      {paymentsData.length === 0 ? (
        <div className="no-payments">
          <p>No payment history available</p>
          <p className="total-amount">Total Amount: $0.00</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {paymentsData.map((payment, index) => (
              <tr key={index}>
                <td>{payment.date}</td>
                <td>{payment.description}</td>
                <td>{payment.amount}</td>
                <td>
                  <span className={`status ${payment.status.toLowerCase()}`}>
                    {payment.status}
                  </span>
                </td>
                <td><button className="view-receipt">View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Payments;
