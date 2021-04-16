import React, { useState } from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';

interface IProductPlate {
  id: number;
  title: string;
  picture_id: string;
  quantity: number;
  description: string;
  category: string;
}

interface IProps {
  product: IProductPlate;

  handleDelete: (id: number) => {};

  handleEditFood: (food: IProductPlate) => void;
}

const Product: React.FC<IProps> = ({
  product,

  handleDelete,

  handleEditFood,
}: IProps) => {
  async function toggleAvailable(): Promise<void> {
    // TODO UPDATE STATUS (available)
  }

  function setEditingFood(): void {
    // TODO - SET THE ID OF THE CURRENT ITEM TO THE EDITING FOOD AND OPEN MODAL
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
            onClick={() => setEditingFood()}
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
