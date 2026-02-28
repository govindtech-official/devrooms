"use client";

import { motion } from "framer-motion";

const images = [
  "/images/code1.jpg",
  "/images/code2.jpg",
  "/images/code3.jpg",
  "/images/code4.jpg",
  "/images/code5.jpg",
  "/images/code6.jpg",
];

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      <div className="grid grid-cols-3 gap-4 p-10 opacity-20">
        {images.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt="background"
            className="rounded-2xl object-cover w-full h-60"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/90 to-[#0B1220] backdrop-blur-sm" />
    </div>
  );
}