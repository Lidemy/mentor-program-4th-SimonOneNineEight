import React from "react";
import styled from "styled-components";

const AboutMeWrapper = styled.div`
  margin-top: 64px;
`;
const AboutMeBox = styled.div`
  display: flex;
  width: 600px;
  height: 233px;
`;
const AboutMeContentWrapper = styled.div`
  width: 400px;
  padding: 16px 0;
  margin: 0 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;
const AboutMeTitle = styled.div`
  color: #5b5b5b;
  font-size: 28px;
  font-weight: bold;
  padding-bottom: 24px;
`;
const AboutMeContent = styled.div`
  color: #5b5b5b;
  font-size: 16px;
`;
const AboutMeAvatar = styled.div`
  width: 200px;
  height: 200px;
  background-color: black;
  padding: 16px;
`;
export default function AboutPage() {
  return (
    <AboutMeWrapper>
      <AboutMeBox>
        <AboutMeContentWrapper>
          <AboutMeTitle>壹玖捌</AboutMeTitle>
          <AboutMeContent>
            一個經濟系畢業卻不喜歡經濟相關工作，工作了一小陣子發現不能沒有硬實力，所以開始學習成為網頁前端工程師！希望未來可以帶著自己的專業到世界各地工作看看！
          </AboutMeContent>
        </AboutMeContentWrapper>
        <AboutMeAvatar />
      </AboutMeBox>
    </AboutMeWrapper>
  );
}
