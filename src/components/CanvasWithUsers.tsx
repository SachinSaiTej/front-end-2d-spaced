import { useCallback } from "react";
import { useUserManager } from "../contexts/UserManager";
import CanvasComponent from "./CanvasComponent";
import { Furniture } from "../types";
import { isCollision } from "../utility/utility";

const drawCanvas = (
  ctx: CanvasRenderingContext2D,
  frameCount: number,
  users: { id: string; x: number; y: number; color: string }[],
  furniture: Furniture[]
) => {
  // Clear the canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Draw each furniture
  furniture.forEach((item) => {
    ctx.fillStyle = item.color;
    ctx.fillRect(item.x, item.y, item.width, item.height);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(item.x, item.y, item.width, item.height);

    // Optionally add furniture type label
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.fillText(item.type, item.x + 5, item.y + 15);
  });

  // Draw each user
  users.forEach((user) => {
    const userRadius = 10;
    const isUserColloiding = furniture.some((item)=>{
      isCollision(user.x, user.y, userRadius, item);
    });

    if(isUserColloiding){
      ctx.fillStyle = 'gray';
    } else {
      ctx.fillStyle = user.color;
    }

    ctx.fillStyle = user.color;
    ctx.beginPath();
    ctx.arc(user.x, user.y, 10, 0, 2 * Math.PI);
    ctx.fill();
  });

  // Debugging text for frame count
  ctx.fillStyle = 'black';
  ctx.font = '16px Arial';
  ctx.fillText(`Frame: ${frameCount}`, 10, 20);
};

export default function CanvasWithUsers({ furnitureObjects }: { furnitureObjects: Furniture[] }) {
  const { users } = useUserManager();

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, frameCount: number) => {
      drawCanvas(ctx, frameCount, users, furnitureObjects);
    },
    [users]
  );

  return <CanvasComponent draw={draw} width={800} height={600} />;
};