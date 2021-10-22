/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import api from '../../services/api';
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

  handleGetProduct: (product: IProductPlate) => void;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function ProductsTable({
  product,
  handleEditProduct,
  handleGetProduct,
}: IProps) {
  const [, setProducts] = useState<IProductPlate[]>([]);
  function setEditingProduct(): void {
    handleEditProduct(product);
  }

  function setGetingProduct(): void {
    handleGetProduct(product);
  }

  useEffect(() => {
    api.get('products').then(response => setProducts(response.data));
  }, []);

  return (
    <tr key={product.id}>
      <td className="title" onClick={() => setGetingProduct()}>
        {product.title}
      </td>
      <td>{product.quantity}</td>
      <td>
        {new Intl.DateTimeFormat('pt-BR').format(
          new Date(product.created_at),
        ) || product.created_at}
      </td>
      <td>{product.category}</td>
      <button
        type="button"
        className="icon"
        onClick={() => setEditingProduct()}
      >
        <FiEdit3 size={20} />
      </button>
    </tr>
  );
}
