import { TextField } from '@mui/material';
import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  padding: 50px 100px;
  @media (max-width: 800px) {
    border-radius: 0;
    padding: 5px 20px;
    min-width: 60%;
  }
`;

export const FormHeader = styled.div`
  margin-bottom: 30px;
  text-align: center;
  @media (max-width: 800px) {
    margin-bottom: 5px;
  }
`;

export const FormName = styled.h2`
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  @media (max-width: 800px) {
    margin-block-start: 0;
    margin-block-end: 0;
  }
`;

export const FormInner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  column-gap: 2%;
  @media (max-width: 800px) {
    flex-direction: column-reverse;
  }
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
  width: 100%;
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
  max-width: 353px;
  width: 100%;
  background-color: #fdbf5a;
  align-self: center;
  margin-bottom: 15px;
  @media (max-width: 800px) {
    margin-bottom: 5px;
  }
`;
