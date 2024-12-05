import { createContext, useState, useContext, useCallback } from 'react';

interface User {
  id: string;
  x: number;
  y: number;
  color: string;
}

interface UserManagerContextType {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (id: string) => void;
  moveUser: (id: string, x: number, y: number) => void;
}

const UserManagerContext = createContext<UserManagerContextType | null>(null);

// import { createContext, useState, useContext, useCallback } from 'react';

// const UserManagerContext = createContext<UserManagerContextType | null>(null);

export const UserManagerProvider = ({ children }: any) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = useCallback(
    (user: User) => setUsers((prev) => [...prev, user]),
    []
  );

  const removeUser = useCallback(
    (id: string) => setUsers((prev) => prev.filter((user) => user.id !== id)),
    []
  );

  const moveUser = useCallback(
    (id: string, dx: number, dy: number) =>
      // setUsers((prev) =>
      //   prev.map((user) =>
      //     user.id === id ? { ...user, x: user.x + dx, y: user.y + dy } : user
      //   )
      // ),
      setUsers((prev) =>
        prev.map((user) => {
          if (user.id === id) {
            const newX = Math.max(0, Math.min(800, user.x + dx));
            const newY = Math.max(0, Math.min(600, user.y + dy));
            return { ...user, x: newX, y: newY };
          }
          return user;
        })
      ),
    // setUsers((prev) =>
    //     prev.map((user) => {
    //       if (user.id === id) {
    //         const newX = Math.max(0, Math.min(800, user.x + dx));
    //         const newY = Math.max(0, Math.min(600, user.y + dy));
    //         return { ...user, x: newX, y: newY };
    //       }
    //       return user;
    //     }));

    []
  );

  return (
    <UserManagerContext.Provider value={{ users, addUser, removeUser, moveUser }}>
      {children}
    </UserManagerContext.Provider>
  );
};

export const useUserManager = (): UserManagerContextType => {
  const context = useContext(UserManagerContext);
  if (!context) {
    throw new Error(
      'useUserManager must be used within a UserManagerProvider'
    );
  }
  return context;
};

