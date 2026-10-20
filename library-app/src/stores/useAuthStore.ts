import {create} from 'zustand'; 

interface UseAuthStore {
    fullName: string; 
    role: string; 
    setAuth: (fullName: string, role: string) => void; 
}

export const useAuthStore = create<UseAuthStore>((set) => ({
    fullName: '', 
    role: '', 
    setAuth: (fullName, role) => set(() => ({fullName, role}))
})); 