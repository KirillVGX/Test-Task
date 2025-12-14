import styles from './header.module.css';
import { navItems } from '../../data/navItems.ts';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal.tsx';

export default function Header() {
    const [mounted, setMounted] = useState(false);
    const isTablet = useMediaQuery('(max-width: 768px)');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className={`${styles.header} ${mounted ? styles.show : ''}`}>
            <img
                src="/icons/logo.svg"
                alt="logo"
                className={styles.logoImg}
            />

            {!isTablet && (
                <nav className={styles.nav}>
                    <ul className={styles.navMenu}>
                        {navItems.map((item, i) => (
                            <li
                                key={item.href}
                                className={styles.navItem}
                                style={{
                                    transitionDelay: `${0.1 + i * 0.06}s`,
                                }}
                            >
                                <a
                                    href={item.href}
                                    className={styles.navEl}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}

            {isTablet && (
                <>
                    <button
                        className={styles.burgerBtn}
                        onClick={() => setIsOpen(true)}
                        aria-label="Open menu"
                    >
                        <img
                            src="/icons/burger.svg"
                            alt="Navigation menu"
                            className={styles.burgerIcon}
                        />
                    </button>
                </>
            )}

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <nav>
                    <ul className={styles.modalNav}>
                        {navItems.map((item) => (
                            <li
                                key={item.href}
                                className={styles.navItem}
                            >
                                <a
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={styles.navEl}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </Modal>
        </section>
    );
}
