import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getAllPost } from "../../WebApi";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";

const PostListWrapper = styled.div`
  width: 680px;
  padding: 20px 20px 20px 108px;
`;
const PostList = styled.div``;
const Post = styled.div`
  width: 100%;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  & + & {
    padding-top: 24px;
  }
`;
const PostCreatedAt = styled.div`
  color: #9d9d9d;
  font-size: 12px;
  font-style: italic;
`;
const PostTitle = styled.div`
  color: #5b5b5b;
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 12px;
`;
const PostContent = styled.div`
  color: #5b5b5b;
  font-size: 14px;
  max-height: 100px;
  overflow: hidden;
`;
const ReadMore = styled(Link)`
  color: #5b5b5b;
  font-size: 14px;
  font-weight: bold;
  padding-top: 12px;
  cursor: pointer;
`;

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const defaultCurrentPage = 1;
  const pageSize = 5;
  const [postOnPage, setPostOnPage] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    getAllPost().then((posts) => {
      setPosts(posts);
      setPostOnPage(posts.slice(0, pageSize));
      setTotalPage(Math.ceil(posts.length / pageSize));
      setPagination(Array.from({ length: totalPage }).map((_, i) => i + 1));
    });
  }, [totalPage]);
  return (
    <PostListWrapper>
      <Navbar />
      <PostList>
        {postOnPage.map((post) => (
          <Post key={post.id}>
            <PostCreatedAt>
              {new Date(post.createdAt).toLocaleDateString()}
            </PostCreatedAt>
            <PostTitle>{post.title}</PostTitle>
            <PostContent>{post.body}</PostContent>
            {post.body.length > 100 && (
              <ReadMore to={`posts/${post.id}`}>Read More</ReadMore>
            )}
          </Post>
        ))}
        <Pagination
          totalPage={totalPage}
          defaultCurrentPage={defaultCurrentPage}
          pagination={pagination}
          onChange={(currentPage) => {
            const newPostOnPage = posts.slice(
              (currentPage - 1) * 5,
              currentPage * 5
            );
            setPostOnPage(newPostOnPage);
          }}
        />
      </PostList>
    </PostListWrapper>
  );
}
