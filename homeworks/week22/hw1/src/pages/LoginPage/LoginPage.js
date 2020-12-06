import React, { useState, useContext } from "react";
import styled from "styled-components";
import { login, getMe } from "../../WebApi";
import { setTokenToLocalStorage } from "../../utilis";
import { AuthContext } from "../../contexts";

const LoginWrapper = styled.div`
  justify-content: center;
  align-items: center;
  padding-top: 64px;
`;
const LoginBox = styled.div`
  width: 400px;
  height: 320px;
  border: 2px solid #adadad;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;
const LoginDetail = styled.form`
  padding: 28px 32px;
`;
const LoginBoxTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`;
const LoginInputFieldWrapper = styled.div`
  margin: 20px auto;
  & + & {
    margin: 0 auto;
  }
`;
const LoginInputFieldTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 5px;
`;
const LoginInputField = styled.input`
  font-size: 16px;
  width: 300px;
  height: 32px;
  border: 1px solid #adadad;
  padding: 0 10px;
  box-sizing: content-box;
  border-radius: 4px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
`;
const LoginSubmit = styled.input`
  width: 320px;
  height: 24px;
  background-color: white;
  border: 1px solid #adadad;
  box-sizing: content-box;
  padding: 0;
  margin-top: 20px;
  border-radius: 4px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
`;
const ErrorMessage = styled.div`
  color: #ff2d2d;
`;
const EmptyDiv = styled.div`
  height: 22px;
`;
const LoginUsername = ({ username, setUsername }) => {
  return (
    <LoginInputFieldWrapper>
      <LoginInputFieldTitle>Username: </LoginInputFieldTitle>
      <LoginInputField
        type="text"
        placeholder="請輸入帳號"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </LoginInputFieldWrapper>
  );
};
const LoginPassword = ({ password, setPassword }) => {
  return (
    <LoginInputFieldWrapper>
      <LoginInputFieldTitle>Password: </LoginInputFieldTitle>
      <LoginInputField
        type="password"
        placeholder="請輸入密碼"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </LoginInputFieldWrapper>
  );
};

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useContext(AuthContext);
  const handleLoginSubmit = (e) => {
    setErrorMessage("");
    e.preventDefault();
    login(username, password).then((res) => {
      if (res.ok === 0) return setErrorMessage(res.message);
      setTokenToLocalStorage(res.token);
      getMe().then((user) => {
        if (user.ok !== 1) {
          setTokenToLocalStorage(null);
          setErrorMessage(res.message);
          return;
        }
        setUser(user.data);
        window.history.back(-1);
      });
    });
  };
  return (
    <LoginWrapper>
      <LoginBox>
        <LoginDetail onSubmit={handleLoginSubmit}>
          <LoginBoxTitle>登入</LoginBoxTitle>
          <LoginUsername username={username} setUsername={setUsername} />
          <LoginPassword password={password} setPassword={setPassword} />
          {errorMessage ? (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          ) : (
            <EmptyDiv />
          )}
          <LoginSubmit type="submit" />
        </LoginDetail>
      </LoginBox>
    </LoginWrapper>
  );
}
