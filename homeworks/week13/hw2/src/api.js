/* eslint import/no-unresolved: 0 */
import $ from 'jquery';

export function getCommentsFromAPI(apiUrl, siteKey, cb) {
  $.ajax({
    type: 'GET',
    url: (`${apiUrl}/api_comments.php/?site_key=${siteKey}`),
  }).done((resp) => {
    cb(resp);
  });
}

export function addCommentToApi(apiUrl, newCommentInfo, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comment.php`,
    data: newCommentInfo,
  }).done((resp) => {
    cb(resp);
  });
}
