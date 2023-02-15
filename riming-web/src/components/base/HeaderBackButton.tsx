import styled from '@emotion/styled';
import ArrowBackIcon from '@/assets/vectors/arrow-left.svg';

interface Props {
  onClick?: () => void;
}

function HeaderBackButton({ onClick }: Props) {
  return (
    <IconButton onClick={onClick}>
      <ArrowBackIcon />
    </IconButton>
  );
}

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-left: -8px;
`;

export default HeaderBackButton;
