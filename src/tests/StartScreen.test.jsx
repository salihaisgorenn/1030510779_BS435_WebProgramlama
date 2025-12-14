import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StartScreen from '../components/StartScreen';

describe('StartScreen Bileşeni', () => {


    it('Başlık (Real Or AI?) ekranda görüntülenmeli', () => {

        render(<StartScreen onStart={() => {}} />);


        const titleElement = screen.getByText(/Real Or AI\?/i);

        expect(titleElement).toBeInTheDocument();
    });


    it('Oyun kuralları listesi görüntülenmeli', () => {
        render(<StartScreen onStart={() => {}} />);


        expect(screen.getByText('Oyun Akışı')).toBeInTheDocument();


        expect(screen.getByText(/3 adet görsel/i)).toBeInTheDocument();
    });


    it('Butona tıklandığında onStart fonksiyonu çalışmalı', () => {
        const mockOnStart = vi.fn();

        render(<StartScreen onStart={mockOnStart} />);

        const button = screen.getByRole('button', { name: /Hadi Başlayalım!/i });


        fireEvent.click(button);

        expect(mockOnStart).toHaveBeenCalledTimes(1);
    });

});