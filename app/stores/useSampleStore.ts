import { create } from 'zustand'

interface SampleState {
    text: string
}

interface SampleActions {
    setText: (text: string) => void
}

const initialState: SampleState = {
    text: '',
};

export const useSampleStore = create<SampleState & SampleActions>()((set) => ({
    ...initialState,
    
    setText: (text) => set({ text }),
}));