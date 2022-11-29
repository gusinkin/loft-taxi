import styled from 'styled-components';
// import Button from '@mui/material/Button';

export const Page = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: ${({ loading }) => (loading ? 'block' : 'none')};
  }
`;

export const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  display: ${({ loading }) => (loading ? 'block' : 'none')};
`;

export const SideBar = styled.div`
  background-color: #1c1a19;
  width: 34%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginPageContent = styled.div`
  width: 66%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  padding: 50px 100px;
`;

export const FormHeader = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

export const FormName = styled.h2`
  text-align: center;
  font-size: 30px;
  font-weight: 700;
`;

export const FormInner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  column-gap: 2%;
`;

export const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  column-gap: 15%;
  margin-bottom: 15px;
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FormLabel = styled.label`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 15px;
`;

export const FormInput = styled.input`
  margin-bottom: 15px;
  border-width: 0;
  border-bottom-width: 1px;
  outline: none;
  font-size: 18px;
  font-weight: 400;
  width: 100%;
`;

export const FormSubmit = styled.button`
  font-size: 24px;
  font-weight: 400;
  line-height: 1;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  padding: 21px 41px;
  width: 353px;
  background-color: #fdbf5a;
  margin-bottom: 15px;
  align-self: center;
`;

export const Button = styled.button`
  background: transparent;
  border: none;
  color: #fdbf5a;
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
`;
