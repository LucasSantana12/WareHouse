/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';

interface IProductPlate {
  id: string;
  title: string;
  quantity: number;
  description: string;
  category: string;
  created_at: string;
}

interface IProps {
  product: IProductPlate;

  handleEditProduct: (product: IProductPlate) => void;
}

const Product: React.FC<IProps> = ({ product, handleEditProduct }: IProps) => {
  function setEditingProduct(): void {
    handleEditProduct(product);
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

        <p className="description">{product.description}</p>

        <p className="quantity">
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
        </div>
      </section>
    </Container>
  );
};

export default Product;
