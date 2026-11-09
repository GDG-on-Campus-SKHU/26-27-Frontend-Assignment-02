import { Link } from "react-router";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: 56px 24px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  text-align: center;
`;

const Code = styled.p`
  font-size: 48px;
  font-weight: 800;
  color: #3b82f6;
  margin: 0 0 8px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 12px;
`;

const Description = styled.p`
  font-size: 15px;
  color: #64748b;
  margin: 0 0 28px;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  border-radius: 10px;
  background-color: #3b82f6;
  color: #ffffff;
  text-decoration: none;
  font-size: 15px;
  font-weight: 700;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #2563eb;
  }
`;

export default function NotFound() {
  return (
    <Wrapper>
      <Code>404</Code>
      <Title>페이지를 찾을 수 없습니다</Title>
      <Description>
        요청하신 주소가 잘못되었거나 존재하지 않는 페이지입니다.
      </Description>
      <HomeLink to="/">홈으로 돌아가기</HomeLink>
    </Wrapper>
  );
}
