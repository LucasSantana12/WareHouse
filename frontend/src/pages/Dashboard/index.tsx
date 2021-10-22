/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import api from '../../services/api';

import Product from '../../components/Product';

import ModalAddProduct from '../../components/ModalAddProduct';

import ModalEditProduct from '../../components/ModalEditProduct';

import { Container, Table } from './styles';
import { ProductsTable } from '../../components/ProductsTable';
import ModalGetProduct from '../../components/ModalGetProduct';

interface IProductPlate {
  id: string;
  title: string;
  quantity: number;
  description: string;
  category: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<IProductPlate[]>([]);

  const [editingProduct, setEditingProduct] = useState<IProductPlate>(
    {} as IProductPlate,
  );
  const [getingProduct, setGetingProduct] = useState<IProductPlate>(
    {} as IProductPlate,
  );

  const [modalOpen, setModalOpen] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [getModalOpen, setGetModalOpen] = useState(false);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await api.get('/products');

      setProducts(response.data);
    }

    loadProducts();
  }, []);

  async function handleAddProduct(
    product: Omit<IProductPlate, 'id' | 'created_at'>,
  ): Promise<void> {
    try {
      const response = await api.post('/products', {
        ...product,
      });

      setProducts([...products, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateProduct(
    product: Omit<IProductPlate, 'id' | 'created_at'>,
  ): Promise<void> {
    // TODO UPDATE A FOOD PLATE ON THE API
    try {
      const response = await api.put(`/products/${editingProduct}`, {
        ...editingProduct,
        ...product,
      });

      setProducts(
        products.map(mappedProduct =>
          mappedProduct.id === editingProduct.id
            ? { ...response.data }
            : mappedProduct,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }
  function toggleGetModal(): void {
    setGetModalOpen(!getModalOpen);
  }

  function handleEditProduct(product: IProductPlate): void {
    // TODO SET THE CURRENT EDITING FOOD ID IN THE STATE
    setEditingProduct(product);
    toggleEditModal();
  }
  function handleGetProduct(product: IProductPlate): void {
    // TODO SET THE CURRENT EDITING FOOD ID IN THE STATE
    setGetingProduct(product);
    toggleGetModal();
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddProduct
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddProduct={handleAddProduct}
      />
      <ModalEditProduct
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        handleUpdateProduct={handleUpdateProduct}
        editingProduct={editingProduct}
      />
      <ModalGetProduct
        isOpen={getModalOpen}
        setIsOpen={toggleGetModal}
        getingProduct={getingProduct}
        handleUpdateProduct={handleUpdateProduct}
        handleEditProduct={handleEditProduct}
      />
      <Container />
      <Table>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Data de cadastro</th>
              <th>Categoria</th>
              <th>Editar</th>
            </tr>
            <tbody>
              {products &&
                products.map(product => (
                  // <Product
                  //   key={product.id}
                  //   product={product}
                  //   handleEditProduct={handleEditProduct}
                  //   />
                  <ProductsTable
                    key={product.id}
                    product={product}
                    handleEditProduct={handleEditProduct}
                    handleGetProduct={handleGetProduct}
                  />
                ))}
            </tbody>
          </thead>
        </table>
      </Table>
    </>
  );
};

export default Dashboard;
