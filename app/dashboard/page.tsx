"use client";

import Link from "next/link";
import { FileText, Briefcase, User, Calendar, TrendingUp, Award } from "lucide-react";
import { getBasicInfo, getCareers, getSkills, getProjects, getEducations } from "@/lib/api";
import { useSupabaseData } from "@/hooks/useSupabaseData";

interface BasicInfo {
  name: string;
  email: string;
}

interface Career {
  id: string;
  company: string;
  current: boolean;
  start_date: string;
  end_date?: string;
}

interface Skill {
  id: string;
}

interface Project {
  id: string;
}

interface Education {
  id: string;
}

export default function DashboardPage() {
  const { data: basicInfo } = useSupabaseData<BasicInfo>(getBasicInfo, []);
  const { data: careers } = useSupabaseData<Career[]>(getCareers, []);
  const { data: skills } = useSupabaseData<Skill[]>(getSkills, []);
  const { data: projects } = useSupabaseData<Project[]>(getProjects, []);
  const { data: educations } = useSupabaseData<Education[]>(getEducations, []);

  const currentCareer = careers?.find(c => c.current);

  const totalCareerMonths = (careers || []).reduce((total, career) => {
    const start = new Date(career.start_date);
    const end = career.current ? new Date() : new Date(career.end_date || career.start_date);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return total + months;
  }, 0);

  const years = Math.floor(totalCareerMonths / 12);
  const months = totalCareerMonths % 12;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">대시보드</h1>
        <p className="text-muted-foreground">
          안녕하세요, {basicInfo?.name || "개발자"}님! 👋
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 opacity-80" />
            <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">경력</span>
          </div>
          <div className="text-3xl font-bold mb-1">
            {years > 0 ? `${years}년 ${months}개월` : `${months}개월`}
          </div>
          <p className="text-sm opacity-90">총 경력 기간</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Briefcase className="w-8 h-8 opacity-80" />
            <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">프로젝트</span>
          </div>
          <div className="text-3xl font-bold mb-1">{projects?.length || 0}</div>
          <p className="text-sm opacity-90">완료한 프로젝트</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-8 h-8 opacity-80" />
            <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">기술</span>
          </div>
          <div className="text-3xl font-bold mb-1">{skills?.length || 0}</div>
          <p className="text-sm opacity-90">보유 기술</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 opacity-80" />
            <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">회사</span>
          </div>
          <div className="text-3xl font-bold mb-1">{careers?.length || 0}</div>
          <p className="text-sm opacity-90">경력 회사 수</p>
        </div>
      </div>

      {/* 현재 상태 */}
      {currentCareer && (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border-2 border-primary/20 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-primary" />
            현재 재직중
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-2xl font-semibold mb-1">{currentCareer.company}</p>
              <p className="text-muted-foreground">{currentCareer.start_date} ~ 현재</p>
            </div>
          </div>
        </div>
      )}

      {/* 빠른 작업 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">빠른 작업</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/resume"
            className="group bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-800 hover:border-primary hover:shadow-xl transition-all"
          >
            <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">이력서 작성</h3>
            <p className="text-muted-foreground text-sm">
              이력서를 작성하고 PDF로 저장하세요
            </p>
          </Link>

          <Link
            href="/career"
            className="group bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-800 hover:border-primary hover:shadow-xl transition-all"
          >
            <Briefcase className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">경력기술서 작성</h3>
            <p className="text-muted-foreground text-sm">
              경력기술서를 작성하고 PDF로 저장하세요
            </p>
          </Link>

          <Link
            href="/profile"
            className="group bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-800 hover:border-primary hover:shadow-xl transition-all"
          >
            <User className="w-12 h-12 text-green-600 dark:text-green-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">내 정보 관리</h3>
            <p className="text-muted-foreground text-sm">
              기본정보, 경력, 프로젝트 등을 관리하세요
            </p>
          </Link>
        </div>
      </div>

      {/* 데이터 현황 */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold mb-4">데이터 현황</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="font-semibold">기본사항</span>
            <span className={`px-3 py-1 rounded-full text-sm ${basicInfo?.name ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
              {basicInfo?.name ? '입력완료' : '미입력'}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="font-semibold">경력</span>
            <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              {careers?.length || 0}개
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="font-semibold">보유기술</span>
            <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
              {skills?.length || 0}개
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="font-semibold">프로젝트</span>
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              {projects?.length || 0}개
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="font-semibold">학력</span>
            <span className="px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
              {educations?.length || 0}개
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
