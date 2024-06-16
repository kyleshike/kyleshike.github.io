const localState = localStorage.getItem("state");

function disableAllInputsAndButtons() {
  const inputs = document.querySelectorAll("input, button, select, textarea");
  inputs.forEach((input) => {
    input.disabled = true;
  });
}

// Function to enable all inputs and buttons
function enableAllInputsAndButtons() {
  const inputs = document.querySelectorAll("input, button, select, textarea");
  inputs.forEach((input) => {
    input.disabled = false;
  });
}

const mods = {
  proficiency: parseInt(document.getElementById("proficiencyBonus").innerHTML),
  str: parseInt(document.getElementById("strMod").innerHTML),
  dex: parseInt(document.getElementById("dexMod").innerHTML),
  con: parseInt(document.getElementById("conMod").innerHTML),
  int: parseInt(document.getElementById("intMod").innerHTML),
  wis: parseInt(document.getElementById("wisMod").innerHTML),
  char: parseInt(document.getElementById("charMod").innerHTML),
};

const state = {
  _store: localState ? JSON.parse(localState) : {},
  get: (key) => state._store[key],
  set: (key, value) => {
    if (state._store[key] === value) return;

    state._store[key] = value;
    applyState();
    saveState();
  },
};

function applyState() {
  document.querySelector('input[name="hitPoints"]').value =
    state.get("hp") ?? document.querySelector('input[name="hitPoints"]').max;
  document.querySelector('input[name="gold"]').value = state.get("gold") ?? 0;
  document.querySelector('input[name="electrum"]').value =
    state.get("electrum") ?? 0;
  document.querySelector('input[name="silver"]').value =
    state.get("silver") ?? 0;
  document.querySelector('input[name="copper"]').value =
    state.get("copper") ?? 0;
  document.querySelector('input[name="mistyStepConsumed"]').checked =
    state.get("mistyStepConsumed");
  if (isEditor) {
    document.getElementById("portentDieOne").innerHTML =
      state.get("portentDieOne");
    document.getElementById("portentDieTwo").innerHTML =
      state.get("portentDieTwo");
  }
  document.getElementById("armorClass").innerHTML =
    (state.get("mageArmorActive") ? 13 : 10) + mods.dex;
  document.getElementById("spellAttack").innerHTML =
    mods.int + mods.proficiency;
  document.getElementById("spellSave").innerHTML = mods.int;

  document.querySelectorAll('input[name="hitDice"]').forEach((el, index) => {
    el.checked = index + 1 <= state.get("hitDiceConsumed");
  });

  document
    .querySelectorAll('input[name="levelOneSpellSlotsConsumed"]')
    .forEach(
      (el, index) =>
        (el.checked = index + 1 <= state.get("levelOneSpellSlotsConsumed"))
    );

  document
    .querySelectorAll('input[name="levelTwoSpellSlotsConsumed"]')
    .forEach(
      (el, index) =>
        (el.checked = index + 1 <= state.get("levelTwoSpellSlotsConsumed"))
    );

  document.getElementById("portentDieOne").disabled = state.get(
    "portentDieOneConsumed"
  );
  document.getElementById("portentDieTwo").disabled = state.get(
    "portentDieTwoConsumed"
  );

  Object.entries(state.get("hiddenSections" ?? {})).forEach(
    ([id, hidden]) =>
      (document.getElementById(id).className = hidden ? "hidden" : "")
  );
}

function saveState() {
  localStorage.setItem("state", JSON.stringify(state._store));
  if (canEdit) {
    writeState(state._store);
  }
}

async function restoreState() {
  applyState();
  state._store = await readState();
  localStorage.setItem("state", JSON.stringify(state._store));
  applyState();
}

document.addEventListener("DOMContentLoaded", () => {
  restoreState();
});
