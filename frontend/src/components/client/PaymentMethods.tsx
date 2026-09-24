import React, { useState } from 'react';
import './styles/Billing.css';

const paymentMethods = [
  {
    type: 'Credit Card',
    cardNumber: '**** **** **** 1234',
    name: 'John Doe',
    expiry: '12/25',
  },
  {
    type: 'PayPal',
    email: 'john@example.com',
  },
];

const PaymentMethods = () => {
  const [showModal, setShowModal] = useState(false);
  const [methods, setMethods] = useState(paymentMethods);
  const [newMethod, setNewMethod] = useState({
    type: 'Credit Card',
    name: '',
    cardNumber: '',
    expiry: '',
    email: '',
  });

  const handleAddPayment = () => {
    setMethods([...methods, newMethod]);
    setNewMethod({ type: 'Credit Card', name: '', cardNumber: '', expiry: '', email: '' });
    setShowModal(false);
  };

  return (
    <div className="billing-section">
      <div className="flex-between mb-4">
        <h2>Payment Methods</h2>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + Add Payment Method
        </button>
      </div>

      <div className="methods-list">
        {methods.map((method, index) => (
          <div className="method-card" key={index}>
            <h4>{method.type}</h4>
            {method.cardNumber && <p>Card: {method.cardNumber}</p>}
            {method.name && <p>Name: {method.name}</p>}
            {method.expiry && <p>Expires: {method.expiry}</p>}
            {method.email && <p>Email: {method.email}</p>}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Add Payment Method</h3>

            <label>
              Type
              <select
                value={newMethod.type}
                onChange={(e) =>
                  setNewMethod({ ...newMethod, type: e.target.value })
                }
              >
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
              </select>
            </label>

            {newMethod.type === 'Credit Card' && (
              <>
                <label>
                  Name on Card
                  <input
                    type="text"
                    value={newMethod.name}
                    onChange={(e) =>
                      setNewMethod({ ...newMethod, name: e.target.value })
                    }
                  />
                </label>
                <label>
                  Card Number
                  <input
                    type="text"
                    value={newMethod.cardNumber}
                    onChange={(e) =>
                      setNewMethod({ ...newMethod, cardNumber: e.target.value })
                    }
                  />
                </label>
                <label>
                  Expiry
                  <input
                    type="text"
                    value={newMethod.expiry}
                    onChange={(e) =>
                      setNewMethod({ ...newMethod, expiry: e.target.value })
                    }
                  />
                </label>
              </>
            )}

            {newMethod.type === 'PayPal' && (
              <label>
                PayPal Email
                <input
                  type="email"
                  value={newMethod.email}
                  onChange={(e) =>
                    setNewMethod({ ...newMethod, email: e.target.value })
                  }
                />
              </label>
            )}

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleAddPayment}>
                Add Payment Method
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
