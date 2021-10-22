import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
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
  editingProduct: IProductPlate;
}

interface IEditProductData {
  title: string;
  quantity: number;
  description: string;
  category: string;
  created_at: string;
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

        <TextArea name="description" placeholder="Descrição" />
        <Select name="category" placeholder="Categoria">
          <option>Selecione um categoria</option>
          <option value="informática">informática</option>
          <option value="mecânica">Mecânica</option>
        </Select>

        <button type="submit">
          <p className="text">Editar Produto</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditProduct;
