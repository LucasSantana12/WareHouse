import styled from 'styled-components';

export const Container = styled.div`
  background: #87ceeb;
  margin-bottom: 0;
  justify-content: center;
  align-items: center;
`;
export const FoodsContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 0;
  align-items: center;
  justify-content: center;
  margin-top: -140px;
  display: grid;

  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;
`;
