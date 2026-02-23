import unitsConfig from '../config/unitsConfig.json';

export const UNITS = unitsConfig.units;

export function getUnitBySlug(unitSlug) {
  return UNITS.find((unit) => unit.slug === unitSlug);
}

export function getStepBySerialId(serialId) {
  for (const unit of UNITS) {
    const step = unit.steps.find((s) => s.serialId === serialId);
    if (step) {
      return { unit, step };
    }
  }
  return null;
}

export function getStepBySlugs(unitSlug, stepSlug) {
  const unit = getUnitBySlug(unitSlug);
  if (!unit) return null;
  const step = unit.steps.find((s) => s.slug === stepSlug) || null;
  if (!step) return null;
  return { unit, step };
}

function flattenSteps() {
  const items = [];
  UNITS.forEach((unit) => {
    unit.steps.forEach((step, index) => {
      items.push({
        unitId: unit.id,
        unitSlug: unit.slug,
        stepIndex: index,
        serialId: step.serialId,
        stepSlug: step.slug
      });
    });
  });
  return items;
}

const FLAT_STEPS = flattenSteps();

export function getNextSerialId(currentSerialId) {
  const idx = FLAT_STEPS.findIndex((item) => item.serialId === currentSerialId);
  if (idx === -1 || idx === FLAT_STEPS.length - 1) return null;
  return FLAT_STEPS[idx + 1].serialId;
}

export function getPreviousSerialId(currentSerialId) {
  const idx = FLAT_STEPS.findIndex((item) => item.serialId === currentSerialId);
  if (idx <= 0) return null;
  return FLAT_STEPS[idx - 1].serialId;
}

export function buildUnitPath(unitSlug) {
  return `/unit/${unitSlug}`;
}

export function buildStepPath(unitSlug, stepSlug) {
  return `/unit/${unitSlug}/${stepSlug}`;
}

export function buildDevSerialPath(serialId) {
  return `/dev/${serialId}`;
}

