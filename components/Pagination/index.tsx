import { Container, Content, Icons, Pages } from "./styles";

import Left from "../../public/images/left.svg";
import Right from "../../public/images/right.svg";

const Pagination: React.FC = () => {
  const page = 1;
  const totalPages = 4;
  return (
    <Container>
      <Content>
        <Pages>
          Page {page} of {totalPages}
        </Pages>
        <Icons>
          <button type="button" onClick={() => console.log(1)}>
            <Left />
          </button>
          <button type="button" onClick={() => console.log(1)}>
            <Right />
          </button>
        </Icons>
      </Content>
    </Container>
  );
};

export default Pagination;
