(function () {
  try {
    var storedTheme = window.localStorage.getItem('rickAndMortyAppTheme');

    if (storedTheme === 'light') {
      document.documentElement.dataset.theme = 'light';
    }
  } catch {
    document.documentElement.dataset.theme = 'dark';
  }
})();
