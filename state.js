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
  _store: {},
  get: (key) => state._store[key],
  set: (key, value) => {
    if (state._store[key] === value) return;

    state._store[key] = value;
    applyState();
    saveState();
  },
};

async function restoreState() {
  const defaultState = {
    hiddenSections: {
      cantrips: false,
      characteristics: false,
      currency: false,
      inventory: false,
      levelOneSpells: false,
      levelTwoSpells: false,
      magic: false,
      skills: false,
      stats: false,
    },
    arcaneRecoveryConsumed: false,
    copper: 0,
    electrum: 0,
    gold: 0,
    hitDiceConsumed: 0,
    hp: 0,
    levelOneSpellSlotsConsumed: 0,
    levelTwoSpellSlotsConsumed: 0,
    mageArmorActive: false,
    mistyStepConsumed: false,
    portentDieOne: 19,
    portentDieOneConsumed: false,
    portentDieTwo: 1,
    portentDieTwoConsumed: false,
    silver: 8,
  };

  const storage = localStorage.getItem("store");
  state._store = storage ? JSON.parse(storage) : defaultState;
  applyState();

  const store = await readState();
  console.log(store);
}

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
  document.getElementById("portentDieOne").innerHTML =
    state.get("portentDieOne");
  document.getElementById("portentDieTwo").innerHTML =
    state.get("portentDieTwo");
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

  Object.entries(state.get("hiddenSections")).forEach(
    ([id, hidden]) =>
      (document.getElementById(id).className = hidden ? "hidden" : "")
  );
}

function saveState() {
  writeState(state._store);
}

document.addEventListener("DOMContentLoaded", () => {
  restoreState();
});
