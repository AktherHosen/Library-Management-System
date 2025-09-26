import { AddBook } from "@/components/home/add-book";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
export default function Navbar() {
  const [openAddBook, setOpenAddBook] = useState(false);
  return (
    <div className="flex items-center justify-between border-b border-border  py-4">
      {/* Logo */}
      <h4 className="text-xl font-bold">Bookify</h4>

      {/* Navigation aligned right */}
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
