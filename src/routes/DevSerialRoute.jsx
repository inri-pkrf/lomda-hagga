import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getStepBySerialId, buildStepPath } from '../navigation/navigationConfig';

function DevSerialRoute() {
  const { serialId } = useParams();

  const match = getStepBySerialId(serialId);

  if (!match) {
    return <div style={{ padding: '2rem' }}>Unknown serialId: {serialId}</div>;
  }

  const { unit, step } = match;
  const targetPath = buildStepPath(unit.slug, step.slug);

  return <Navigate to={targetPath} replace />;
}

export default DevSerialRoute;

