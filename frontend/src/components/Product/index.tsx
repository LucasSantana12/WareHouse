import React, { useState } from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';

interface IProductPlate {
  id: string;
  title: string;
  quantity: number;
  description: string;
  category: string;
}

interface IProps {
  product: IProductPlate;

  handleDelete: (id: string) => {};

  handleEditProduct: (product: IProductPlate) => void;
}

const Product: React.FC<IProps> = ({
  product,

  handleDelete,

  handleEditProduct,
}: IProps) => {
  async function toggleAvailable(): Promise<void> {
    // TODO UPDATE STATUS (available)
  }

  async function handleDeleteProduct(id: string): Promise<void> {
    console.log(product.id);
  }

  function setEditingProduct(): void {
    handleEditProduct(product);
    console.log(product);
  }

  return (
    <Container>
      <header>
        <img
          src="https://segredosdomundo.r7.com/wp-content/uploads/2018/05/destaque-18.jpg"
          alt={product.title}
        />
      </header>

      <section className="body">
        <h2>{product.title}</h2>

        <p>{product.description}</p>

        <p className="price">
          <b>Quantidade disponivel:{product.quantity}</b>
        </p>
      </section>

      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingProduct()}
            data-testid={`edit-food-${product.id}`}
          >
            <FiEdit3 size={20} />
          </button>
          <button
            type="button"
            className="icon"
            onClick={() => handleDeleteProduct(product.id)}
            data-testid={`remove-product-${product.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>
      </section>
    </Container>
  );
};

export default Product;
