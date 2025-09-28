import { AddBook } from "@/components/home/add-book";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Shadcn Sheet for mobile menu
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function Navbar() {
  const [openAddBook, setOpenAddBook] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { title: "All Books", href: "/books" },
    { title: "Add Books", href: "#", action: () => setOpenAddBook(true) },
    { title: "Books Summary", href: "/borrow-summary" },
  ];

  return (
    <div className="flex items-center justify-between py-4  mb-8 border-b border-gray-200">
      <Link
        to="/"
        className="text-xl uppercase font-bold text-primary flex items-center"
      >
        <BookOpen className="mr-2" />
        Campus Library
      </Link>

      <div className="hidden md:flex ml-auto">
        <NavigationMenu>
          <NavigationMenuList>
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                {item.action ? (
                  <NavigationMenuLink
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      item.action?.();
                    }}
                  >
                    {item.title}
                  </NavigationMenuLink>
                ) : (
                  <NavigationMenuLink href={item.href}>
                    {item.title}
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="md:hidden">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="">
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="py-12 px-4 w-64">
            <nav className="flex flex-col gap-3">
              {menuItems.map((item) => (
                <Button
                  key={item.title}
                  variant="outline"
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    }
                    setMobileMenuOpen(false);
                  }}
                  asChild
                >
                  {item.href !== "#" ? (
                    <Link to={item.href}>{item.title}</Link>
                  ) : (
                    <span>{item.title}</span>
                  )}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <AddBook open={openAddBook} onOpenChange={setOpenAddBook} />
    </div>
  );
}
