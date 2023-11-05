"use client";

import React from "react";
import Container from "./ui/container";
import Link from "next/link";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { MoonStar, Sun, Lightbulb, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="py-3 px-4 border-b ">
      <Container>
        <div className="w-10/12 mx-auto px-4 6 flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="ml-4 lg:ml-0">
              <h1 className="text-2xl font-bold flex">
                <span className="text-3xl font-base align-middle">Insight</span>
                <span className="text-3xl font-thin">Wire</span>
                <Lightbulb className="mr-2 h-8 w-8" />
              </h1>
            </Link>
          </div>

          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              className="mr-3"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-8 w-8 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonStar className="absolute h-8 w-8 rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
            <Avatar className="h-12 w-12">
              <AvatarImage
                src="https://ui.shadcn.com/avatars/01.png"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
