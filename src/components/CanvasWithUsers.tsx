import { useCallback } from "react";
import { useUserManager } from "../contexts/UserManager";
import CanvasComponent from "./CanvasComponent";

const drawCanvas = (
    ctx: CanvasRenderingContext2D,
    frameCount: number,
    users: { id: string; x: number; y: number; color: string }[]
  ) => {
    // Clear the canvas
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
  
    // Draw each user
    users.forEach((user) => {
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

export default function CanvasWithUsers () {
    const { users } = useUserManager();

    const draw = useCallback(
        (ctx: CanvasRenderingContext2D, frameCount: number) => {
            drawCanvas(ctx, frameCount, users);
        },
        [users]
    );

    return <CanvasComponent draw={draw} width={800} height={600} />;
};