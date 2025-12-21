import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ModeSelectionScreen from '../components/ModeSelectionScreen';

const MOCK_MODES = {
    CLASSIC: 'CLASSIC',
    SPRINT: 'SPRINT'
};

describe('ModeSelectionScreen Bileşeni', () => {

    it('Her iki oyun modu seçeneği de ekranda görüntülenmeli', () => {

        render(<ModeSelectionScreen setGameMode={() => {}} MODES={MOCK_MODES} />);


        expect(screen.getByText(/Gerçek mi Yapay Zeka mı?/i)).toBeInTheDocument();

        expect(screen.getByText(/Klasik Mod/i)).toBeInTheDocument();
        expect(screen.getByText(/60 Saniye Süre Modu/i)).toBeInTheDocument();
    });


    it('Klasik Mod seçildiğinde setGameMode fonksiyonu doğru parametreyle çağrılmalı', () => {
        const mockSetGameMode = vi.fn();

        render(<ModeSelectionScreen setGameMode={mockSetGameMode} MODES={MOCK_MODES} />);

        fireEvent.click(screen.getByText(/Klasik Mod/i));

        expect(mockSetGameMode).toHaveBeenCalledWith(MOCK_MODES.CLASSIC);
    });


    it('Sprint Modu seçildiğinde setGameMode fonksiyonu doğru parametreyle çağrılmalı', () => {
        const mockSetGameMode = vi.fn();

        render(<ModeSelectionScreen setGameMode={mockSetGameMode} MODES={MOCK_MODES} />);


        fireEvent.click(screen.getByText(/60 Saniye Süre Modu/i));

        expect(mockSetGameMode).toHaveBeenCalledWith(MOCK_MODES.SPRINT);
    });

});