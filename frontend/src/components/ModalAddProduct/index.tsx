import React, { useCallback, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import TextArea from '../TextArea';
import Select from '../Select';

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
  handleAddProduct: (product: Omit<IProductPlate, 'id'>) => void;
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

        <h3>Titulo</h3>
        <Input name="title" placeholder="Notebook Dell" />
        <h3>Quantidade</h3>
        <Input name="quantity" type="number" placeholder=" Ex: 19" />
        <h3>Descrição</h3>

        <TextArea
          name="description"
          placeholder="Sistema Operacional: Windows 10 ..."
        />
        <h3>Categoria</h3>
        <Select name="category" placeholder="Categoria">
          <option>Selecione uma categoria</option>
          <option value="informática">informática</option>
          <option value="mecânica">Mecânica</option>
          <option value="robótica">Robótica</option>
          <option value="eletrônica">Eletrônica</option>
        </Select>

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
