import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

function SampleComponent() {
  return <h1>Sample test works</h1>;
}

describe('sample test', () => {
  it('renders a heading', () => {
    render(<SampleComponent />);
    expect(screen.getByRole('heading', { name: /sample test works/i })).toBeInTheDocument();
  });
});
