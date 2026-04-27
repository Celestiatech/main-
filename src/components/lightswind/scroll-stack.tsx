"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface ScrollStackCard {
  title: string;
  subtitle?: string;
  badge?: string;
  backgroundImage?: string;
  content?: React.ReactNode;
}

interface ScrollStackProps {
  cards: ScrollStackCard[];
  backgroundColor?: string;
  cardHeight?: string;
  className?: string;
}

const defaultBackgrounds = [
  "https://images.pexels.com/photos/6985136/pexels-photo-6985136.jpeg",
  "https://images.pexels.com/photos/6985128/pexels-photo-6985128.jpeg",
  "https://images.pexels.com/photos/2847648/pexels-photo-2847648.jpeg",
  "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
  "https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg",
];

export const ScrollStack: React.FC<ScrollStackProps> = ({
  cards,
  backgroundColor = "bg-gradient-to-b from-slate-900 to-slate-800",
  cardHeight = "60vh",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardCount = Math.min(cards.length, 5);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height: `${cardCount * 150}vh` }}
    >
      <div className={`sticky top-0 h-screen w-full overflow-hidden ${backgroundColor}`}>
        <div className="h-full flex items-center justify-center">
          <div className="relative w-full mx-auto px-6" style={{ height: cardHeight }}>
            {cards.slice(0, 5).map((card, index) => {
              const cardDuration = 1 / cardCount;
              const cardStart = index * cardDuration;
              const cardEnd = (index + 1) * cardDuration;

              const opacity = useTransform(
                scrollYProgress,
                [
                  Math.max(0, cardStart - 0.1),
                  cardStart,
                  cardEnd - 0.05,
                  cardEnd,
                ],
                [0, 1, 1, 0]
              );

              const scale = useTransform(
                scrollYProgress,
                [
                  Math.max(0, cardStart - 0.1),
                  cardStart,
                  cardEnd - 0.05,
                  cardEnd,
                ],
                [0.8, 1, 1, 0.95]
              );

              const y = useTransform(
                scrollYProgress,
                [
                  Math.max(0, cardStart - 0.1),
                  cardStart,
                  cardEnd - 0.05,
                  cardEnd,
                ],
                [40, 0, 0, -30]
              );

              const zIndex = useTransform(
                scrollYProgress,
                [cardStart, cardEnd],
                [index, index + 10]
              );

              const backgroundImage =
                card.backgroundImage ||
                defaultBackgrounds[index % defaultBackgrounds.length];

              return (
                <motion.div
                  key={`card-${index}`}
                  className="absolute left-1/2 top-0 w-full -translate-x-1/2 rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    height: cardHeight,
                    opacity,
                    scale,
                    y,
                    zIndex,
                  }}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url('${backgroundImage}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80" />

                  {/* Badge */}
                  {card.badge && (
                    <div className="absolute top-6 right-6 z-20">
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/30">
                        {card.badge}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 p-8 h-full flex items-center">
                    {card.content ? (
                      card.content
                    ) : (
                      <div className="max-w-lg">
                        <h3 className="text-4xl font-bold text-white leading-tight mb-3">
                          {card.title}
                        </h3>
                        {card.subtitle && (
                          <p className="text-xl text-white/80">{card.subtitle}</p>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollStack;
