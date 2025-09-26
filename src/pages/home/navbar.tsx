import { AddBooks } from "@/components/home/add-books"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { useState } from "react"
export default function Navbar() {
  const [openAddBook, setOpenAddBook] = useState(false)
  return (
    <div className="flex items-center justify-between border-b border-border  py-4">
      {/* Logo */}
      <h4 className="text-xl font-bold">Bookify</h4>

      {/* Navigation aligned right */}
      <NavigationMenu className="ml-auto items-end justify-self-end">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">All Books</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setOpenAddBook(true)
              }}
            >
              Add Books
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Books Summary</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
       <AddBooks open={openAddBook} onOpenChange={setOpenAddBook} />
    </div>
  )
}
