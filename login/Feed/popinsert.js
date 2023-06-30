// Purpose: To handle the popup for adding a new post
const addPostButton = document.getElementById('add-post-button');
const popup = document.getElementById('popup');
const closePopupButton = document.getElementById('close-popup');
const uploadForm = document.getElementById('upload-form');

addPostButton.addEventListener('click', () => {
  popup.style.display = 'block';
});

closePopupButton.addEventListener('click', () => {
  popup.style.display = 'none';
});

uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Handle form submission here
  // You can access the uploaded file and caption using e.target.elements
  // For example: const file = e.target.elements['file-upload'].files[0];
  //              const caption = e.target.elements['caption'].value;
  popup.style.display = 'none';
});

