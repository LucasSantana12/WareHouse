import React from 'react';

import { FiPlusSquare } from 'react-icons/fi';

import { Container } from './styles';

import Logo from '../../assets/logo_dashboard.svg';

interface IHeaderProps {
  openModal: () => void;
}

const Header: React.FC<IHeaderProps> = ({ openModal }) => (
  <Container>
    <header>
      <img src={Logo} alt="GoRestaurant" />

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
    </header>
  </Container>
);

export default Header;
