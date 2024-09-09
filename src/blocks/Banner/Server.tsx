"use client";

import { Input } from '@/components/ui/input';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';

export default function BannerServer({ title, bannerImage, carousel }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carousel.length);
        }, 5000); // Image change every 5 seconds

        return () => clearInterval(interval);
    }, [carousel]);

    return (
        <div>
            <section className="relative flex justify-center items-center h-[200px] md:h-[400px] overflow-hidden -mt-4"> 
                {/* Removed gap by using negative margin (-mt-4) and reduced height */}
                {/* Background banner image */}
                {bannerImage && (
                    <img
                        src={bannerImage.url}
                        alt={bannerImage.alt || 'Banner Image'}
                        className="absolute w-full h-full top-0 left-0 z-0 object-cover"
                    />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 h-full justify-center items-center gap-6 z-10 w-full px-4 md:px-16">
                    {/* Left Side: Title and Search */}
                    <div className="flex flex-col gap-4">
                        <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight">{title}</h1>
                        <div className="relative mt-4 w-full max-w-[500px]">
                            <div className="absolute left-0 top-0 h-full flex items-center pl-4">
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    className="text-zinc-400"
                                    size="lg"
                                />
                            </div>
                            <Input
                                type="text"
                                placeholder="Masukkan kata kunci carian ..."
                                className="text-zinc-400 py-3 pl-12 text-base md:text-lg rounded-lg w-full bg-white"
                            />
                        </div>
                    </div>

                    {/* Right Side: Carousel */}
                    <div className="relative flex justify-center items-center">
                        <div className="relative w-[300px] h-[150px] md:w-[640px] md:h-[320px] overflow-hidden rounded-lg">
                            {carousel && carousel.length > 0 && (
                                <img
                                    src={carousel[currentImageIndex].image.url}
                                    alt={`Slide ${currentImageIndex}`}
                                    className="w-full h-full object-cover transition-opacity duration-1000"
                                />
                            )}

                            {/* Carousel Left/Right Navigation */}
                            <button
                                onClick={() =>
                                    setCurrentImageIndex(
                                        (prevIndex) =>
                                            (prevIndex - 1 + carousel.length) % carousel.length
                                    )
                                }
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-md"
                            >
                                &#8249;
                            </button>
                            <button
                                onClick={() =>
                                    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carousel.length)
                                }
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-md"
                            >
                                &#8250;
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
