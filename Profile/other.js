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
