import styled from 'styled-components';

export const Container = styled.div`
  background: #87ceeb;
`;
export const FoodsContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 0;
  margin-top: -140px;
  justify-content: center;
  display: grid;

  grid-template-columns: repeat(3, 1fr);
  grid-gap: 22px;
`;
