import { Furniture } from "../types";

export const isCollision = (
    userX: number,
    userY: number,
    width: number,
    height: number,
    furniture: Furniture
): boolean => {
    return (
        userX + width > furniture.x &&
        userX - width < furniture.x + furniture.width - 20 &&
        userY + height > furniture.y &&
        userY - height < furniture.y + furniture.height -20
        // userX < furniture.width - 20 &&
        // userX + width > furniture.x - 20 &&
        // userY < furniture.height - 20 &&
        // userY + height > furniture.y - 20
    );
}

export const isUserCollision = (
    x1: number,
    y1: number,
    width1: number,
    height1: number,
    x2: number,
    y2: number,
    width2: number,
    height2: number
  ): boolean => {
    return (
      x1 < x2 + width2 &&
      x1 + width1 > x2 &&
      y1 < y2 + height2 &&
      y1 + height1 > y2
    );
  };
  

export const getAvatarImagePath = (direction: string, movementState: string)=>{
  return `/assets/AvatarImages/${direction}-${movementState}.png`;
}