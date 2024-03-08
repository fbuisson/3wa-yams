import React from 'react';
import styled from 'styled-components';

const Dice = ({ value }) => {
  return (
    <DiceComponent>
      <span>{value}</span>
    </DiceComponent>
  );
};

export default Dice;

const DiceComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10px;
  height: 10px;
  padding: 10px;
  border: 2px solid black;
  border-radius: 5px;
  margin: 5px;
`;
