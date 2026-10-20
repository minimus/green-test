import { SnackbarProvider } from 'notistack';
import React from 'react';
import { createRoot } from 'react-dom/client';

import Application from './Application';

const container = document.getElementById('app-container');

if (container) {
  const root = createRoot(container);

  root.render(
    <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'right', vertical: 'top' }} preventDuplicate={true}>
      <Application />
    </SnackbarProvider>,
  );
}
