// pages/index.js
import React, { useState } from 'react';
import products from '../products';
import ProductCard from '@/components/ProductCard';
import SelectedProducts from '@/components/SelectedProducts';
import ReceiptPopup from '@/components/ReceiptPopup';

const Index = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [vatTax, setVatTax] = useState('');
  const [discount, setDiscount] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);


  const subTotal = selectedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const totalBeforeDiscount = subTotal + (subTotal * (vatTax / 100));
  const total = totalBeforeDiscount - (totalBeforeDiscount * (discount / 100));

  const handleItemClick = (product) => {
    setSelectedProducts((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex((p) => p.id === product.id);

      if (existingProductIndex !== -1) {
        const updatedProducts = [...prevProducts];
        updatedProducts[existingProductIndex].quantity += 1;
        return updatedProducts;
      } else {
        const newProduct = { ...product, quantity: 1 };
        return [...prevProducts, newProduct];
      }
    });
  };

  const handleDeleteProduct = (productId) => {
    setSelectedProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 0) {
      setSelectedProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === productId ? { ...p, quantity: newQuantity } : p))
      );
    }
  };


  const handleCancelSale = () => {
    setSelectedProducts([]);
    setVatTax('');
    setDiscount('');
  };

  const showReceiptPopup = () => {
    setShowReceipt(true);
  };

  const closeReceiptPopup = () => {
    setShowReceipt(false);
    setVatTax('');
    setDiscount('');
  };


  const selectedProductsListStyle = {
    maxHeight: '210px',
    overflowY: 'auto',
    marginTop: "5px",
    padding: "8px"
  };
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 2, padding: '20px', marginLeft: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ width: '25%', textAlign: 'center' }}>
            <p>PRODUCTS</p>
          </div>
          <div style={{ width: '25%', textAlign: 'center' }}>
            <p>PRICE</p>
          </div>
          <div style={{ width: '25%', textAlign: 'center' }}>
            <p>QUANTITY</p>
          </div>
          <div style={{ width: '25%', textAlign: 'center' }}>
            <p>TOTAL</p>
          </div>
        </div>
        <div style={{ height: '50px', width: '100%', backgroundColor: 'gray', paddingTop: '7px' }}>
          <p style={{ textAlign: 'center' }}>
            {selectedProducts.length > 0
              ? 'SELECTED PRODUCTS'
              : 'THERE ARE NO PRODUCTS'}
          </p>
        </div >
        <div style={selectedProducts.length > 3 ? selectedProductsListStyle : {}}>
          {selectedProducts.map((selectedProduct) => (
            <SelectedProducts selectedProduct={selectedProduct} handleDeleteProduct={handleDeleteProduct} handleQuantityChange={handleQuantityChange} />
          ))}
        </div>
        <table style={{ marginTop: '60px', width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ padding: '8px' }}>Sub Total:</td>
              <td style={{ padding: '8px' }}>${subTotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>VAT Tax (%):</td>
              <td style={{ padding: '8px' }}>
                <input
                  type="text"
                  placeholder="VAT Tax"
                  value={vatTax}
                  onChange={(e) => setVatTax(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>Discount (%):</td>
              <td style={{ padding: '8px' }}>
                <input
                  type="text"
                  placeholder="Discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>Total:</td>
              <td style={{ padding: '8px' }}>${total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <div style={{ padding: '10px' }}>
          <button
            onClick={handleCancelSale}
            style={{
              width: '200px',
              marginRight: '5px',
              backgroundColor: 'red',
              color: 'white',
              padding: '8px',
              borderRadius: '5px',
              border: 'none',
            }}
          >
            CANCEL SALE
          </button>
          <button
            onClick={showReceiptPopup}
            style={{
              width: '200px',
              backgroundColor: 'green',
              color: 'white',
              padding: '8px',
              borderRadius: '5px',
              border: 'none',
            }}
            disabled={selectedProducts.length === 0}
          >
            PROCESS SALE
          </button>
        </div>
        {/* Receipt popup */}
        <ReceiptPopup showReceipt={showReceipt} closeReceiptPopup={closeReceiptPopup} selectedProducts={selectedProducts} subTotal={subTotal}
          vatTax={vatTax} discount={discount} total={total} />

      </div>
      {/* product details */}
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '600px' }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} handleItemClick={handleItemClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;