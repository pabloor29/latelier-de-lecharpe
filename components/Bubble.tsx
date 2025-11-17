"use client";
import { motion } from "framer-motion";
import React from "react";

function Bubble() {
  return (
    <>
      <motion.div
        animate={{
          scale: [1, 1.5],
          y: [50, -3500],
          x: [0, -100, 0, 100],
        }}
        transition={{
          duration: 10,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 1,
        }}
        className="bg-transparent border border-white/50 w-8 h-8 rounded-full -z-0 absolute bottom-0"
      >
        <div className="absolute bg-white/50 w-1 h-1 rounded-full right-2 top-2"></div>
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.5],
          y: [50, -3500],
          x: [0, -100, 0, 100],
        }}
        transition={{
          duration: 10,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 1,
          delay: 1,
        }}
        className="bg-transparent border border-white/50 w-8 h-8 rounded-full -z-0 absolute bottom-0 left-6"
      >
        <div className="absolute bg-white/50 w-1 h-1 rounded-full right-2 top-2"></div>
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.5],
          y: [50, -3500],
          x: [0, -150, 0, 50],
        }}
        transition={{
          duration: 10,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 1,
          delay: 2,
        }}
        className="bg-transparent border border-white/50 w-8 h-8 rounded-full -z-0 absolute bottom-0 right-6"
      >
        <div className="absolute bg-white/50 w-1 h-1 rounded-full right-2 top-2"></div>
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.5],
          y: [50, -3500],
          x: [0, -200, 0, 150],
        }}
        transition={{
          duration: 10,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 1,
          delay: 2.6,
        }}
        className="bg-transparent border border-white/50 w-8 h-8 rounded-full -z-0 absolute bottom-0 left-64"
      >
        <div className="absolute bg-white/50 w-1 h-1 rounded-full right-2 top-2"></div>
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.5],
          y: [50, -3500],
          x: [0, -150, 0, 150],
        }}
        transition={{
          duration: 10,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 1,
          delay: 3,
        }}
        className="bg-transparent border border-white/50 w-8 h-8 rounded-full -z-0 absolute bottom-0 right-64"
      >
        <div className="absolute bg-white/50 w-1 h-1 rounded-full right-2 top-2"></div>
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.5],
          y: [50, -3500],
          x: [0, -150, 0, 250],
        }}
        transition={{
          duration: 10,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 1,
          delay: 3.5,
        }}
        className="bg-transparent border border-white/50 w-8 h-8 rounded-full -z-0 absolute bottom-0 left-1/2"
      >
        <div className="absolute bg-white/50 w-1 h-1 rounded-full right-2 top-2"></div>
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.5],
          y: [50, -3500],
          x: [0, -150, 0, 250],
        }}
        transition={{
          duration: 10,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 1,
          delay: 4.2,
        }}
        className="bg-transparent border border-white/50 w-8 h-8 rounded-full -z-0 absolute bottom-0 right-1/3"
      >
        <div className="absolute bg-white/50 w-1 h-1 rounded-full right-2 top-2"></div>
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.5],
          y: [50, -3500],
          x: [0, -100, 0, 50],
        }}
        transition={{
          duration: 10,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 1,
          delay: 5.2,
        }}
        className="bg-transparent border border-white/50 w-8 h-8 rounded-full -z-0 absolute bottom-0 left-1/4"
      >
        <div className="absolute bg-white/50 w-1 h-1 rounded-full right-2 top-2"></div>
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.5],
          y: [50, -3500],
          x: [0, -300, 0, 100],
        }}
        transition={{
          duration: 10,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 1,
          delay: 6,
        }}
        className="bg-transparent border border-white/50 w-8 h-8 rounded-full -z-0 absolute bottom-0 right-1/4"
      >
        <div className="absolute bg-white/50 w-1 h-1 rounded-full right-2 top-2"></div>
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.5],
          y: [50, -3500],
          x: [0, -50, 0, 150],
        }}
        transition={{
          duration: 10,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 1,
          delay: 6.1,
        }}
        className="bg-transparent border border-white/50 w-8 h-8 rounded-full -z-0 absolute bottom-0 right-1/2"
      >
        <div className="absolute bg-white/50 w-1 h-1 rounded-full right-2 top-2"></div>
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.5],
          y: [50, -3500],
          x: [0, -150, 0, 150],
        }}
        transition={{
          duration: 10,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 1,
          delay: 7.5,
        }}
        className="bg-transparent border border-white/50 w-8 h-8 rounded-full -z-0 absolute bottom-0 right-96"
      >
        <div className="absolute bg-white/50 w-1 h-1 rounded-full right-2 top-2"></div>
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.5],
          y: [50, -3500],
          x: [0, -100, 0, 100],
        }}
        transition={{
          duration: 10,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 1,
          delay: 8.2,
        }}
        className="bg-transparent border border-white/50 w-8 h-8 rounded-full -z-0 absolute bottom-0 left-96"
      >
        <div className="absolute bg-white/50 w-1 h-1 rounded-full right-2 top-2"></div>
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.5],
          y: [50, -3500],
          x: [0, -100, 0, 300],
        }}
        transition={{
          duration: 10,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 1,
          delay: 9,
        }}
        className="bg-transparent border border-white/50 w-8 h-8 rounded-full -z-0 absolute bottom-0 right-1/4"
      >
        <div className="absolute bg-white/50 w-1 h-1 rounded-full right-2 top-2"></div>
      </motion.div>
    </>
  );
}

export default Bubble;
