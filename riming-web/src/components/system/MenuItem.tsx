import styled from '@emotion/styled';

interface Props {
  thumbnail?: boolean;
  hasArrowButton?: boolean;
  isMoreButton?: boolean;
  text: string;
}

function MenuItem({ thumbnail, hasArrowButton, isMoreButton, text }: Props) {
  return <Block></Block>;
}

const Block = styled.li``;

export default MenuItem;
