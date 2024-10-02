import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
  } from "@/components/ui/menubar"

export default function H1Tabs() {
  return (
    <Menubar className="text-sm">
            <MenubarMenu>
              <MenubarTrigger>Dataset</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Computer Vision</MenubarItem>
                  <MenubarItem>Natural Language Processing</MenubarItem>
                  <MenubarItem>Data Science</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarSeparator />
              <MenubarTrigger>Notes</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>School of A</MenubarItem>
                  <MenubarItem>School of A</MenubarItem>
                  <MenubarItem>School of A</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarSeparator />
              <MenubarTrigger>Articles</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>School of B</MenubarItem>
                  <MenubarItem>School of B</MenubarItem>
                  <MenubarItem>School of B</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
          </Menubar>
  )
}