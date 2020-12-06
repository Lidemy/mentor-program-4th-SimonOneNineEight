import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getPostById } from "../../WebApi";

const PostWrapper = styled.div`
  padding: 24px;
`;
const PostTitle = styled.div`
  font-size: 36px;
  font-weight: bold;
`;
const PostCreatedAt = styled.div`
  color: #9d9d9d;
  font-size: 12px;
  font-style: italic;
`;
const PostContent = styled.div`
  padding-top: 12px;
  color: #5b5b5b;
  font-size: 16px;
`;
export default function PostPage() {
  const [post, setPost] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getPostById(id).then((post) => setPost(post));
  }, [id]);
  const date = new Date(post.createdAt);
  return (
    <PostWrapper>
      <PostTitle>{post.title}</PostTitle>
      <PostCreatedAt>{date.toLocaleDateString()}</PostCreatedAt>
      <PostContent>{post.body}</PostContent>
    </PostWrapper>
  );
}
