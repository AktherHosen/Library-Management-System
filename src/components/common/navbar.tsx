import { AddBook } from "@/components/home/add-book";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { BookOpen } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
export default function Navbar() {
  const [openAddBook, setOpenAddBook] = useState(false);
  return (
    <div className="flex items-center justify-between py-4 mb-8">
      <Link
        to="/"
        className="text-xl uppercase font-bold text-primary flex items-center"
      >
        <BookOpen className="mr-2" />
        Campus Library
      </Link>

      <NavigationMenu className="ml-auto items-end justify-self-end">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/books">All Books</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setOpenAddBook(true);
              }}
            >
              Add Books
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/borrow-summary">
              Books Summary
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <AddBook open={openAddBook} onOpenChange={setOpenAddBook} />
    </div>
  );
}
