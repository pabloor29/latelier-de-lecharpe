"use client";

import React from "react";
import { AlignJustify, Utensils } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";
import { Variants, motion } from "framer-motion";

const links = [
  {
    label: "accueil",
    href: "/",
  },
  {
    label: "a propos",
    href: "/apropos",
  },
  {
    label: "menu",
    href: "/menu",
  },
  {
    label: "contact",
    href: "/contact",
  },
];

const Variants: Variants = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "linear",
      duration: 1,
      delay: 0.5,
    },
  },
};

function Navbar() {
  return (
    <nav className="w-full">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "30%" }}
        variants={Variants}
        className="fixed w-full h-16 backdrop-blur justify-between items-center text-white px-8 z-50 bg-[#002E6D]/80 hidden lg:flex"
      >
        <a href="/" className="h-14 w-14">
          <img src="/logo-white.webp" alt="logo de floridablanca" />
        </a>
        <div>
          <li className="flex justify-center space-x-12">
            {links.map((link) => (
              <a
                href={link.href}
                className="border-b-[1px] border-transparent leading-none hover:border-b-[1px] hover:border-white font-spaceTransit text-4xl tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </li>
        </div>
        <Link
          href="/reservation"
          className="px-3 py-1 bg-white/5 hover:bg-white leading-none cursor-pointer duration-200 text-white hover:text-black font-spaceTransit text-4xl tracking-wide"
        >
          RESERVATION
        </Link>
      </motion.div>

      <div className="lg:hidden fixed top-6 z-50 flex justify-between w-full px-6">
        <Sheet key="left">
          <SheetTrigger className="overflow-hidden w-10 h-10 rounded-full shadow">
            <img src="/hamburger-menu.png" alt="hamburger menu icon" />
          </SheetTrigger>
          <SheetContent className="bg-[#002E6D]">
            <SheetHeader>
              <SheetDescription className="flex flex-col">
                {links.map((items) => (
                  <a
                    key={items.label}
                    href={items.href}
                    className="overflow-hidden h-20 w-4/5 flex items-center text-white hover:bg-[#274b7e] duration-300 px-5 py-3 cursor-pointer"
                  >
                    <h3 className="font-spaceTransit text-6xl tracking-wide">
                      {items.label.toUpperCase()}
                    </h3>
                  </a>
                ))}
                <a
                  href="/reservation"
                  className="overflow-hidden h-20 w-4/5 flex items-center text-white hover:bg-[#274b7e] duration-300 px-5 py-3 cursor-pointer"
                >
                  <h3 className="font-spaceTransit text-6xl tracking-wide">
                    RESERVATION
                  </h3>
                </a>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <a
          href="/reservation"
          className="shadow cursor-pointer overflow-hidden h-10 px-3 rounded-full bg-white flex items-center justify-center"
        >
          <h3 className="font-spaceTransit text-3xl tracking-wide text-[#002E6D]">reserver</h3>
        </a>
        {/* <a href="/reservation" className="shadow cursor-pointer overflow-hidden w-10 h-10 rounded-full bg-white flex items-center justify-center">
          <Utensils />
        </a> */}
      </div>
    </nav>
  );
}

export default Navbar;
