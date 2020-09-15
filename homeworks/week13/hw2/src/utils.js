/* eslint import/prefer-default-export: 0 */
/* eslint no-useless-escape: 0 */

export const escapeOutput = (toOutput) => {
  toOutput
    .replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F');
  return toOutput;
};

export function appendCommentToDOM(container, comment, isAppend) {
  const html = `
    <div class="card mt-3">
      <div class="card-body">
        <h5 class="card-title">${escapeOutput(comment.nickname)}</h5>
        <p class="card-text">${escapeOutput(comment.content)}</p>
      </div>
    </div>`;

  if (isAppend) {
    container.append(html);
  } else {
    container.prepend(html);
  }
}
