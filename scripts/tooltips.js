export function initTooltips() {
  document.querySelectorAll("*[data-description]").forEach((el) => {
    el.querySelector("*:first-of-type").addEventListener("click", () => {
      alert(el.dataset.description);
    });
  });
}
