import "./constants.js";
import "./elements.js";
import { watchDB, watchForAuthChange } from "./firebase.js";
import { initTooltips } from "./tooltips.js";
import { initializeState } from "./state.js";
import { applyEventListeners } from "./forms.js";

initializeState();

document.addEventListener("DOMContentLoaded", () => {
  watchDB();
  watchForAuthChange();
  initTooltips();
  applyEventListeners();
});
