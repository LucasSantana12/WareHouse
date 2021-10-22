import React, { useRef, useCallback } from 'react';

import { FiCheckSquare, FiEdit3 } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import TextArea from '../TextArea';
import Select from '../Select';

interface IProductPlate {
  id: string;
  title: string;
  quantity: number;
  description: string;
  category: string;
  created_at: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateProduct: (food: Omit<IProductPlate, 'id' | 'created_at'>) => void;
  getingProduct: IProductPlate;
  handleEditProduct: (product: IProductPlate) => void;
}

interface IGetProductData {
  id: string;
  title: string;
  quantity: number;
  description: string;
  category: string;
  created_at: string;
}

const ModalGetProduct: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  getingProduct,
  handleUpdateProduct,
  handleEditProduct,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IGetProductData) => {
      handleUpdateProduct(data);
      setIsOpen();
    },
    [handleUpdateProduct, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={getingProduct}>
        <h1>{getingProduct.title}</h1>
        <Input name="title" placeholder="Notebook Dell" />
        <Input name="quantity" placeholder="Ex: 19" />

        <TextArea name="description" placeholder="Descrição" />
        <Select name="category" placeholder="Categoria">
          <option>Selecione um categoria</option>
          <option value="informática">informática</option>
          <option value="mecânica">Mecânica</option>
        </Select>
      </Form>
    </Modal>
  );
};

export default ModalGetProduct;
