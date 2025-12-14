import styles from './header.module.css';
import { navItems } from '../../data/navItems.ts';

export default function Header() {
    return (
        <section className={styles.header}>
            <img
                src="/icons/logo.svg"
                alt="logo"
                className={styles.logoImg}
            />

            <nav className={styles.nav}>
                <ul className={styles.navMenu}>
                    {navItems.map((item) => (
                        <li key={item.href}>
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
        </section>
    );
}
