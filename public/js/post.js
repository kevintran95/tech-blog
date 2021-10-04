// Create a new post
const newFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#content-desc').value.trim();
  const title = document.querySelector('#title-desc').value.trim();
  if (content && title) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ content , title }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create post');
    }
  }
};

// Delete button for post
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('You can only delete your own posts.');
    }
  }
};



document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.posts-list')
  .addEventListener('click', delButtonHandler);