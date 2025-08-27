
import { IUserToken } from "@/app/(authenticated)/dashboard/layout";
import { create } from "zustand";

interface AuthState {
    user: IUserToken | null;
    setUser: (user: AuthState["user"]) => void;
    clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));
