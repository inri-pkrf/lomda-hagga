import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  buildStepPath,
  getStepBySerialId
} from '../navigation/navigationConfig';

function NavigationButtons({ currentSerialId, nextSerialId, previousSerialId }) {
  const navigate = useNavigate();

  const handleGo = (serialId) => {
    const match = getStepBySerialId(serialId);
    if (!match) return;
    const { unit, step } = match;
    navigate(buildStepPath(unit.slug, step.slug));
  };

  return (
    <div className="navigation-buttons">
      <button
        type="button"
        className="navigation-buttons__button"
        onClick={() => previousSerialId && handleGo(previousSerialId)}
        disabled={!previousSerialId}
      >
        Previous
      </button>
      <button
        type="button"
        className="navigation-buttons__button navigation-buttons__button--primary"
        onClick={() => nextSerialId && handleGo(nextSerialId)}
        disabled={!nextSerialId}
      >
        Next
      </button>
    </div>
  );
}

export default NavigationButtons;

