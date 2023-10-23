import React from 'react';

const ReceiptPopup = ({ showReceipt, closeReceiptPopup, selectedProducts, subTotal, vatTax, discount, total }) => {


  return (
    <>
      <div
        style={{
          display: showReceipt ? 'block' : 'none',
          position: 'fixed',
          zIndex: 1,
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          overflow: 'auto',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            margin: '15% auto',
            padding: '20px',
            border: '1px solid #888',
            width: '80%',
          }}
        >
          <span
            style={{
              color: '#aaa',
              float: 'right',
              fontSize: '28px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onClick={closeReceiptPopup}
          >
            &times;
          </span>
          <h2 style={{ textAlign: 'center' }}>Receipt</h2>
          <p>Date: {new Date().toLocaleString()}</p>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Product Name</th>
                <th style={{ textAlign: 'center' }}>Total Quantity</th>
                <th style={{ textAlign: 'right' }}>Total Amount</th>
              </tr>
            </thead>
            <br />
            <tbody>
              {selectedProducts.map((selectedProduct) => (
                <tr key={selectedProduct.id}>
                  <td style={{ textAlign: 'left' }}>{selectedProduct.name}</td>
                  <td style={{ textAlign: 'center' }}>{selectedProduct.quantity}</td>
                  <td style={{ textAlign: 'right' }}>
                    ${selectedProduct.price * selectedProduct.quantity.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <p style={{ textAlign: 'right' }}>Sub Total: ${subTotal.toFixed(2)}</p>

          <p style={{ textAlign: 'right' }}>VAT Tax (%): {vatTax}%</p>

          <p style={{ textAlign: 'right' }}>Discount (%): {discount}%</p>
          <hr />
          <p style={{ textAlign: 'right' }}>Total: ${total.toFixed(2)}</p>
          <button
            onClick={closeReceiptPopup}
            style={{
              width: '200px',
              margin: '0 auto',
              backgroundColor: 'red',
              color: 'white',
              padding: '8px',
              borderRadius: '5px',
              border: 'none',
              display: 'block',
            }}
          >
            Close
          </button>
        </div>

      </div>
    </>
  );
};

export default ReceiptPopup;


