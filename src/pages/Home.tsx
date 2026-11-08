import { Link } from "react-router";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: 48px 32px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 12px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #475569;
  margin: 0 0 32px;
`;

const LinkGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const ActionLink = styled(Link)<{ $primary?: boolean }>`
  padding: 12px 24px;
  border-radius: 10px;
  text-decoration: none;
  font-size: 15px;
  font-weight: 700;
  background-color: ${({ $primary }) => ($primary ? "#3b82f6" : "#f1f5f9")};
  color: ${({ $primary }) => ($primary ? "#ffffff" : "#334155")};
  transition: all 0.15s ease;

  &:hover {
    background-color: ${({ $primary }) => ($primary ? "#2563eb" : "#e2e8f0")};
  }
`;

export default function Home() {
  return (
    <Wrapper>
      <Title>오늘의 할 일에 오신 것을 환영합니다</Title>
      <Description>
        하루의 할 일을 손쉽게 추가하고, 진행 상태별로 체계적으로 관리해 보세요.
      </Description>
      <LinkGroup>
        <ActionLink to="/todos/all" $primary>
          할 일 보러 가기
        </ActionLink>
        <ActionLink to="/signup">회원가입 하기</ActionLink>
      </LinkGroup>
    </Wrapper>
  );
}
