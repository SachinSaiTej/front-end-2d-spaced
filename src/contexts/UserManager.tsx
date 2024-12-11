import { createContext, useState, useContext, useCallback } from "react";
import { Furniture, User } from "../types";
import { isCollision, isUserCollision } from "../utility/utility";

interface UserManagerContextType {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (id: string) => void;
  moveUser: (id: string, x: number, y: number, furniture: Furniture[], direction: string) => void;
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
    (
      id: string,
      dx: number,
      dy: number,
      furniture: Furniture[],
      direction: string
    ) =>
      setUsers((prev) =>
        prev.map((user) => {
          if (user.id === id) {
            // const userRadius = 10;
            const proposedX = Math.max(0, Math.min(800, user.x + dx));
            const proposedY = Math.max(0, Math.min(600, user.y + dy));

            // Check for collisions with furniture
            const hasFurnitureCollision = furniture.some((item) =>
              // isCollision(proposedX-20, proposedY-20, 40, 40, item)
              isUserCollision(
                proposedX - 20,
                proposedY - 20,
                40,
                40,
                item.x,
                item.y,
                item.width,
                item.height)
            );

            // Check for collisions with other users
            const hasUserCollision = prev.some(
              (otherUser) =>
                otherUser.id !== id && // Exclude the current user
                isUserCollision(
                  proposedX - 20,
                  proposedY - 20,
                  40,
                  40,
                  otherUser.x - 20,
                  otherUser.y - 20,
                  40,
                  40
                )
            );

            // Only update position if no collision
            if (!hasFurnitureCollision && !hasUserCollision) {
              // console.log("No Collision");
              // let newX = user.x;
              // let newY = user.y;

              // Update position based on direction
              // if (direction === "north") newY -= 10;
              // else if (direction === "south") newY += 10;
              // else if (direction === "west") newX -= 10;
              // else if (direction === "east") newX += 10;
              // user.movementState = moving ? (frameCount % 2 === 0 ? "left-leg" : "right-leg") : "facing-still";

              return {
                ...user,
                x: proposedX,
                y: proposedY,
                direction: direction,
                movementState:
                  user.movementState === "facing-still" ? (user.movementState.includes('right-leg') ? "left-leg" : "right-leg") : "facing-still",
              };
            } else {
              console.log("Collision Occured");
            }
          }
          return user;
        })
      ),
    []
  );

  return (
    <UserManagerContext.Provider
      value={{ users, addUser, removeUser, moveUser }}
    >
      {children}
    </UserManagerContext.Provider>
  );
};

export const useUserManager = (): UserManagerContextType => {
  const context = useContext(UserManagerContext);
  if (!context) {
    throw new Error("useUserManager must be used within a UserManagerProvider");
  }
  return context;
};
