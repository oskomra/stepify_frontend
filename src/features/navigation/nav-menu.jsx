import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export default function NavMenu() {
  return (
    <nav className="px-4 py-2 bg-neutral-800 border-t border-neutral-500">
      <div className="flex justify-center items-center">
        <NavigationMenu className="flex justify-center">
          <NavigationMenuList className="">
            <NavigationMenuItem className="">
              <NavigationMenuTrigger className="bg-neutral-800 text-neutral-300">
                Men
              </NavigationMenuTrigger>
              <NavigationMenuContent className=""></NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="">
              <NavigationMenuTrigger className="bg-neutral-800 text-neutral-300">
                Women
              </NavigationMenuTrigger>
              <NavigationMenuContent className=""></NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="">
              <NavigationMenuTrigger className="bg-neutral-800 text-neutral-300">
                Kids
              </NavigationMenuTrigger>
              <NavigationMenuContent className=""></NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="">
              <NavigationMenuTrigger className="bg-neutral-800 text-neutral-300">
                Brands
              </NavigationMenuTrigger>
              <NavigationMenuContent className=""></NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="">
              <NavigationMenuTrigger className="bg-neutral-800 text-neutral-300">
                Sale
              </NavigationMenuTrigger>
              <NavigationMenuContent className=""></NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
