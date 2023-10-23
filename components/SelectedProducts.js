import React from 'react';

const SelectedProducts = ({ selectedProduct, handleDeleteProduct, handleQuantityChange }) => {
  return (
    <div
      key={selectedProduct.id}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #ccc',
        margin: '10px 0',
        borderRadius: '10px',
      }}
    >
      <button
        onClick={() => handleDeleteProduct(selectedProduct.id)}
        style={{ color: 'red', marginLeft: "6px" }}
      >
        &#10005;
      </button>
      <div style={{ width: '25%', textAlign: 'center', }}>
        <p>{selectedProduct.name}</p>
      </div>
      <div style={{ width: '25%', textAlign: 'center' }}>
        <p>{`$${selectedProduct.price.toFixed(2)}`}</p>
      </div>
      <div style={{ width: '25%', textAlign: 'center' }}>
        <div style={{ display: "flex", justifyContent: "space-evenly", paddingRight: "1px" }}>
          <button style={{ height: "25px", marginTop: "10px" }}
            onClick={() => handleQuantityChange(selectedProduct.id, selectedProduct.quantity - 1)}
          >
            -
          </button>
          <p>{selectedProduct.quantity}</p>
          <button style={{ height: "25px", marginTop: "10px" }}
            onClick={() => handleQuantityChange(selectedProduct.id, selectedProduct.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div style={{ width: '25%', textAlign: 'center' }}>
        <p>{`$${(selectedProduct.price * selectedProduct.quantity).toFixed(2)}`}</p>

      </div>
    </div>
  );
};

export default SelectedProducts;
