import styled from 'styled-components';

export const Header = styled.header`
  background-color: #1c1a19;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* flex: 1; */
  /* это чтобы при сужении хедер убирать */
`;

export const HeaderList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
`;

export const HeaderButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ active }) => (active ? '#fdbf5a' : '#fff')};
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  margin: 0 20px;
`;
