"use client";

import Link from "next/link";
import { User, Briefcase, Award, GraduationCap, FolderKanban, Settings } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">내 정보</h1>
        <p className="text-muted-foreground">
          이력서 및 경력기술서에 사용될 정보를 관리하세요
        </p>
      </div>

      {/* 정보 관리 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/data/basic"
          className="group bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <User className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold">기본사항</h3>
              <p className="text-sm text-muted-foreground">개인정보 관리</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            이름, 연락처, GitHub, 블로그, 자기소개 등을 입력하세요
          </p>
        </Link>

        <Link
          href="/data/career"
          className="group bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-800 hover:border-purple-500 hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold">경력</h3>
              <p className="text-sm text-muted-foreground">회사 및 직무 관리</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            회사명, 직책, 재직기간, 업무 내용 및 주요 성과를 입력하세요
          </p>
        </Link>

        <Link
          href="/data/skills"
          className="group bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-800 hover:border-green-500 hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="w-7 h-7 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold">보유기술</h3>
              <p className="text-sm text-muted-foreground">기술 스택 관리</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            카테고리별 기술 스택 및 숙련도를 입력하세요
          </p>
        </Link>

        <Link
          href="/data/education"
          className="group bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-800 hover:border-orange-500 hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-7 h-7 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold">학력</h3>
              <p className="text-sm text-muted-foreground">학력 정보 관리</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            학교, 전공, 학위, 학점 정보를 입력하세요
          </p>
        </Link>

        <Link
          href="/data/projects"
          className="group bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-800 hover:border-pink-500 hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <FolderKanban className="w-7 h-7 text-pink-600 dark:text-pink-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold">프로젝트</h3>
              <p className="text-sm text-muted-foreground">프로젝트 이력 관리</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            프로젝트명, 설명, 기간, 역할, 기술 스택, 주요 성과를 입력하세요
          </p>
        </Link>

        <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg border-2 border-gray-300 dark:border-gray-700 opacity-60">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gray-300 dark:bg-gray-700 rounded-xl flex items-center justify-center">
              <Settings className="w-7 h-7 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold">계정 설정</h3>
              <p className="text-sm text-muted-foreground">준비중</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            계정 설정 기능이 곧 추가됩니다
          </p>
        </div>
      </div>

      {/* 안내 메시지 */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-2 text-blue-900 dark:text-blue-200">💡 안내</h3>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          각 항목을 클릭하여 정보를 입력하거나 수정할 수 있습니다.
          입력한 정보는 자동으로 저장되며, 이력서와 경력기술서 작성 시 활용됩니다.
        </p>
      </div>
    </div>
  );
}
