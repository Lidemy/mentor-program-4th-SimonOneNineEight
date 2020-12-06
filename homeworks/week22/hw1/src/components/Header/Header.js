import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { setTokenToLocalStorage } from "../../utilis";

const HeaderWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  text-align: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const HeaderFunctionWrapper = styled.div`
  display: flex;
`;
const SiteTitleWrapper = styled.div`
  margin: 6px 20px;
`;
const SiteTitle = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  font-size: 28px;
  font-weight: bold;
  color: #6c6c6c;
`;
const HashTagWrapper = styled.div`
  display: flex;
`;
const HashTag = styled.div`
  font-size: 8px;
  color: #9d9d9d;
  & + & {
    padding-left: 4px;
  }
`;
const FunctionWrapper = styled.div`
  display: flex;
  padding: 25px 20px;
`;
const HeaderFunction = styled(Link)`
  font-size: 16px;
  color: #6c6c6c;
  cursor: pointer;
  text-decoration: none;
  & + & {
    padding-left: 24px;
  }
  ${(props) => props.$active && `font-weight: bold;`}
`;
const LoginWrapper = styled.div`
  display: flex;
  padding: 25px 20px;
`;
const Login = styled(Link)`
  font-size: 16px;
  color: #6c6c6c;
  cursor: pointer;
  text-decoration: none;
  & + & {
    padding-left: 24px;
  }
`;
const Logout = styled.div`
  font-size: 16px;
  color: #6c6c6c;
  cursor: pointer;
  text-decoration: none;
`;

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();
  const handleLogout = () => {
    setTokenToLocalStorage(null);
    setUser(null);
    if (location.pathname !== "/") {
      history.push("/");
    }
  };
  return (
    <HeaderWrapper>
      <HeaderFunctionWrapper>
        <SiteTitleWrapper>
          <SiteTitle to="/">壹玖捌's Blog</SiteTitle>
          <HashTagWrapper>
            <HashTag>#工程師</HashTag>
            <HashTag>#隨意聊</HashTag>
          </HashTagWrapper>
        </SiteTitleWrapper>
        <FunctionWrapper>
          <HeaderFunction to="/about">關於我</HeaderFunction>
          {user && <HeaderFunction to="/new-post">新增文章</HeaderFunction>}
        </FunctionWrapper>
      </HeaderFunctionWrapper>
      <LoginWrapper>
        {!user && <Login to="/register">註冊</Login>}
        {!user && <Login to="/login">登入</Login>}
        {user && <Logout onClick={handleLogout}>登出</Logout>}
      </LoginWrapper>
    </HeaderWrapper>
  );
};

export default Header;
