import { useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*';

type Props = {
    text: string;
};

export default function ScrambleText({ text }: Props) {
    const ref = useRef<HTMLSpanElement>(null);

    const handleHover = () => {
        if (!ref.current) return;

        let iteration = 0;
        const interval = setInterval(() => {
            if (!ref.current) return;

            ref.current.innerText = text
                .split('')
                .map((char, i) => {
                    if (i < iteration) return char;
                    if (
                        i === Math.floor(iteration) ||
                        i === Math.floor(iteration) + 2
                    ) {
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    }
                    return char;
                })
                .join('');

            iteration += 0.25;

            if (iteration >= text.length) {
                clearInterval(interval);
                ref.current.innerText = text;
            }
        }, 40);
    };

    return (
        <span
            ref={ref}
            onMouseEnter={handleHover}
        >
            {text}
        </span>
    );
}
