'use client'
import { TypeAnimation } from 'react-type-animation';
import { useState } from 'react';

interface IntroProps {
  onIntroComplete?: () => void;
}

export default function Intro({ onIntroComplete }: IntroProps) {
    const [showSecond, setShowSecond] = useState(false);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen relative">
            <div className="text-center mb-8">
                <div className="h-24 flex items-center justify-center">
                    <TypeAnimation
                        sequence={[
                            "Hey, I'm Hamza",
                            1000,
                            () => {
                                setShowSecond(true);
                                if (onIntroComplete) {
                                    onIntroComplete(); // Trigger immediately
                                }
                            }
                        ]}
                        wrapper="div"
                        speed={25}
                        cursor={false}
                        style={{ fontSize: '3em', display: 'block', color: '#d4af37' }}
                    />
                </div>
                {showSecond && (
                    <div className="text-center text-gray-400 mt-4 h-12 flex items-center justify-center">
                        <TypeAnimation
                            sequence={[
                                "Student",
                                1000,
                                "Builder",
                                1000,
                                "Engineer",
                                1000,
                                "Problem Solver",
                                1000,
                                "Learner",
                                1000
                            ]}
                            wrapper="div"
                            speed={25}
                            cursor={false}
                            repeat={Infinity}
                            style={{ fontSize: '1.5em', display: 'block' }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}