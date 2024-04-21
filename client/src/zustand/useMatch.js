import {create} from 'zustand';

const useMatch = create((set) => ({
    selectedMatch: null,
    setSelectedMatch: (selectedMatch) => set({ selectedMatch }),
    messages: [],
    setMessages: (messages) => set({ messages}),
}));

export default useMatch