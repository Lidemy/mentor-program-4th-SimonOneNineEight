import React from "react";
import styled from "styled-components";
import Question from "./Question";
const { useState } = React;

const FormWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #d0d0d0;
`;
const FormBoxWrapper = styled.div`
  padding: 100px 0;
  margin: 0 auto;
  width: 645px;
`;
const BoxTop = styled.div`
  content: "";
  background-color: #fad312;
  height: 8px;
`;
const BoxBody = styled.div`
  background-color: #ffffff;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
`;
const BoxDetailWrapper = styled.div`
  padding: 35px 40px;
`;
const FormInfo = styled.div``;
const FormTitle = styled.div`
  font-size: 36px;
  font-weight: bold;
`;
const InfoDetail = styled.div`
  font-size: 14px;
`;
const Star = styled.div`
  font-size: 13px;
  color: #e74149;
  padding: 20px 0;
`;
const QuestionList = styled.form``;
const Submit = styled.input`
  background-color: #fad312;
  font-size: 15px;
  border: 0;
  padding: 10px 25px;
  cursor: pointer;
`;
const Footer = styled.div`
  height: 60px;
  width: 100%;
  text-align: center;
  font-size: 13px;
  line-height: 50px;
  color: #999999;
  background-color: #000000;
`;
const FormBox = ({ questions, answer, handleInput, handleSubmit }) => {
  return (
    <FormBoxWrapper>
      <BoxTop />
      <BoxBody>
        <BoxDetailWrapper>
          <FormInfo>
            <FormTitle>新拖延運動報名表單</FormTitle>
            <InfoDetail>
              活動日期：2020/12/10 ~ 2020/12/11
              <br />
              活動地點：台北市大安區新生南路二段1號
            </InfoDetail>
            <Star>* 必填</Star>
          </FormInfo>
          <QuestionList>
            {questions.map((question, key) => (
              <Question
                key={key}
                question={question}
                answer={answer}
                handleInput={handleInput}
              />
            ))}
            <Submit
              type="submit"
              onClick={(data) => {
                handleSubmit(data);
              }}
            />
          </QuestionList>
        </BoxDetailWrapper>
      </BoxBody>
    </FormBoxWrapper>
  );
};

const Form = () => {
  const questions = [
    {
      id: 0,
      content: "暱稱",
      discription: null,
      must: true,
      type: "text",
      name: "nickname",
      placeholder: "您的暱稱",
    },
    {
      id: 1,
      content: "電子郵件",
      discription: null,
      must: true,
      type: "text",
      name: "email",
      placeholder: "您的電子郵件",
    },
    {
      id: 2,
      content: "手機號碼",
      discription: null,
      must: true,
      type: "text",
      name: "phoneNumber",
      placeholder: "您的手機號碼",
    },
    {
      id: 3,
      content: "報名類型",
      discription: null,
      must: true,
      type: "radio",
      name: "applyType",
      option: ["躺在床上用想像力實作", "趴在地上滑手機找現成的"],
    },
    {
      id: 4,
      content: "怎麼知道這個活動的",
      discription: null,
      must: true,
      type: "text",
      name: "whyKnowEvent",
      placeholder: "您的回答",
    },
    {
      id: 5,
      content: "其他",
      discription: null,
      must: false,
      type: "text",
      name: "other",
      placeholder: "您的回答",
    },
  ];

  const questionName = [];
  for (let i = 0; i < questions.length; i++) {
    questionName.push(questions[i].name);
  }

  let answerObj = { hasEmpty: false };
  for (let i = 0; i < questionName.length; i++) {
    const key = questionName[i];
    answerObj = { ...answerObj, [key]: "" };
  }

  const [answer, setAnswer] = useState(answerObj);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAnswer({
      ...answer,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].must === true && answer[questions[i].name] === "") {
        setAnswer({ ...answer, hasEmpty: true });
        return;
      }
    }
  };

  return (
    <FormWrapper>
      <FormBox
        questions={questions}
        answer={answer}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
      />
      <Footer>© 2020 © Copyright. All rights Reserved.</Footer>
    </FormWrapper>
  );
};

export default Form;
