import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import Button from './Button';
import { colors } from '../../../styles/colors';

describe('Button', () => {
  it('children metnini gösterir', () => {
    render(<Button>Kaydet</Button>);

    expect(screen.getByRole('button', { name: 'Kaydet' })).toBeInTheDocument();
  });

  it('tıklandığında onClick çağrılır', () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Tıkla</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Tıkla' }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('disabled iken tıklanmaz', () => {
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Pasif
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Pasif' });

    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('primary variant varsayılan arka plan rengini uygular', () => {
    render(<Button>Primary</Button>);

    expect(screen.getByRole('button', { name: 'Primary' })).toHaveStyle({
      backgroundColor: colors.buttonPrimary,
    });
  });
});
