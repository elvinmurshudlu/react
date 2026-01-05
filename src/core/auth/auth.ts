import { create } from "zustand"
import { persist } from "zustand/middleware"

type Session = unknown

type AuthType = {
    session: null | Session
    setSession: (session: null | Session) => void
}

export const useAuth = create<AuthType>()(
    persist(
        (set) => ({
            session: null,
            setSession: (session) => set({ session }),
        }),
        { name: "auth" },
    ),
)
