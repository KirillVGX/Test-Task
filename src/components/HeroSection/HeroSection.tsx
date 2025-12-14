import { useRef, useEffect, useState } from 'react';
import { useParticlesEffect } from '../../hooks/useParticlesEffect';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import styles from './heroSection.module.css';

export default function HeroSection() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const isTablet = useMediaQuery('(max-width: 768px)');
    useParticlesEffect(canvasRef, btnRef);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className={styles.heroSection}>
            {!isTablet && (
                <canvas
                    ref={canvasRef}
                    className={`${styles.canvas} ${mounted ? styles.show : ''}`}
                    style={{ transitionDelay: '0.0s' }}
                />
            )}

            <div
                className={`${styles.buttonWrapper} ${
                    mounted ? styles.show : ''
                }`}
                style={{ transitionDelay: '0.2s' }}
            >
                <hr className={styles.hrTop} />

                <button
                    className={styles.btn}
                    ref={btnRef}
                >
                    <h4 className={styles.btnText}>START TODAY!</h4>
                </button>

                <hr className={styles.hrBottom} />
            </div>

            <h1
                className={`${styles.title} ${mounted ? styles.show : ''}`}
                style={{ transitionDelay: '0.4s' }}
            >
                Building the future of medicine with AI
            </h1>

            <button
                className={`${styles.navigationBtn} ${
                    mounted ? styles.show : ''
                }`}
                style={{ transitionDelay: '0.6s' }}
            >
                <img
                    src="/icons/arrow.svg"
                    alt="bottom arrow"
                    className={styles.navigationBtnIcon}
                />
            </button>
        </section>
    );
}
