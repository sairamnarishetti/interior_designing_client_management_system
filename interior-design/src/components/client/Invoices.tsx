import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Input = ({ ...props }) => (
  <input className="border p-2 rounded w-full" {...props} />
);

const Button = ({ children, variant, ...props }) => (
  <button
    className={`px-4 py-2 rounded font-medium ${
      variant === "outline"
        ? "border border-gray-300"
        : "bg-black text-white hover:bg-gray-800"
    }`}
    {...props}
  >
    {children}
  </button>
);

const Dialog = ({ open, children }) =>
  open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {children}
    </div>
  ) : null;

const DialogContent = ({ children }) => (
  <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
    {children}
  </div>
);

const DialogHeader = ({ children }) => <div className="mb-4">{children}</div>;
const DialogTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

const Invoices = () => {
  const navigate = useNavigate();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);

  const invoices = [
    {
      id: "INV-001",
      date: "2024-06-01",
      dueDate: "2024-06-10",
      project: "Living Room Design",
      amount: "$1,500.00",
      status: "Pending",
    },
    {
      id: "INV-002",
      date: "2024-05-15",
      dueDate: "2024-05-30",
      project: "Kitchen Renovation",
      amount: "$3,200.00",
      status: "Paid",
    },
  ];

  const handleView = (invoice) => {
    setSelectedInvoice(invoice);
    setShowPDFModal(true);
  };

  const handlePay = (invoice) => {
    setSelectedInvoice(invoice);
    setShowPayModal(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Invoices</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Invoice #</th>
            <th className="p-3">Date</th>
            <th className="p-3">Due Date</th>
            <th className="p-3">Project</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-t">
              <td className="p-3">{invoice.id}</td>
              <td className="p-3">{invoice.date}</td>
              <td className="p-3">{invoice.dueDate}</td>
              <td className="p-3">{invoice.project}</td>
              <td className="p-3">{invoice.amount}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 text-sm rounded ${
                    invoice.status === "Paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {invoice.status}
                </span>
              </td>
              <td className="p-3 flex gap-2">
                <Button onClick={() => handleView(invoice)} variant="outline">
                  View
                </Button>
                {invoice.status !== "Paid" && (
                  <Button onClick={() => handlePay(invoice)}>Pay Now</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Modal */}
      <Dialog open={showPDFModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Started</DialogTitle>
          </DialogHeader>
          <p>Your invoice PDF is being downloaded.</p>
          <div className="mt-4">
            <Button variant="outline" onClick={() => setShowPDFModal(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pay Modal */}
      <Dialog open={showPayModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pay Invoice</DialogTitle>
          </DialogHeader>

          {selectedInvoice && (
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded text-sm space-y-1">
                <p><strong>Invoice #:</strong> {selectedInvoice.id}</p>
                <p><strong>Date:</strong> {selectedInvoice.date}</p>
                <p><strong>Due Date:</strong> {selectedInvoice.dueDate}</p>
                <p><strong>Total Amount:</strong> {selectedInvoice.amount}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Method</label>
                <select className="w-full border p-2 rounded">
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                </select>

                <Input placeholder="Name on Card" />
                <Input placeholder="Card Number" />
                <div className="flex gap-2">
                  <Input placeholder="MM/YY" />
                  <Input placeholder="CVV" />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setShowPayModal(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setShowPayModal(false);
                    navigate("/pay", { state: selectedInvoice });
                  }}
                >
                  Pay {selectedInvoice.amount}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Invoices;
