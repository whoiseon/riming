import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import Link from 'next/link';

interface Props {
  question: string;
  name: string;
  href: string;
  className?: string;
}

function QuestionLink({ question, name, href, className }: Props) {
  return (
    <Block className={className}>
      {question}
      <Link href={href}>{name}</Link>
    </Block>
  );
}

const Block = styled.div`
  color: ${colors.gray3};
  a {
    color: ${colors.main.primary};
    margin-left: 4px;

    &:hover {
      color: ${colors.main.hover};
    }
  }
`;

export default QuestionLink;
