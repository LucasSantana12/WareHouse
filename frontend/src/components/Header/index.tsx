import React from 'react';

import { FiPlusSquare } from 'react-icons/fi';

import { Form } from '@unform/web';
import { Container } from './styles';

import Logo from '../../assets/logo_dashboard.svg';

interface IHeaderProps {
  openModal: () => void;
}

const Header: React.FC<IHeaderProps> = ({ openModal }) => (
  <Container>
    <header>
      <div className="header">
        <img src={Logo} alt="Fucapi Warehouse" />

        <a href="/">Produtos</a>
        <a href="/">Empretismos</a>
        <nav>
          <div>
            <button type="button" onClick={openModal}>
              <div className="text">Novo Produto</div>

              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </div>
      <div className="button">
        <input placeholder="Digite o nome do produto" />
        <button type="submit">Pesquisar</button>
      </div>
    </header>
  </Container>
);

export default Header;
