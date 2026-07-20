// main.js
// Simple entry point for a JavaScript application.

const getMessage = () => {
  return "Hello from main.js";
};

const render = () => {
  const message = getMessage();

  if (typeof document !== "undefined") {
    const root = document.getElementById("app") || document.body;
    root.textContent = message;
  } else if (typeof process !== "undefined" && process.stdout) {
    process.stdout.write(`${message}\n`);
  }
};

const main = () => {
  render();
};

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", main);
} else {
  main();
}

export default main;
