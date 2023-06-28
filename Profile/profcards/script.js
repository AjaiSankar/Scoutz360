// Handle download event
function downloadPlayerCard() {
    const cardContainer = document.querySelector('.profile-card');
    html2canvas(cardContainer).then(function(canvas) {
      const link = document.createElement('a');
      link.download = 'player-card.jpg';
      link.href = canvas.toDataURL('image/jpeg');
      link.click();
    });
  }

  const downloadButton = document.getElementById('download-button');
  downloadButton.addEventListener('click', downloadPlayerCard);