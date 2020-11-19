import React from "react";
import styled from "styled-components";

const QuestionWrapper = styled.div`
  padding: 20px 0;
`;
const QuestionDetailWrapper = styled.div`
  display: flex;
  padding-bottom: 20px;
`;
const QuestionContent = styled.div`
  font-size: 20px;
`;
const QuestionDiscription = styled.div`
  font-size: 13px;
`;
const InputField = styled.input`
  width: 287px;
  height: 23px;
`;
const Must = styled.div`
  font-size: 20px;
  padding-left: 3px;
  color: #e74149;
`;
const Warning = styled.div`
  color: #e74149;
  font-size: 16px;
  font-weight: bold;
`;
const Blank = styled.div`
  content: "";
  padding: 11px 0;
`;
const QuestionDetail = ({ content, must }) => {
  return (
    <QuestionDetailWrapper>
      <QuestionContent>{content}</QuestionContent>
      {must ? <Must>*</Must> : null}
    </QuestionDetailWrapper>
  );
};
const Question = ({ question, handleInput, answer }) => {
  const {
    content,
    discription,
    must,
    name,
    type,
    placeholder,
    option,
  } = question;
  if (type === "text") {
    return (
      <QuestionWrapper>
        <QuestionDetail content={content} must={must} />
        <QuestionDiscription>{discription}</QuestionDiscription>
        <InputField
          type="text"
          name={name}
          placeholder={placeholder}
          value={answer[question.name]}
          onChange={handleInput}
        />
        {question.must && answer.hasEmpty && answer[question.name] === "" ? (
          <Warning>此欄位為必填欄位</Warning>
        ) : (
          <Blank> </Blank>
        )}
      </QuestionWrapper>
    );
  } else if (type === "radio") {
    return (
      <QuestionWrapper>
        <QuestionDetail content={content} must={must} />
        <QuestionDiscription>{discription}</QuestionDiscription>
        {option.map((option, value) => (
          <div key={value}>
            <label>
              <input
                type="radio"
                name={name}
                value={value}
                onChange={handleInput}
              />
              {option}
            </label>
          </div>
        ))}
        {question.must && answer.hasEmpty && answer[question.name] === "" ? (
          <Warning>此欄位為必填欄位</Warning>
        ) : (
          <Blank> </Blank>
        )}
      </QuestionWrapper>
    );
  }
};

export default Question;
