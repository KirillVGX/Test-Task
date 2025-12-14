import { useRef } from 'react';
import { useParticlesEffect } from '../../scripts/useParticlesEffect';
import styles from './heroSection.module.css';

export default function HeroSection() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null);
    useParticlesEffect(canvasRef, btnRef);

    return (
        <section className={styles.heroSection}>
            <canvas
                ref={canvasRef}
                className={styles.canvas}
            />

            <div className={styles.buttonWrapper}>
                <hr className={styles.hrTop} />

                <button
                    className={styles.btn}
                    ref={btnRef}
                >
                    <h4 className={styles.btnText}>START TODAY!</h4>
                </button>

                <hr className={styles.hrBottom} />
            </div>

            <h1 className={styles.title}>
                Building the future of medicine with AI
            </h1>
            <button className={styles.navigationBtn}>
                <img
                    src="/icons/arrow.svg"
                    alt="bottom arrow"
                    className={styles.navigationBtnIcon}
                />
            </button>
        </section>
    );
}
