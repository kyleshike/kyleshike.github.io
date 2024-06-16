const armorClass = document.getElementById("armorClass");
const charMod = document.getElementById("charisma");
const conMod = document.getElementById("constitution");
const dexMod = document.getElementById("dexterity");
const intMod = document.getElementById("intelligence");
const proficiencyBonus = document.getElementById("proficiencyBonus");
const spellAttack = document.getElementById("spellAttack");
const spellSave = document.getElementById("spellSave");
const strMod = document.getElementById("strength");
const wisMod = document.getElementById("wisdom");

const castLevelOneSpell = document.querySelectorAll(
  'button[name="castLevelOne"]'
);
const castLevelTwoSpell = document.querySelectorAll(
  'button[name="castLevelTwo"]'
);
const castMageArmor = document.querySelector('button[name="castMageArmor"]');
const longRest = document.querySelector('button[name="longRest"]');
const portentDieOne = document.getElementById("portentDieOne");
const portentDieTwo = document.getElementById("portentDieTwo");
const portentDieOneInput = document.querySelector(
  'input[name="portentDieOneConsumed"]'
);
const portentDieTwoInput = document.querySelector(
  'input[name="portentDieTwoConsumed"]'
);
const shortRest = document.querySelector('button[name="shortRest"]');
const copper = document.querySelector('input[name="copper"]');
const electrum = document.querySelector('input[name="electrum"]');
const gold = document.querySelector('input[name="gold"]');
const hitPoints = document.getElementById("hitPoints");
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
const incrementHP = document.querySelector('button[name="incrementHP"]');
const decrementHP = document.querySelector('button[name="decrementHP"]');
const inputs = document.querySelectorAll("input, button, select, textarea");

window.elements = {
  armorClass,
  castLevelOneSpell,
  castLevelTwoSpell,
  castMageArmor,
  charMod,
  conMod,
  copper,
  dexMod,
  decrementHP,
  electrum,
  gold,
  hitDice,
  hitPoints,
  incrementHP,
  inputs,
  intMod,
  levelOneSpellSlotsConsumed,
  levelTwoSpellSlotsConsumed,
  longRest,
  mistyStepConsumed,
  portentDieOne,
  portentDieOneInput,
  portentDieTwo,
  portentDieTwoInput,
  proficiencyBonus,
  shortRest,
  silver,
  spellAttack,
  spellSave,
  strMod,
  wisMod,
};
