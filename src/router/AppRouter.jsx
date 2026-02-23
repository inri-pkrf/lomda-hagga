import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import UnitPage from '../pages/UnitPage';
import DevSerialRoute from '../routes/DevSerialRoute';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/unit/:unitSlug/*" element={<UnitPage />} />
      {process.env.NODE_ENV !== 'production' && (
        <Route path="/dev/:serialId" element={<DevSerialRoute />} />
      )}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;

