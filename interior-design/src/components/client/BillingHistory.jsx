import React from 'react';
import './styles/Billing.css';

const BillingHistory = () => {
  const history = []; // Empty array to simulate no history

  return (
    <div className="billing-section">
      <h2>Billing History</h2>
      {history.length === 0 ? (
        <div className="no-history">
          <p>No billing history available</p>
          <p className="total-billed">Total Billed: $0.00</p>
        </div>
      ) : (
        <table className="billing-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.description}</td>
                <td>{entry.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BillingHistory;
