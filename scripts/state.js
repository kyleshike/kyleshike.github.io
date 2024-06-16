import { readState, writeState, isEditor } from "./firebase.js";

const modifiers = {
  proficiency: parseInt(elements.proficiencyBonus.innerHTML),
  str: parseInt(elements.strMod.innerHTML),
  dex: parseInt(elements.dexMod.innerHTML),
  con: parseInt(elements.conMod.innerHTML),
  int: parseInt(elements.intMod.innerHTML),
  wis: parseInt(elements.wisMod.innerHTML),
  char: parseInt(elements.charMod.innerHTML),
};

window.state = {
  _store: {},
  get: (key) => {
    if (!key in state._store) throw new Error(`${key} doesn't exist`);
    return state._store[key];
  },
  set: (key, value) => {
    if (state._store[key] === value) return;
    state._store[key] = value;
    saveState();
    applyState();
  },
};

export function cacheState() {
  localStorage.setItem("state", JSON.stringify(state._store));
}

function getCacheState() {
  const localState = localStorage.getItem("state");
  if (!localState) return {};

  return JSON.parse(localState);
}

export function applyState() {
  elements.hitPoints.innerHTML =
    state.get(hitPoints) ?? elements.hitPoints.dataset.max;
  elements.gold.value = state.get(gold) ?? 0;
  elements.electrum.value = state.get(electrum) ?? 0;
  elements.silver.value = state.get(silver) ?? 0;
  elements.copper.value = state.get(copper) ?? 0;
  elements.mistyStepConsumed.checked = state.get(mistyStepConsumed);

  if (isEditor) {
    elements.portentDieOne.innerHTML = state.get(portentDieOne);
    elements.portentDieTwo.innerHTML = state.get(portentDieTwo);
  }

  const acMod = state.get(mageArmorActive) ? 13 : 10;
  elements.armorClass.innerHTML = acMod + modifiers.dex;

  elements.spellAttack.innerHTML = modifiers.int + modifiers.proficiency;
  elements.spellSave.innerHTML = modifiers.int;

  elements.hitDice.forEach((el, index) => {
    el.checked = index + 1 <= state.get(hitDiceConsumed);
  });

  elements.levelOneSpellSlotsConsumed.forEach(
    (el, index) =>
      (el.checked = index + 1 <= state.get(levelOneSpellSlotsConsumed))
  );

  elements.levelTwoSpellSlotsConsumed.forEach(
    (el, index) =>
      (el.checked = index + 1 <= state.get(levelTwoSpellSlotsConsumed))
  );

  elements.portentDieOneInput.checked = state.get(portentDieOneConsumed);
  elements.portentDieTwoInput.checked = state.get(portentDieTwoConsumed);
}

function saveState() {
  cacheState();
  writeState(state._store);
}

function applyStateFromCache() {
  state._store = getCacheState();
  applyState();
}

async function applyStateFromDB() {
  state._store = await readState();
  applyState();
}

export function initializeState() {
  applyStateFromCache();
  applyStateFromDB();
}

export function disableAllInputsAndButtons() {
  elements.inputs.forEach((input) => {
    input.disabled = true;
  });
}

export function enableAllInputsAndButtons() {
  elements.inputs.forEach((input) => {
    input.disabled = false;
  });
}
