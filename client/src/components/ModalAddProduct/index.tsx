import React, { useCallback, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface IProductPlate {
  id: number;
  title: string;
  picture_id: string;
  quantity: number;
  description: string;
  category: string;
}

interface ICreateProductData {
  title: string;
  picture_id: string;
  quantity: number;
  description: string;
  category: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddProduct: (food: Omit<IProductPlate, 'id'>) => void;
}

const ModalAddProduct: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddProduct,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateProductData) => {
      handleAddProduct(data);

      setIsOpen();
    },
    [handleAddProduct, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Produto</h1>

        <Input name="title" placeholder="Notebook Dell" />
        <Input name="quantity" placeholder="Ex: 19" />

        <Input name="description" placeholder="Descrição" />
        <Input name="category" placeholder="Categoria" />

        <button type="submit">
          <p className="text">Adicionar Produto</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddProduct;
