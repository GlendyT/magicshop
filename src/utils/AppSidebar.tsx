"use client";
import Image from "next/image";
import { LinkRoutes } from "./Data/ListRoutes";
import TTechLogo from "./TTechLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/hooks/components/ui/sidebar";
import Link from "next/link";

const AppSidebar = () => {
  return (
    <>
      <Sidebar>
        <SidebarContent className="flex items-center pt-1">
          <Link href="/">
            <Image
              src="/Polaroid/Only-graphic-darkpurple.webp"
              alt="logo"
              width={25}
              height={25}
              className="object-contain "
              priority
            />
          </Link>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {LinkRoutes.map((linkroute) => (
                  <SidebarMenuItem key={linkroute.id}>
                    <SidebarMenuButton asChild>
                      <Link href={linkroute.path}>
                        <Image
                          src={linkroute.image}
                          alt={linkroute.name}
                          className={`
                    object-contain
                    
                     
                  `}
                          width={50}
                          height={50}
                          priority
                        />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <div className="fixed top-0 right-12 z-60 p-4">
        <TTechLogo />
      </div>
    </>
  );
};

export default AppSidebar;
