import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface IProductPlate {
  id: string;
  title: string;
  quantity: number;
  description: string;
  category: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateProduct: (food: Omit<IProductPlate, 'id'>) => void;
  editingProduct: IProductPlate;
}

interface IEditProductData {
  title: string;
  quantity: number;
  description: string;
  category: string;
}

const ModalEditProduct: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingProduct,
  handleUpdateProduct,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IEditProductData) => {
      handleUpdateProduct(data);
      setIsOpen();
    },
    [handleUpdateProduct, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingProduct}>
        <h1>Editar Produto</h1>
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

export default ModalEditProduct;
