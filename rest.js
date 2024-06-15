function restoreHP() {
  const maxValue = parseInt(
    document.querySelector('input[name="hitPoints"]').max
  );
  const currentValue = state.get("hp") || maxValue;

  if (currentValue === maxValue) return;

  if (confirm("Restore HP?")) {
    const hitDiceConsumed = parseInt(prompt("How many hit dice rolled?"));
    const hpRestored = parseInt(prompt("HP recovery"));

    if (isNaN(hpRestored) || isNaN(hitDiceConsumed)) return;

    state.set("hitDiceConsumed", Math.min(3, hitDiceConsumed));
    state.set("hp", Math.min(maxValue, currentValue + hpRestored));
  }
}

function shortRest() {
  restoreHP();
  state.set("mistyStepConsumed", false);
  arcaneRecovery();
}

function longRest() {
  state.set(
    "hp",
    parseInt(document.querySelector('input[name="hitPoints"]').max)
  );
  state.set("hitDiceConsumed", 0);
  state.set("levelOneSpellSlotsConsumed", 0);
  state.set("levelTwoSpellSlotsConsumed", 0);
  state.set("arcaneRecoveryConsumed", false);
  state.set("mistyStepConsumed", false);

  alert("You consult the I-Ching and see the fate of two outcomes");
  const portentOne = parseInt(prompt("Outcome one"));
  const portentTwo = parseInt(prompt("Outcome two"));
  state.set("portentDieOne", portentOne);
  state.set("portentDieTwo", portentTwo);
  state.set("portentDieOneConsumed", false);
  state.set("portentDieTwoConsumed", false);
  state.set("mageArmorActive", false);
}

function updateHitDice(increment) {
  const currentValue = state.get("hitDiceConsumed") ?? 0;

  state.set("hitDiceConsumed", increment ? currentValue + 1 : currentValue - 1);
}
