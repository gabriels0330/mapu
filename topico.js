function selectTheme(theme) {
  localStorage.setItem('selectedTheme', theme);
  const folderPath = `questions_${theme}/`;
  const fileName = `${theme}.html`;
  window.location.href = folderPath + fileName;
}

function navigateTo(page) {
  window.location.href = page;
}