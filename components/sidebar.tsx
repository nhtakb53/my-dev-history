"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AuthButton } from "./auth-button";
import { useState } from "react";
import { ChevronLeft, ChevronRight, User, Briefcase, FolderKanban, Award, GraduationCap, FileText, FileCode, LayoutDashboard, UserCircle } from "lucide-react";

const dataMenuItems = [
  {
    title: "기본사항",
    href: "/data/basic",
    icon: User,
  },
  {
    title: "경력",
    href: "/data/career",
    icon: Briefcase,
  },
  {
    title: "프로젝트",
    href: "/data/projects",
    icon: FolderKanban,
  },
  {
    title: "보유기술",
    href: "/data/skills",
    icon: Award,
  },
  {
    title: "학력",
    href: "/data/education",
    icon: GraduationCap,
  },
];

const documentMenuItems = [
  {
    title: "이력서",
    href: "/resume",
    icon: FileText,
  },
  {
    title: "경력기술서",
    href: "/career",
    icon: FileCode,
  },
];

const mainMenuItems = [
  {
    title: "대시보드",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "내 정보",
    href: "/profile",
    icon: UserCircle,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={cn(
      "flex-shrink-0 h-screen border-r bg-background print:hidden transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b p-6 flex items-center justify-between">
            {!isCollapsed && <h1 className="text-xl font-bold">Mad Story</h1>}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "p-1.5 rounded-md hover:bg-accent transition-colors",
                isCollapsed && "mx-auto"
              )}
            >
              {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            {/* 데이터 입력 */}
            <div className="mb-8">
              <h2 className={cn(
                "mb-3 px-2 text-xs font-bold uppercase tracking-wider",
                isCollapsed ? "text-center" : ""
              )}>
                {isCollapsed ? "📝" : "📝 데이터 입력"}
              </h2>
              <ul className="space-y-0.5">
                {dataMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-md px-3 py-2.5 text-sm transition-all",
                          pathname === item.href
                            ? "bg-primary text-primary-foreground font-medium shadow-sm"
                            : "text-foreground/70 hover:bg-accent hover:text-foreground",
                          isCollapsed ? "flex justify-center px-2" : "flex items-center gap-3"
                        )}
                        title={isCollapsed ? item.title : undefined}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* 문서 */}
            <div className="mb-8">
              <h2 className={cn(
                "mb-3 px-2 text-xs font-bold uppercase tracking-wider",
                isCollapsed ? "text-center" : ""
              )}>
                {isCollapsed ? "📄" : "📄 문서"}
              </h2>
              <ul className="space-y-0.5">
                {documentMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-md px-3 py-2.5 text-sm transition-all",
                          pathname === item.href
                            ? "bg-primary text-primary-foreground font-medium shadow-sm"
                            : "text-foreground/70 hover:bg-accent hover:text-foreground",
                          isCollapsed ? "flex justify-center px-2" : "flex items-center gap-3"
                        )}
                        title={isCollapsed ? item.title : undefined}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* 메인 */}
            <div className="pt-4 border-t">
              <h2 className={cn(
                "mb-3 px-2 text-xs font-bold uppercase tracking-wider",
                isCollapsed ? "text-center" : ""
              )}>
                {isCollapsed ? "🏠" : "🏠 메인"}
              </h2>
              <ul className="space-y-0.5">
                {mainMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-md px-3 py-2.5 text-sm transition-all",
                          pathname === item.href
                            ? "bg-primary text-primary-foreground font-medium shadow-sm"
                            : "text-foreground/70 hover:bg-accent hover:text-foreground",
                          isCollapsed ? "flex justify-center px-2" : "flex items-center gap-3"
                        )}
                        title={isCollapsed ? item.title : undefined}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* Auth Button */}
          <div className="border-t p-4">
            {!isCollapsed && <AuthButton />}
            {isCollapsed && (
              <div className="text-center text-xs text-muted-foreground">👤</div>
            )}
          </div>
        </div>
    </aside>
  );
}
