'use client';

import React, { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { motion, AnimatePresence } from 'framer-motion';

interface CelebrationOverlayProps {
    isCompleted: boolean;
    duration?: number; // ms
}

export default function CelebrationOverlay({ isCompleted, duration = 10000 }: CelebrationOverlayProps) {
    const { width, height } = useWindowSize();
    const [show, setShow] = useState(false);
    const [hasBeenShown, setHasBeenShown] = useState(false);

    useEffect(() => {
        // Innesca solo quando passa da false a true e non è ancora stato mostrato
        if (isCompleted && !hasBeenShown) {
            // Usiamo requestAnimationFrame per evitare il warning di setState sincrono nell'effetto
            const frame = requestAnimationFrame(() => {
                setHasBeenShown(true);
                setShow(true);
            });

            const timer = setTimeout(() => {
                setShow(false);
            }, duration);
            
            return () => {
                cancelAnimationFrame(frame);
                clearTimeout(timer);
            };
        }
    }, [isCompleted, hasBeenShown, duration]);

    return (
        <AnimatePresence>
            {show && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 100, pointerEvents: 'none' }}>
                    <ReactConfetti
                        width={width}
                        height={height}
                        recycle={true}
                        numberOfPieces={500}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            pointerEvents: 'auto'
                        }}
                    >
                        <div style={{
                            backgroundColor: 'white',
                            padding: '2rem 4rem',
                            borderRadius: '1.5rem',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            textAlign: 'center'
                        }}>
                            <h2 style={{
                                fontSize: '4rem',
                                fontWeight: 900,
                                color: '#18181b',
                                margin: 0,
                                letterSpacing: '-0.025em'
                            }}>
                                CHALLENGE COMPLETATA!
                            </h2>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
