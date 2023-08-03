const chatButton = document.querySelector(".chat-button");
const chatContainer = document.querySelector(".chat-container");
const chatClose = document.querySelector(".chat-close");

// Open chat container when chat button is clicked
chatButton.addEventListener("click", () => {
  chatContainer.style.display = "block";
});

// Close chat container when close button is clicked
chatClose.addEventListener("click", () => {
  chatContainer.style.display = "none";
});

// const editButton = document.querySelector(".edit-button");
// const closeButton = document.querySelector(".close-button");
// const uploadPopup = document.querySelector(".upload-popup");

// editButton.addEventListener("click", () => {
//   uploadPopup.style.display = "block";
// });

// closeButton.addEventListener("click", () => {
//   uploadPopup.style.display = "none";
// });

/*Player contact and skill pop up*/
document.addEventListener("DOMContentLoaded", function () {
  const contactInfoButton = document.querySelector(".contact-info-button");
  const contactInfoPopup = document.querySelector(".contact-info-popup");
  const playerSkillsButton = document.querySelector(".player-skills-button");
  const playerSkillsPopup = document.querySelector(".player-skills-popup");
  const closePopupButtons = document.querySelectorAll(".close-popup");

  contactInfoButton.addEventListener("click", function () {
    contactInfoPopup.style.display = "block";
  });

  playerSkillsButton.addEventListener("click", function () {
    playerSkillsPopup.style.display = "block";
  });

  closePopupButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const popup = this.parentNode;
      popup.style.display = "none";
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const addMoreSkillsButton = document.querySelector(".add-skill-button");
  const addSkillForm = document.querySelector(".add-skill-form");
  const cancelSkillButton = document.querySelector(".cancel-skill-button");

  addMoreSkillsButton.addEventListener("click", function () {
    addMoreSkillsButton.style.display = "none";
    addSkillForm.style.display = "block";
  });

  cancelSkillButton.addEventListener("click", function () {
    addMoreSkillsButton.style.display = "block";
    addSkillForm.style.display = "none";
  });
});
