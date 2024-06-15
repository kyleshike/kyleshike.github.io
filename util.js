let lastMessage;
function log(message) {
  if (lastMessage === message) return;
  console.log(message);
  lastMessage = message;
}

document.querySelectorAll("*[data-description]").forEach((el) => {
  el.querySelector("td:first-of-type").addEventListener("click", () => {
    alert(el.dataset.description);
  });
});

document.querySelectorAll("section").forEach((section) => {
  section.querySelector("h2").addEventListener("click", () => {
    state.set("hiddenSections", {
      ...state.get("hiddenSections"),
      [section.id]: !state.get("hiddenSections")[section.id],
    });
  });
});
