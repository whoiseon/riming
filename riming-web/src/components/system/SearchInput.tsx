import styled from '@emotion/styled';
import Input, { type Props as InputProps } from './Input';
import SearchIcon from '@/assets/vectors/search.svg';
import { colors } from '@/styles/colors';

interface Props extends InputProps {}

function SearchInput(props: InputProps) {
  return (
    <Block>
      <SearchGroup>
        <SearchIcon />
        <Input {...props} />
      </SearchGroup>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  width: 100%;
  padding: 16px;

  input {
    width: 100%;
    padding-left: 48px;
  }

  svg {
    position: absolute;
    top: 8px;
    left: 16px;
    width: 24px;
    height: 24px;
    color: ${colors.gray2};
  }
`;

const SearchGroup = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

export default SearchInput;
