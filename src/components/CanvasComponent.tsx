import { useEffect, useRef } from "react";
import { useUserManager } from "../contexts/UserManager";

interface CanvasComponentProps {
    draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void;
    width: number;
    height: number;
}

export default function CanvasComponent({ draw, width, height }: CanvasComponentProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {users} = useUserManager();

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        let frameCount = 0;
        let animationFrameId: number;

        const render = ()=>{
            if(context){
                frameCount++;
                if(users[1]){
                    users[1].x = users[1].x >= width ? 0 : users[1].x+1;
                    users[1].y = users[1].y >= height ? 0 : users[1].y+1;
                    draw(context, frameCount);
                }
            }
            animationFrameId = requestAnimationFrame(render);
        }

        render();

        return ()=>cancelAnimationFrame(animationFrameId);
    }, [draw]);

    return (
        <canvas ref={canvasRef} width={width} height={height}></canvas>
    )
}
