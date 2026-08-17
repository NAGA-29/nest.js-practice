import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from './App';

describe('App', () => {
  it('renders the SPA welcome screen', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Flea Market' }),
    ).toBeInTheDocument();
    expect(screen.getByText('React SPA is ready.')).toBeInTheDocument();
  });
});
