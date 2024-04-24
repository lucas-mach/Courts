import {create} from 'zustand';

//Global variable that defines the selected match for chats.
const useMatch = create((set) => ({
    selectedMatch: null,
    setSelectedMatch: (selectedMatch) => set({ selectedMatch }),
    messages: [],
    setMessages: (messages) => set({ messages}),
}));

export default useMatch