import { NavLink, Link, Outlet } from "react-router";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Test404Link = styled(Link)`
  position: fixed;
  top: 6px;
  right: 10px;
  z-index: 20;
  font-size: 11px;
  color: #94a3b8;
  text-decoration: none;

  &:hover {
    color: #64748b;
    text-decoration: underline;
  }
`;

const HeaderInner = styled.div`
  max-width: 680px;
  margin: 0 auto;
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brand = styled.span`
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
`;

const Nav = styled.nav`
  display: flex;
  gap: 8px;
`;

const MenuLink = styled(NavLink)`
  padding: 8px 14px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  transition: all 0.15s ease;

  &:hover {
    background-color: #f1f5f9;
    color: #0f172a;
  }

  &.active {
    background-color: #3b82f6;
    color: #ffffff;
  }
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  padding: 36px 20px;
`;

export default function Layout() {
  return (
    <Container>
      {/* 우측 상단 구석 404 테스트용 링크 */}
      <Test404Link to="/not-found-test">404테스트</Test404Link>

      {/* 공통 상단 헤더 */}
      <Header>
        <HeaderInner>
          <Brand>Todo App</Brand>
          <Nav>
            <MenuLink to="/" end>
              홈
            </MenuLink>
            <MenuLink to="/todos">할 일</MenuLink>
            <MenuLink to="/signup">회원가입</MenuLink>
          </Nav>
        </HeaderInner>
      </Header>

      {/* 페이지별 본문 영역 */}
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
}
