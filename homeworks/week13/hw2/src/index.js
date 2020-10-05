/* eslint import/no-unresolved: 0 */
/* eslint no-use-before-define: 0 */
/* eslint no-useless-escape: 0 */
/* eslint no-shadow: 0 */
/* eslint prefer-destructuring: 0 */
/* eslint import/prefer-default-export: 0 */

import $ from 'jquery';
import { getCommentsFromAPI, addCommentToApi } from './api';
import { appendCommentToDOM } from './utils';


export function init(option) {
  let totalCommentsShowed = 5;
  const apiUrl = option.url;
  const siteKey = option.siteKey;
  const containerSelector = $(option.containerSelector);
  const addCommentFormClassName = `${siteKey}-add-comment-form`;
  const btnGetMoreCommentId = `${siteKey}-btn_get_more_comment`;
  const CommentListClassName = `${siteKey}-comments-list`;
  const addCommentFormSelector = `.${addCommentFormClassName}`;
  const CommentListSelector = `.${CommentListClassName}`;
  const btnGetMoreCommentSelector = `#${btnGetMoreCommentId}`;


  const getForm = (addCommentFormClassName, CommentListClassName, btnGetMoreCommentId) => {
    const formTemplate = `
    <div>
      <form class='${addCommentFormClassName} mt-4'>
      <div class="form-group">
        <label for="add_comment_nickname">暱稱：</label>
        <input name="nickname" type="text" class="form-control" id="add_comment_nickname" placeholder="請輸入暱稱">
      </div>
      <label for="add_comment_content">輸入留言內容：</label>
      <textarea name="content" class="form-control" id="add_comment_content" rows="3"></textarea>
      <button type="submit" class="btn btn-primary mt-3 btn_add_comment">送出</button>
      </form>
      <div class='divider border border-light mt-4'></div>
      <div class='${CommentListClassName}'>
      </div>
      <button id="${btnGetMoreCommentId}" type="button" class="btn btn-primary mt-3 mb-3">載入更多</button>
    </div>
    `;
    return formTemplate;
  };

  containerSelector.append(
    getForm(addCommentFormClassName, CommentListClassName, btnGetMoreCommentId),
  );
  getComments(apiUrl, siteKey, totalCommentsShowed, 0);
  // Post new comments to API and get back to lists
  $(addCommentFormSelector).on('submit', (e) => {
    e.preventDefault();
    addComment(apiUrl, siteKey);
  });

  // Get more comments
  let offset = 0;
  $(btnGetMoreCommentSelector).on('click', () => {
    totalCommentsShowed += 5;
    offset += 5;
    getComments(apiUrl, siteKey, totalCommentsShowed, offset);
  });
  function getComments(apiUrl, siteKey, totalCommentsShowed, offset) {
    getCommentsFromAPI(apiUrl, siteKey, (data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      const comments = data.comments;
      const length = comments.length;
      if (length < totalCommentsShowed) {
        $(btnGetMoreCommentSelector).addClass('d-none');
      }

      for (let i = offset; i < totalCommentsShowed; i += 1) {
        if (i <= length) {
          appendCommentToDOM($(CommentListSelector), comments[i], true);
        }
      }
    });
  }

  function addComment(apiUrl, siteKey) {
    const newCommentInfo = {
      site_key: siteKey,
      nickname: $(`${addCommentFormSelector} input[name="nickname"]`).val(),
      content: $(`${addCommentFormSelector} textarea[name='content']`).val(),
    };
    addCommentToApi(apiUrl, newCommentInfo, (data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      $(CommentListSelector).empty();
      getComments(apiUrl, siteKey, totalCommentsShowed, 0);
      $(`${addCommentFormSelector} input[name="nickname"]`).val('');
      $(`${addCommentFormSelector} textarea[name='content']`).val('');
    });
  }
}
