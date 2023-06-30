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