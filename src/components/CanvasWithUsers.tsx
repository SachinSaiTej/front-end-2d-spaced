import { useCallback } from "react";
import { useUserManager } from "../contexts/UserManager";
import { Furniture, User } from "../types";
import CanvasComponent from "./CanvasComponent";
import { getAvatarImagePath } from "../utility/utility";

// const preloadImages = (users: User[]) => {
//   const imageCache: Record<string, HTMLImageElement> = {};
  
//   users.forEach((user) => {
//     if (!imageCache[getAvatarImagePath(user.direction, user.movementState)]) {
//       const img = new Image();
//       img.src = getAvatarImagePath(user.direction, user.movementState);
//       imageCache[getAvatarImagePath(user.direction, user.movementState)] = img;
//     }
//   });

//   return imageCache;
// };

const preloadImages = (users: User[]) => {
  const imageCache: Record<string, HTMLImageElement> = {};

  users.forEach((user) => {
    const imagePath = getAvatarImagePath(user.direction, user.movementState);
    if (!imageCache[imagePath]) {
      const img = new Image();
      img.src = imagePath;

      img.onload = () => {
        console.log(`Image loaded: ${imagePath}`);
      };
      
      img.onerror = () => {
        console.error(`Failed to load image: ${imagePath}`);
      };

      imageCache[imagePath] = img;
    }
  });

  return imageCache;
};


const drawCanvas = (
  ctx: CanvasRenderingContext2D,
  frameCount: number,
  users: User[],
  furniture: Furniture[],
  imageCache: Record<string, HTMLImageElement>
) => {
  // Clear the canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Draw furniture
  furniture.forEach((item) => {
    ctx.fillStyle = item.color;
    ctx.fillRect(item.x, item.y, item.width, item.height);
    ctx.strokeStyle = "black";
    ctx.strokeRect(item.x, item.y, item.width, item.height);

    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.fillText(item.type, item.x + 15, item.y + 15);
  });

  // Draw users
  users.forEach((user) => {
    // const img = imageCache[user.character];
    const imageSource = getAvatarImagePath(user.direction, user.movementState);
    const img = imageCache[imageSource];
    // console.log("Testing", img, imageCache, imageSource);
    if (img && img.complete) {
      const characterWidth = 40;
      const characterHeight = 40;
      ctx.drawImage(
        img,
        user.x - characterWidth / 2,
        user.y - characterHeight / 2,
        characterWidth,
        characterHeight
      );
      ctx.fillStyle = "black";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(user.id, user.x, user.y-characterHeight / 2 - 5);
    } else {
      console.error("Image not loaded or failed:", imageSource);
    }
  });

  // Frame debugging
  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  ctx.fillText(`Frame: ${frameCount}`, 50, 20);
};

export default function CanvasWithUsers({ furnitureObjects }: { furnitureObjects: Furniture[] }) {
  const { users } = useUserManager();

  // Preload images for all users
  const imageCache = preloadImages(users);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, frameCount: number) => {
      drawCanvas(ctx, frameCount, users, furnitureObjects, imageCache);
    },
    [users, furnitureObjects, imageCache]
  );

  return <CanvasComponent draw={draw} width={800} height={600} />;
}