"use client";

import * as React from "react";
import {
  Store,
  Gamepad2,
  MessageCircle,
  Users,
  GraduationCap,
  Bot,
  Wand2,
  Handshake,
  MapPin,
  Trophy,
  DollarSign,
  Building,
  TrendingUp,
  Lightbulb,
  BarChart3,
  FileCheck,
  Home,
  Briefcase,
  Target,
  GalleryVerticalEnd,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Features organized by user journey and ease of use
const data = {
  navMain: [
    {
      titleKey: "dashboard",
      url: "#",
      icon: Home,
      items: [
        {
          titleKey: "overview",
          url: "/dashboard",
          icon: Target,
        },
      ],
    },
    {
      titleKey: "businessSetup",
      url: "#",
      icon: Briefcase,
      items: [
        {
          titleKey: "ideaGenerator",
          url: "/business-setup/idea-generator",
          icon: Lightbulb,
        },
        {
          titleKey: "designGenerator",
          url: "/business-setup/design-generator",
          icon: Wand2,
        },
        {
          titleKey: "pricingPredictor",
          url: "/business-setup/pricing-predictor",
          icon: BarChart3,
        },
        {
          titleKey: "storeBuilder",
          url: "/business-setup/store-builder",
          icon: Store,
        },
      ],
    },

    {
      titleKey: "community",
      url: "#",
      icon: Users,
      items: [
        {
          titleKey: "partnerMatching",
          url: "/community/partner-matching",
          icon: Handshake,
        },
        {
          titleKey: "events",
          url: "/community/events",
          icon: MapPin,
        },
        {
          titleKey: "leaderboard",
          url: "/community/leaderboard",
          icon: Trophy,
        },
      ],
    },
    {
      titleKey: "growthFunding",
      url: "#",
      icon: DollarSign,
      items: [
        {
          titleKey: "investorHub",
          url: "/growth-funding/investors",
          icon: Building,
        },
        {
          titleKey: "schemes",
          url: "/growth-funding/schemes",
          icon: FileCheck,
        },
        {
          titleKey: "successScore",
          url: "/growth-funding/success-score",
          icon: TrendingUp,
        },
      ],
    },
    {
      titleKey: "learningHub",
      url: "#",
      icon: GraduationCap,
      items: [
        {
          titleKey: "gamifiedCourses",
          url: "/learning/courses",
          icon: Gamepad2,
        },
        {
          titleKey: "aiMentor",
          url: "/learning/ai-mentor",
          icon: Bot,
        },
        {
          titleKey: "communityLearning",
          url: "/learning/community",
          icon: MessageCircle,
        },
      ],
    },
  ],
} as const;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">{t.common.appName}</span>
                  <span className="">{t.common.tagline}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => {
              const groupTitle = t.nav[item.titleKey];

              return (
                <SidebarMenuItem key={item.titleKey}>
                  <SidebarMenuButton
                    asChild
                    tooltip={groupTitle}
                    className="bg-main text-foreground"
                  >
                    <h1 className="font-medium">
                      {item.icon && <item.icon />}
                      <span>{groupTitle}</span>
                    </h1>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const isActive = pathname === subItem.url;
                        const subItemTitle = t.nav[subItem.titleKey];
                        return (
                          <SidebarMenuSubItem key={subItem.titleKey}>
                            <SidebarMenuSubButton
                              asChild
                              className={`hover:bg-main/80 transition-colors text-foreground duration-200 ${
                                isActive ? "bg-main/80" : ""
                              }`}
                            >
                              <Link
                                href={subItem.url}
                                className="flex items-center gap-2"
                              >
                                {subItem.icon && (
                                  <subItem.icon className="size-4" />
                                )}
                                <span>{subItemTitle}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground/70">
              {t.common.language}
            </span>
            <LanguageToggle />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground/70">{t.common.theme}</span>
            <ThemeToggle />
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
