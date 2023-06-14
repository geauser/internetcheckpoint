export default() => {
  // manually add the script to the DOM
  const script = document.createElement('script');
  script.src = 'https://platform.twitter.com/widgets.js'
  script.async = true;
  document.head.appendChild(script);
}
