// Add comment to a post
const newFormHandler = async (event) => {
  event.preventDefault();
  var postId = document.location.pathname
  postId = postId.split('/');
  postId = postId[2];

  const content = document.querySelector('#comment-desc').value.trim();
  if (content) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ post_id: postId, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert('You must be logged in to add a comment');
    }
  }
};

// Delete a comment from a post
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('You can only delete your own comments.');
    }
  }
};


document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.comments-list')
  .addEventListener('click', delButtonHandler);