import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

export default function Navbar() {
  return (
    <div className="flex items-center justify-between border-b  py-4">
      {/* Logo */}
      <h4 className="text-xl font-bold">Bookify</h4>

      {/* Navigation aligned right */}
      <NavigationMenu className="ml-auto items-end justify-self-end">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">All Books</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Add Books</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Books Summary</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
