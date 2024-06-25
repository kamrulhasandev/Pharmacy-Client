import React from "react";
import Image from "next/image";
import "./ProductModal.css";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{product.name}</h2>
          
        </div>
        <div className="modal-body">
          <div className="modal-image">
            <Image src={product.image} alt={product.name} width={300} height={300} />
          </div>
          <div className="modal-details">
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Category:</strong> {product.category.name}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Dosage Form:</strong> {product.dosageForm}</p>
            <p><strong>Strength:</strong> {product.strength}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Expiration Date:</strong> {product.expirationDate}</p>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="modal-action-button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
