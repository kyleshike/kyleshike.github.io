const MAX_TOTAL_SPELLS_TO_RECOVER = 2;
const MAX_LEVEL_ONE_SPELLS = 4;
const MAX_LEVEL_TWO_SPELLS = 2;

function restoreHP() {
  const maxValue = parseInt(elements.hitPoints.max);
  const currentValue = state.get(hitPoints) || maxValue;

  if (currentValue === maxValue) return;

  if (confirm("Restore HP?")) {
    const value = parseInt(prompt("How many hit dice rolled?"));
    const hpRestored = parseInt(prompt("HP recovery"));

    if (isNaN(hpRestored) || isNaN(value)) return;

    state.set(hitDiceConsumed, Math.min(3, value));
    state.set(hitPoints, Math.min(maxValue, currentValue + hpRestored));
  }
}

function applyShortRest() {
  restoreHP();
  state.set(mistyStepConsumed, false);
  arcaneRecovery();
}

function applyLongRest() {
  state.set(hitPoints, parseInt(elements.hitPoints.dataset.max));
  state.set(hitDiceConsumed, 0);
  state.set(levelOneSpellSlotsConsumed, 0);
  state.set(levelTwoSpellSlotsConsumed, 0);
  state.set(arcaneRecoveryConsumed, false);
  state.set(mistyStepConsumed, false);

  alert("You consult the I-Ching and see the fate of two outcomes");
  const portentOne = parseInt(prompt("Outcome one"));
  const portentTwo = parseInt(prompt("Outcome two"));

  state.set(portentDieOne, portentOne);
  state.set(portentDieTwo, portentTwo);
  state.set(portentDieOneConsumed, false);
  state.set(portentDieTwoConsumed, false);
  state.set(mageArmorActive, false);
}

function castLevelOneSpell(canUpcast) {
  const levelOneSpellsConsumed = state.get(levelOneSpellSlotsConsumed);
  if (levelOneSpellsConsumed >= MAX_LEVEL_ONE_SPELLS)
    return castLevelTwoSpell(canUpcast);

  if (canUpcast && confirm("Upcast?")) {
    return castLevelTwoSpell(true);
  }

  state.set(levelOneSpellSlotsConsumed, levelOneSpellsConsumed + 1);
  return true;
}

function castMageArmor() {
  const castSuccessful = castLevelOneSpell();

  if (!castSuccessful) return;

  if (!state.get(mageArmorActive)) {
    if (window.confirm("Casting on someone else?")) return;
  }

  state.set(mageArmorActive, true);
}

function castLevelTwoSpell() {
  const levelTwoSpellsConsumed = state.get(levelTwoSpellSlotsConsumed);
  if (levelTwoSpellsConsumed >= MAX_LEVEL_TWO_SPELLS) return false;

  state.set(levelTwoSpellSlotsConsumed, levelTwoSpellsConsumed + 1);

  return true;
}

function arcaneRecovery() {
  const level1 = state.get(levelOneSpellSlotsConsumed);
  const level2 = state.get(levelTwoSpellSlotsConsumed);

  if (level1 === 0 && level2 === 0) return;

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
    return;
  }

  if (!isNaN(levelOneRecovered))
    state.set(
      levelOneSpellSlotsConsumed,
      Math.max(0, level1 - levelOneRecovered)
    );
  if (!isNaN(levelTwoRecovered))
    state.set(
      levelTwoSpellSlotsConsumed,
      Math.max(0, level2 - levelTwoRecovered)
    );
  state.set(arcaneRecoveryConsumed, true);
}

export function applyEventListeners() {
  [elements.gold, elements.electrum, elements.silver, elements.copper].forEach(
    (input) => {
      input.addEventListener("change", ({ currentTarget: { name, value } }) => {
        state.set(name, parseInt(value));
      });
    }
  );

  elements.hitDice.forEach((input) => {
    input.addEventListener("change", ({ currentTarget: { checked } }) => {
      const currentValue = state.get(hitDiceConsumed) ?? 0;
      const nextValue = checked ? currentValue + 1 : currentValue - 1;

      state.set(hitDiceConsumed, Math.max(0, Math.min(3, nextValue)));
    });
  });

  [elements.portentDieOne, elements.portentDieTwo].forEach((button) => {
    button.addEventListener("click", () =>
      state.set(`${button.name}Consumed`, true)
    );
  });

  elements.mistyStepConsumed.addEventListener(
    "change",
    ({ currentTarget: { name, checked } }) => {
      state.set(name, checked);
    }
  );

  elements.levelOneSpellSlotsConsumed.forEach((input) => {
    input.addEventListener("change", ({ currentTarget: { checked } }) => {
      const currentValue = state.get(levelOneSpellSlotsConsumed) ?? 0;
      const nextValue = checked ? currentValue + 1 : currentValue - 1;

      state.set(
        levelOneSpellSlotsConsumed,
        Math.max(0, Math.min(MAX_LEVEL_ONE_SPELLS, nextValue))
      );
    });
  });

  elements.levelTwoSpellSlotsConsumed.forEach((input) => {
    input.addEventListener("change", ({ currentTarget: { checked } }) => {
      const currentValue = state.get(levelTwoSpellSlotsConsumed) ?? 0;
      const nextValue = checked ? currentValue + 1 : currentValue - 1;

      state.set(
        levelTwoSpellSlotsConsumed,
        Math.max(0, Math.min(MAX_LEVEL_TWO_SPELLS, nextValue))
      );
    });
  });

  elements.castLevelOneSpell.forEach((btn) => {
    btn.addEventListener("click", ({ currentTarget: { dataset } }) => {
      castLevelOneSpell(dataset.canUpcast === "true");
    });
  });

  elements.castLevelTwoSpell.forEach((btn) => {
    btn.addEventListener("click", ({ currentTarget: { dataset } }) => {
      castLevelTwoSpell(dataset.canUpcast === "true");
    });
  });

  elements.castMageArmor.addEventListener("click", castMageArmor);
  elements.longRest.addEventListener("click", applyLongRest);
  elements.shortRest.addEventListener("click", applyShortRest);

  [elements.portentDieOneInput, elements.portentDieTwoInput].forEach(
    (checkbox) => {
      checkbox.addEventListener(
        "change",
        ({ currentTarget: { name, checked } }) => {
          state.set(name, checked);
        }
      );
    }
  );

  elements.incrementHP.addEventListener("click", () => {
    state.set(hitPoints, state.get(hitPoints) + 1);
  });

  elements.decrementHP.addEventListener("click", () => {
    state.set(hitPoints, state.get(hitPoints) - 1);
  });
}
