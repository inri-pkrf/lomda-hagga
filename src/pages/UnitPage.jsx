import React, { Suspense } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import {
  getUnitBySlug,
  getStepBySlugs,
  buildStepPath,
  getNextSerialId,
  getPreviousSerialId
} from '../navigation/navigationConfig';
import NavigationButtons from '../components/NavigationButtons';

const LazyStep = ({ unitSlug, stepSlug }) => {
  const match = getStepBySlugs(unitSlug, stepSlug);

  if (!match) {
    return <div style={{ padding: '2rem' }}>Step not found.</div>;
  }

  const { unit, step } = match;

  const StepComponent = React.lazy(() =>
    import(`../units/${step.componentPath}.jsx`)
  );

  const nextSerial = getNextSerialId(step.serialId);
  const prevSerial = getPreviousSerialId(step.serialId);

  return (
    <div className="unit-page">
      <div className="unit-page__header">
        <h1>{unit.title}</h1>
        <p>{unit.description}</p>
      </div>
      <div className="unit-page__content">
        <StepComponent />
      </div>
      <div className="unit-page__nav">
        <NavigationButtons
          currentSerialId={step.serialId}
          nextSerialId={nextSerial}
          previousSerialId={prevSerial}
        />
      </div>
    </div>
  );
};

function UnitPage() {
  const { unitSlug } = useParams();
  const unit = getUnitBySlug(unitSlug);

  if (!unit) {
    return <Navigate to="/" replace />;
  }

  const firstStep = unit.steps[0];

  return (
    <Routes>
      <Route
        index
        element={<Navigate to={buildStepPath(unit.slug, firstStep.slug)} replace />}
      />
      <Route
        path=":stepSlug"
        element={
          <Suspense fallback={<div style={{ padding: '2rem' }}>Loading...</div>}>
            <UnitStepWrapper unitSlug={unit.slug} />
          </Suspense>
        }
      />
    </Routes>
  );
}

function UnitStepWrapper({ unitSlug }) {
  const { stepSlug } = useParams();
  return <LazyStep unitSlug={unitSlug} stepSlug={stepSlug} />;
}

export default UnitPage;

