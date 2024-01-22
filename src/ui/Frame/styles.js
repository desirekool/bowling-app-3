import styled from 'styled-components';

export const FrameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid grey;  
  margin: 20px 0;
  ${props => !props.LastFrame ? 'border-right: 0;': null}
`;

export const FrameNumber = styled.div`
  display: inline-block;
  height: 30px;
  line-height: 28px;
  background: #f1f1f1;  
`;

export const FramePinsWrapper = styled.div`
  display: flex;
  border-top: 1px solid grey;    
`;

export const FrameCurrentScore = styled.div`
  display: inline-block;
  height: 50px;
  line-height: 48px;  
`;

export const Throw = styled.div`
  display: inline-block;
  height: 30px;
  width: 30px;
  line-height: 28px;
  border-bottom: 1px solid grey;  
`;

export const StrikeThrow = styled(Throw)`
  ${props => !props.LastFrame ? 'border: 0': null};
  width:50px
`;

export const SpareThrow = styled(Throw)`
  border-left: 1px solid grey;
  border-right: 1px solid grey;
`;

export const BonusThrow = styled(Throw)`
  
`;
