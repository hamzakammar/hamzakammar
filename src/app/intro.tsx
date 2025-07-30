'use client'
import { TypeAnimation } from 'react-type-animation';
import { useState } from 'react';

export default function Intro() {
    const [showSecond, setShowSecond] = useState(false);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <TypeAnimation
                sequence={[
                    "Hey, I'm Hamza",
                    1000,
                    () => setShowSecond(true)
                ]}
                wrapper="div"
                speed={25}
                cursor={false}
                style={{ fontSize: '3em', display: 'block' }}
            />
            {showSecond && (
                <div className="text-center text-gray-500">
                    <TypeAnimation
                        sequence={[
                            "Founder",
                            1000,
                            "Builder",
                            1000,
                            "Engineer",
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
    )
}