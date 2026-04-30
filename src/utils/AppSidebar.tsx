"use client";
import Image from "next/image";
import { LinkRoutes } from "./Data/ListRoutes";
import TTechLogo from "./TTechLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/hooks/components/ui/sidebar";
import Link from "next/link";

const AppSidebar = () => {
  return (
    <>
      <Sidebar>
        <SidebarHeader className="flex items-center h-16 w-full max-w-screen-2xl mx-auto gap-2 md:gap-4 ">
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
        </SidebarHeader>
        <SidebarContent className="flex items-center pt-1">
          <SidebarGroup>
            <SidebarMenu className="flex flex-col gap-2">
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
                        width={100}
                        height={50}
                        priority
                      />
                      <span className="font-inter text-sm font-medium tracking-wide uppercase group-data-[collapsible=icon]:hidden">
                        {linkroute.name}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
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
