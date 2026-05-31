import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import Input from './Input';

afterEach(() => {
  cleanup();
});

describe('Input', () => {
  it('label gösterir ve input ile bağlar', () => {
    render(<Input label="Ad" value="" onChange={vi.fn()} />);

    expect(screen.getByLabelText('Ad')).toBeInTheDocument();
  });

  it('required ise yıldız gösterir', () => {
    render(<Input label="Soyad" required value="" onChange={vi.fn()} />);

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('placeholder gösterir', () => {
    render(
      <Input
        placeholder="Adınızı girin"
        value=""
        onChange={vi.fn()}
      />,
    );

    expect(
      screen.getByPlaceholderText('Adınızı girin'),
    ).toBeInTheDocument();
  });

  it('yazıldığında onChange çağrılır', () => {
    const onChange = vi.fn();

    render(<Input label="Email" value="" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'Ali' },
    });

    expect(onChange).toHaveBeenCalledWith('Ali');
  });

  it('disabled iken düzenlenemez', () => {
    render(
      <Input label="Telefon" value="Ali" disabled onChange={vi.fn()} />,
    );

    expect(screen.getByLabelText('Telefon')).toBeDisabled();
  });

  it('explanation metnini gösterir', () => {
    render(
      <Input
        label="Not"
        explanation="En az 2 karakter"
        value=""
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByText('En az 2 karakter')).toBeInTheDocument();
  });

  it('sanitize ile özel karakterleri engeller', () => {
    const onChange = vi.fn();

    render(
      <Input label="Ad" sanitize="name" value="" onChange={onChange} />,
    );
    fireEvent.change(screen.getByLabelText('Ad'), {
      target: { value: '<Ali>123' },
    });

    expect(onChange).toHaveBeenCalledWith('Ali');
  });

  it('id verilirse input id olarak kullanır', () => {
    render(
      <Input label="Kimlik" id="patient-name" value="" onChange={vi.fn()} />,
    );

    expect(screen.getByLabelText('Kimlik')).toHaveAttribute(
      'id',
      'patient-name',
    );
  });
});
