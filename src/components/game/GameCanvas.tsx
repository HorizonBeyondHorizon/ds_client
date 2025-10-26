import React, {useCallback, useEffect, useRef} from 'react';
import {GameState, Vector2D} from "../../shared/types";
import {getRelativeCoordinates} from "../../shared/utils";


interface GameCanvasProps {
    gameState: GameState;
    onChangePosition: (position: Vector2D) => void;
    width?: number;
    height?: number;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({gameState, onChangePosition, width = 800, height = 600}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawGame = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        gameState.boids.forEach(boid => {
            const angle = Math.atan2(boid.velocity.y, boid.velocity.x);

            ctx.save();
            ctx.translate(boid.position.x, boid.position.y);
            ctx.rotate(angle);

            // Рисуем треугольник цветом boid
            ctx.fillStyle = boid.color;
            ctx.beginPath();
            ctx.moveTo(5, 0);
            ctx.lineTo(-4, -3);
            ctx.lineTo(-4, 3);
            ctx.closePath();
            ctx.fill();

            if (boid.separated) {
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }

            ctx.restore();
        });

        gameState.predators.forEach(predator => {
            ctx.fillStyle = predator.color;
            ctx.beginPath();
            ctx.arc(predator.position.x, predator.position.y, 12, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(predator.position.x, predator.position.y, 6, 0, Math.PI * 2);
            ctx.fill();
        });

        const separatedCount = gameState.boids.filter(boid => boid.separated).length;
        if (separatedCount === gameState.boids.length) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#FFFFFF';
            ctx.font = '36px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Ducks Sorted!', canvas.width / 2, canvas.height / 2);

            ctx.font = '24px Arial';
            ctx.fillText('All boids are in monochromatic groups', canvas.width / 2, canvas.height / 2 + 40);
        }
    }, [gameState]);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            canvasRef.current && onChangePosition(getRelativeCoordinates(e, canvasRef.current))
        };
        canvasRef.current?.addEventListener('mousemove', move);
        return () => {
            canvasRef.current?.removeEventListener('mousemove', move);
        }
    }, [onChangePosition])

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const render = () => {
            drawGame();
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [drawGame]);

    return (
        <div style={{position: 'relative'}}>
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                style={{
                    border: '2px solid #333',
                    background: '#111',
                    display: 'block',
                    margin: '0 auto'
                }}
            />
        </div>
    );
};