import { useCallback } from "react";
import { useUserManager } from "../contexts/UserManager";
import { Furniture } from "../types";
import CanvasComponent from "./CanvasComponent";

const preloadImages = (users: { id: string; character: string }[]) => {
  const imageCache: Record<string, HTMLImageElement> = {};
  
  users.forEach((user) => {
    if (!imageCache[user.character]) {
      const img = new Image();
      img.src = user.character;
      imageCache[user.character] = img;
    }
  });

  return imageCache;
};

const drawCanvas = (
  ctx: CanvasRenderingContext2D,
  frameCount: number,
  users: { id: string; x: number; y: number; color: string; character: string }[],
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
    ctx.fillText(item.type, item.x + 5, item.y + 15);
  });

  // Draw users
  users.forEach((user) => {
    const img = imageCache[user.character];
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
    } else {
      console.error("Image not loaded or failed:", user.character);
    }
  });

  // Frame debugging
  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  ctx.fillText(`Frame: ${frameCount}`, 10, 20);
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


// import { useCallback } from "react";
// import { useUserManager } from "../contexts/UserManager";
// import CanvasComponent from "./CanvasComponent";
// import { Furniture } from "../types";
// // import { isCollision } from "../utility/utility";

// const drawCanvas = (
//   ctx: CanvasRenderingContext2D,
//   frameCount: number,
//   users: { id: string; x: number; y: number; color: string, character: string }[],
//   furniture: Furniture[]
// ) => {
//   // Clear the canvas
//   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

//   ctx.fillStyle = '#f0f0f0';
//   const img = new Image();
//   img.src = "https://mdn.github.io/shared-assets/images/examples/rhino.jpg";
//   img.onload = () => {
//     ctx.drawImage(img, 1 * 50, 1 * 38, 50, 38);
//   };
//   ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

//   // Draw each furniture
//   furniture.forEach((item) => {
//     ctx.fillStyle = item.color;
//     ctx.fillRect(item.x, item.y, item.width, item.height);
//     ctx.strokeStyle = 'black';
//     ctx.strokeRect(item.x, item.y, item.width, item.height);

//     // Optionally add furniture type label
//     ctx.fillStyle = 'black';
//     ctx.font = '12px Arial';
//     ctx.fillText(item.type, item.x + 5, item.y + 15);
//   });

//   // Draw each user
//   users.forEach((user) => {
//     // const userRadius = 10;
//     const img = new Image();
//     img.src = user.character;
//     img.onload = () => {
//       const characterWidth = 40;
//       const characterHeight = 40;
//       // ctx.fillStyle = user.color;
//       ctx.drawImage(img, user.x - characterWidth / 2, user.y - characterHeight / 2, characterWidth, characterHeight);
//       // console.log("Image", img);
//     };
//     img.onerror = () => {
//       console.error("Failed to load image for user:", user.character);
//     }
//     // img.onload = () => {
//     //   for (let i = 0; i < 4; i++) {
//     //     for (let j = 0; j < 3; j++) {
//     //       ctx.drawImage(img, j * 50, i * 38, 50, 38);
//     //     }
//     //   }
//     // };
//     // img.src = "https://mdn.github.io/shared-assets/images/examples/rhino.jpg";
//     // const isUserColloiding = furniture.some((item)=>{
//     //   isCollision(user.x, user.y, userRadius, item);
//     // });

//     // if(isUserColloiding){
//     //   ctx.fillStyle = 'gray';
//     // } else {
//     //   ctx.fillStyle = user.color;
//     // }

//     // ctx.fillStyle = user.color;
//     // ctx.beginPath();
//     // ctx.arc(user.x, user.y, 10, 0, 2 * Math.PI);
//     // ctx.fill();
//   });

//   // Debugging text for frame count
//   ctx.fillStyle = 'black';
//   ctx.font = '16px Arial';
//   ctx.fillText(`Frame: ${frameCount}`, 10, 20);
// };

// export default function CanvasWithUsers({ furnitureObjects }: { furnitureObjects: Furniture[] }) {
//   const { users } = useUserManager();

//   const draw = useCallback(
//     (ctx: CanvasRenderingContext2D, frameCount: number) => {
//       drawCanvas(ctx, frameCount, users, furnitureObjects);
//     },
//     [users]
//   );

//   return <CanvasComponent draw={draw} width={800} height={600} />;
// };