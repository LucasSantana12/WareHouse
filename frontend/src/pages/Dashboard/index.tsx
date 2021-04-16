import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import api from '../../services/api';

import Product from '../../components/Product';

import ModalAddProduct from '../../components/ModalAddProduct';

// import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer, Container } from './styles';

interface IProductPlate {
  id: number;
  title: string;
  picture_id: string;
  quantity: number;
  description: string;
  category: string;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<IProductPlate[]>([]);

  const [editingFood, setEditingFood] = useState<IProductPlate>(
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

  async function handleUpdateFood(
    product: Omit<IProductPlate, 'id'>,
  ): Promise<void> {
    // TODO UPDATE A FOOD PLATE ON THE API
  }

  async function handleDeleteFood(id: number): Promise<void> {
    // TODO DELETE A FOOD PLATE FROM THE API
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IProductPlate): void {
    // TODO SET THE CURRENT EDITING FOOD ID IN THE STATE
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
        {/* <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
        /> */}
        <FoodsContainer>
          {products &&
            products.map(product => (
              <Product
                key={product.id}
                product={product}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </Container>
    </>
  );
};

export default Dashboard;
