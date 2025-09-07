import { createContext, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

export interface User {
    userName: string;
    email: string;
    designation: string;
    profilePic: string;
}

interface UserContextType {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>({
        userName: 'Shivam Kumar',
        email: 'shivamvats0987@gmail.com',
        designation: 'Software Engineer',
        profilePic: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D'
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext }