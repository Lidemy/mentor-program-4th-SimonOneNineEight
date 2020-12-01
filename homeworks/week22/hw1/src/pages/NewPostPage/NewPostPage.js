import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { newPost } from "../../WebApi";

const NewPostWrapper = styled.div`
  justify-content: center;
  align-items: center;
  padding-top: 64px;
`;
const NewPostBox = styled.div`
  width: 500px;
  height: 740px;
  border: 2px solid #adadad;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;
const BoxTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  padding-top: 28px;
`;
const NewPostDetail = styled.form``;
const InputFieldTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 5px;
`;
const NewPostInputWrapper = styled.div`
  padding: 15px 0;
`;
const NewPostTitle = styled.input`
  font-size: 16px;
  width: 400px;
  height: 32px;
  border: 1px solid #adadad;
  padding: 0 10px;
  box-sizing: content-box;
  border-radius: 4px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
`;
const NewPostContent = styled.textarea`
  font-size: 16px;
  width: 400px;
  height: 400px;
  border: 1px solid #adadad;
  padding: 10px 10px;
  box-sizing: content-box;
  border-radius: 4px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
`;
const NewPostSubmit = styled.input`
  width: 420px;
  height: 24px;
  background-color: white;
  border: 1px solid #adadad;
  box-sizing: content-box;
  padding: 0;
  margin-top: 10px;
  border-radius: 4px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
`;
const ErrorMessage = styled.div`
  color: #ff2d2d;
`;
const EmptyDiv = styled.div`
  height: 22px;
`;
const NewPostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const { user } = useContext(AuthContext);
  if (!user) return history.push("/");
  const handleNewPostSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return setErrorMessage("請輸入標題及內容！");
    newPost(title, content).then((res) => {
      console.log(res);
      history.push("/");
    });
  };
  return (
    <NewPostWrapper>
      <NewPostBox>
        <BoxTitle>新增文章</BoxTitle>
        <NewPostDetail onSubmit={handleNewPostSubmit}>
          <NewPostInputWrapper>
            <InputFieldTitle>文章標題：</InputFieldTitle>
            <NewPostTitle
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </NewPostInputWrapper>
          <NewPostInputWrapper>
            <InputFieldTitle>文章內容：</InputFieldTitle>
            <NewPostContent
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </NewPostInputWrapper>
          {errorMessage ? (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          ) : (
            <EmptyDiv />
          )}
          <NewPostSubmit type="submit" />
        </NewPostDetail>
      </NewPostBox>
    </NewPostWrapper>
  );
};

export default NewPostPage;
