const armorClass = document.getElementById("armorClass");
const charMod = document.getElementById("charMod");
const conMod = document.getElementById("conMod");
const dexMod = document.getElementById("dexMod");
const intMod = document.getElementById("intMod");
const proficiencyBonus = document.getElementById("proficiencyBonus");
const spellAttack = document.getElementById("spellAttack");
const spellSave = document.getElementById("spellSave");
const strMod = document.getElementById("strMod");
const wisMod = document.getElementById("wisMod");

const castLevelOneSpell = document.querySelectorAll(
  'button[name="castLevelOneSpell"]'
);
const castLevelTwoSpell = document.querySelectorAll(
  'button[name="castLevelTwoSpell"]'
);
const castMageArmor = document.querySelector('button[name="castMageArmor"]');
const longRest = document.querySelector('button[name="longRest"]');
const portentDieOne = document.querySelector('button[name="portentDieOne"]');
const portentDieTwo = document.querySelector('button[name="portentDieTwo"]');
const shortRest = document.querySelector('button[name="shortRest"]');
const copper = document.querySelector('input[name="copper"]');
const electrum = document.querySelector('input[name="electrum"]');
const gold = document.querySelector('input[name="gold"]');
const hitPoints = document.querySelector('input[name="hitPoints"]');
const mistyStepConsumed = document.querySelector(
  'input[name="mistyStepConsumed"]'
);
const silver = document.querySelector('input[name="silver"]');
const hitDice = document.querySelectorAll('input[name="hitDice"]');
const levelOneSpellSlotsConsumed = document.querySelectorAll(
  'input[name="levelOneSpellSlotsConsumed"]'
);
const levelTwoSpellSlotsConsumed = document.querySelectorAll(
  'input[name="levelTwoSpellSlotsConsumed"]'
);
const inputs = document.querySelectorAll("input, button, select, textarea");

window.elements = {
  armorClass,
  charMod,
  conMod,
  dexMod,
  intMod,
  proficiencyBonus,
  spellAttack,
  spellSave,
  strMod,
  wisMod,
  castLevelOneSpell,
  castLevelTwoSpell,
  castMageArmor,
  longRest,
  portentDieOne,
  portentDieTwo,
  shortRest,
  copper,
  electrum,
  gold,
  hitPoints,
  mistyStepConsumed,
  silver,
  hitDice,
  levelOneSpellSlotsConsumed,
  levelTwoSpellSlotsConsumed,
  inputs,
};
