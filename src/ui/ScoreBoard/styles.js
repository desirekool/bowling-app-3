import styled from 'styled-components';

export const ScoreWrapper = styled.div`
  display: flex;
  flex: 1;  
`;

export const FinalScore = styled.div`
    align-self: flex-end;
    flex: 0;
    min-width: 110px;
    border: 1px solid grey;
    height: auto;
    margin: 20px 0;
    border-left: 0;
    height: 64px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 17px;
`;

export const ScoreboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;  
`;
