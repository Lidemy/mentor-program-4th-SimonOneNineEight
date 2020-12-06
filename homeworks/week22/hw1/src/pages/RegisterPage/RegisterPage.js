import React, { useState, useContext } from "react";
import styled from "styled-components";
import { getMe, register } from "../../WebApi";
import { getTokenFromLocalStorage, setTokenToLocalStorage } from "../../utilis";
import { AuthContext } from "../../contexts";

const RegisterWrapper = styled.div`
  justify-content: center;
  align-items: center;
  padding-top: 64px;
`;
const RegisterBox = styled.div`
  width: 400px;
  height: 420px;
  border: 2px solid #adadad;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;
const RegisterDetail = styled.form`
  padding: 28px 32px;
`;
const RegisterBoxTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`;
const RegisterInputFieldWrapper = styled.div`
  margin: 20px auto;
`;
const RegisterInputFieldTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 5px;
`;
const RegisterInputField = styled.input`
  font-size: 16px;
  width: 300px;
  height: 32px;
  border: 1px solid #adadad;
  padding: 0 10px;
  box-sizing: content-box;
  border-radius: 4px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
`;
const RegisterSubmit = styled.input`
  width: 320px;
  height: 24px;
  background-color: white;
  border: 1px solid #adadad;
  box-sizing: content-box;
  padding: 0;
  border-radius: 4px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
`;
const ErrorMessage = styled.div`
  color: #ff2d2d;
`;
const EmptyDiv = styled.div`
  height: 22px;
`;
const RegisterUsername = ({ username, setUsername }) => {
  return (
    <RegisterInputFieldWrapper>
      <RegisterInputFieldTitle>Username: </RegisterInputFieldTitle>
      <RegisterInputField
        type="text"
        placeholder="請輸入帳號"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </RegisterInputFieldWrapper>
  );
};
const RegisterPassword = ({ password, setPassword }) => {
  return (
    <RegisterInputFieldWrapper>
      <RegisterInputFieldTitle>Password: </RegisterInputFieldTitle>
      <RegisterInputField
        type="password"
        placeholder="請輸入密碼"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </RegisterInputFieldWrapper>
  );
};
const RegisterNickname = ({ nickname, setNickname }) => {
  return (
    <RegisterInputFieldWrapper>
      <RegisterInputFieldTitle>Nickname: </RegisterInputFieldTitle>
      <RegisterInputField
        type="text"
        placeholder="請輸入暱稱"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
    </RegisterInputFieldWrapper>
  );
};

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useContext(AuthContext);
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!username || !password || !nickname)
      return setErrorMessage("請輸入所有欄位");
    register(username, password, nickname).then((res) => {
      console.log(res);
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
    <RegisterWrapper>
      <RegisterBox>
        <RegisterDetail onSubmit={handleRegisterSubmit}>
          <RegisterBoxTitle>註冊</RegisterBoxTitle>
          <RegisterUsername username={username} setUsername={setUsername} />
          <RegisterPassword password={password} setPassword={setPassword} />
          <RegisterNickname nickname={nickname} setNickname={setNickname} />
          {errorMessage ? (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          ) : (
            <EmptyDiv />
          )}
          <RegisterSubmit type="submit" />
        </RegisterDetail>
      </RegisterBox>
    </RegisterWrapper>
  );
}
