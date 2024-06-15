const MAX_LEVEL_ONE_SPELLS = 4;
const MAX_LEVEL_TWO_SPELLS = 2;

function castLevelOneSpell(canUpcast) {
  const levelOneSpellsConsumed = state.get("levelOneSpellSlotsConsumed");
  if (levelOneSpellsConsumed >= MAX_LEVEL_ONE_SPELLS)
    return castLevelTwoSpell(canUpcast);

  if (canUpcast && confirm("Upcast?")) {
    return castLevelTwoSpell(true);
  }

  state.set("levelOneSpellSlotsConsumed", levelOneSpellsConsumed + 1);
  return true;
}

function castMageArmor() {
  const castSuccessful = castLevelOneSpell();

  if (!castSuccessful) return;

  if (!state.get("mageArmorActive")) {
    if (window.confirm("Casting on someone else?")) return;
  }

  state.set("mageArmorActive", true);
}

function castLevelTwoSpell() {
  const levelTwoSpellsConsumed = state.get("levelTwoSpellSlotsConsumed");
  if (levelTwoSpellsConsumed >= MAX_LEVEL_TWO_SPELLS) return false;

  state.set("levelTwoSpellSlotsConsumed", levelTwoSpellsConsumed + 1);

  return true;
}

function updateSpellSlot(level, increment) {
  const key = `${level}SpellSlotsConsumed`;
  const currentValue = state.get(key) ?? 0;

  state.set(key, increment ? currentValue + 1 : currentValue - 1);
}

function arcaneRecovery() {
  const MAX_TOTAL_SPELLS_TO_RECOVER = 2;

  const levelOneSpellSlotsConsumed = state.get("levelOneSpellSlotsConsumed");
  const levelTwoSpellSlotsConsumed = state.get("levelTwoSpellSlotsConsumed");

  if (levelOneSpellSlotsConsumed === 0 && levelTwoSpellSlotsConsumed === 0)
    return;

  const levelOneRecovered = Math.min(
    parseInt(prompt("How many level one slots will you recover?")) ?? 0,
    MAX_LEVEL_ONE_SPELLS
  );

  const levelTwoRecovered = Math.min(
    parseInt(prompt("How many level two slots will you recover?")) ?? 0,
    MAX_LEVEL_TWO_SPELLS
  );

  if (levelTwoRecovered * 2 + levelOneRecovered > MAX_TOTAL_SPELLS_TO_RECOVER) {
    alert("Can't recover that many!");
  }

  if (!isNaN(levelOneRecovered))
    state.set(
      "levelOneSpellSlotsConsumed",
      Math.max(0, levelOneSpellSlotsConsumed - levelOneRecovered)
    );
  if (!isNaN(levelTwoRecovered))
    state.set(
      "levelTwoSpellSlotsConsumed",
      Math.max(0, levelTwoSpellSlotsConsumed - levelTwoRecovered)
    );
  state.set("arcaneRecoveryConsumed", true);
}
