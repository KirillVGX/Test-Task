import { useEffect } from 'react';

export const useParticlesEffect = (
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    btnRef: React.RefObject<HTMLElement | null>
) => {
    useEffect(() => {
        const canvas = canvasRef.current!;
        if (!canvas) return;

        const ctx = canvas.getContext('2d')!;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: Particle[] = [];
        const particleCount = 10000;

        const mouse = { x: 0, y: 0, radius: 120 };

        const startColor = [157, 80, 254];
        const endColor = [248, 212, 208];

        class Particle {
            x: number;
            y: number;
            baseX: number;
            baseY: number;
            size: number;
            density: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.size = 2;
                this.density = Math.random() * 40 + 5;
            }

            draw() {
                const t = this.x / canvas.width;

                const r = startColor[0] + t * (endColor[0] - startColor[0]);
                const g = startColor[1] + t * (endColor[1] - startColor[1]);
                const b = startColor[2] + t * (endColor[2] - startColor[2]);

                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
                ctx.fillRect(this.x, this.y, this.size, this.size);
            }

            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    let force = (mouse.radius - distance) / mouse.radius;
                    let forceX = (dx / distance) * force * this.density;
                    let forceY = (dy / distance) * force * this.density;

                    this.x -= forceX;
                    this.y -= forceY;
                } else {
                    this.x += (this.baseX - this.x) * 0.05;
                    this.y += (this.baseY - this.y) * 0.05;
                }
            }
        }

        const createMask = () => {
            ctx.beginPath();

            // top line
            ctx.moveTo(0, 200);

            ctx.lineTo(70, 120);
            ctx.lineTo(80, 120);

            ctx.lineTo(270, 200);
            ctx.lineTo(280, 200);

            ctx.lineTo(320, 100);
            ctx.lineTo(360, 100);

            ctx.lineTo(520, 250);
            ctx.lineTo(870, 400);
            ctx.lineTo(900, 400);

            ctx.lineTo(1190, 0);
            ctx.lineTo(1300, 0);
            ctx.lineTo(1540, 200);

            // bottom line
            ctx.lineTo(1540, 700);
            ctx.lineTo(1440, 800);
            ctx.lineTo(1390, 800);

            ctx.lineTo(1200, 600);
            ctx.lineTo(1150, 600);

            ctx.lineTo(1100, 750);
            ctx.lineTo(900, 770);

            ctx.lineTo(770, 900);
            ctx.lineTo(740, 900);

            ctx.lineTo(660, 770);
            ctx.lineTo(450, 550);
            ctx.lineTo(400, 550);

            ctx.lineTo(200, 570);
            ctx.lineTo(160, 610);
            ctx.lineTo(120, 670);
            ctx.lineTo(0, 750);

            ctx.closePath();
            ctx.clip();
        };

        for (let i = 0; i < particleCount; i++) {
            particles.push(
                new Particle(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height
                )
            );
        }

        const animate = () => {
            ctx.restore();
            ctx.save();

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            createMask();

            particles.forEach((p) => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animate);
        };

        ctx.save();
        createMask();
        animate();

        const handleMove = (e: MouseEvent) => {
            if (btnRef.current) {
                const rect = btnRef.current.getBoundingClientRect();

                const isOverButton =
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom;

                if (isOverButton) {
                    mouse.radius = 0;
                    return;
                } else {
                    mouse.radius = 120;
                }
            }

            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('mousemove', handleMove);

        return () => window.removeEventListener('mousemove', handleMove);
    }, []);
};
