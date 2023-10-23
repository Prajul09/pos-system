import React, { useState } from 'react';

const ProductCard = ({ product, handleItemClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClickDisabled, setIsClickDisabled] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const handleClick = () => {
        if (!isClickDisabled) {
            setIsClickDisabled(true);
            handleItemClick(product);
            setTimeout(() => {
                setIsClickDisabled(false);
            }, 500);
        }
    };

    return (
        <div
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                cursor: 'pointer',
                position: 'relative',
                width: '150px',
                height: '150px',
                margin: '10px',
                overflow: 'hidden',
                border: '1px solid #ccc',
                borderRadius: '10px',
            }}
        >
            <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%' }}
            />
            {isHovered && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.9)',
                        textAlign: 'center',
                        padding: '5px 0',
                    }}
                >
                    <p style={{ fontWeight: 'bold', color: 'black', margin: '0' }}>{product.name}</p>
                    <p style={{ color: 'black' }}>{`Price: $${product.price.toFixed(2)}`}</p>
                    <p style={{ color: 'black' }}>{product.description}</p>
                </div>
            )}
        </div>
    );
};

export default ProductCard;
