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
      <img src={Logo} alt="Fucapi" />
    </header>
  </Container>
);

export default Header;
