import React, { useState, useEffect } from 'react';

import { isCatchClause } from 'typescript';
import Header from '../../components/Header';

import api from '../../services/api';

import Product from '../../components/Product';

import ModalAddProduct from '../../components/ModalAddProduct';

import ModalEditProduct from '../../components/ModalEditProduct';

import { ProductsContainer, Container } from './styles';

interface IProductPlate {
  id: string;
  title: string;
  quantity: number;
  description: string;
  category: string;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<IProductPlate[]>([]);

  const [editingProduct, setEditingProduct] = useState<IProductPlate>(
    {} as IProductPlate,
  );

  const [modalOpen, setModalOpen] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await api.get('/products');

      setProducts(response.data);
    }

    loadProducts();
  }, []);

  async function handleAddProduct(
    product: Omit<IProductPlate, 'id'>,
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
    product: Omit<IProductPlate, 'id'>,
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

  async function handleDeleteFood(id: string): Promise<void> {
    // TODO DELETE A FOOD PLATE FROM THE API
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditProduct(product: IProductPlate): void {
    // TODO SET THE CURRENT EDITING FOOD ID IN THE STATE
    setEditingProduct(product);
    toggleEditModal();
  }

  return (
    <>
      <Container>
        <Header openModal={toggleModal} />
        <ModalAddProduct
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddProduct={handleAddProduct}
        />
        <ModalEditProduct
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingProduct={editingProduct}
          handleUpdateProduct={handleUpdateProduct}
        />
        <ProductsContainer>
          {products &&
            products.map(product => (
              <Product
                key={product.id}
                product={product}
                handleDelete={handleDeleteFood}
                handleEditProduct={handleEditProduct}
              />
            ))}
        </ProductsContainer>
      </Container>
    </>
  );
};

export default Dashboard;
