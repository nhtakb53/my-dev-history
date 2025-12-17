"use client";

import { useFileStorage } from "@/hooks/useFileStorage";
import { BasicInfo, Career, Skill, Education, Project } from "@/types/resume";
import { useState } from "react";
import Link from "next/link";

const getLevelText = (level: number) => {
  const levels = {
    1: "기본적인 사용 경험과 협업에 필요한 지식 보유",
    2: "매우 능숙하지는 않지만 업무 수행 가능",
    3: "관련 지식과 경험이 풍부하며 능숙하게 업무 진행 가능",
  };
  return levels[level as keyof typeof levels] || "";
};

export default function ResumePage() {
  const [basicInfo, , loadingBasic] = useFileStorage<BasicInfo>("basic-info", {
    name: "",
    nameEn: "",
    email: "",
    phone: "",
  });
  const [careers, , loadingCareers] = useFileStorage<Career[]>("careers", []);
  const [skills, , loadingSkills] = useFileStorage<Skill[]>("skills", []);
  const [educations, , loadingEducations] = useFileStorage<Education[]>("educations", []);
  const [projects, , loadingProjects] = useFileStorage<Project[]>("projects", []);

  const [selectedSections, setSelectedSections] = useState({
    basic: true,
    introduce: true,
    career: true,
    skills: true,
    education: true,
    projects: true,
  });

  const [isPreview, setIsPreview] = useState(false);

  const toggleSection = (section: keyof typeof selectedSections) => {
    setSelectedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const totalCareerMonths = careers.reduce((total, career) => {
    const start = new Date(career.startDate);
    const end = career.current ? new Date() : new Date(career.endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return total + months;
  }, 0);

  const years = Math.floor(totalCareerMonths / 12);
  const months = totalCareerMonths % 12;

  const loading = loadingBasic || loadingCareers || loadingSkills || loadingEducations || loadingProjects;

  const ResumeContent = () => (
    <div className="a4-page bg-white shadow-lg">
      {selectedSections.basic && (
        <div className="flex items-start gap-6 mb-8 pb-6 border-b-2">
          {basicInfo.profileImage && (
            <img
              src={basicInfo.profileImage}
              alt={basicInfo.name}
              className="w-32 h-32 rounded-lg object-cover"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-blue-600 mb-1">
              {basicInfo.name || "이름 없음"} {basicInfo.nameEn && `(${basicInfo.nameEn})`}
            </h1>
            <div className="flex gap-4 text-sm mt-3">
              {basicInfo.email && (
                <div className="flex items-center gap-1">
                  <span>✉</span>
                  <a href={`mailto:${basicInfo.email}`} className="hover:underline">
                    {basicInfo.email}
                  </a>
                </div>
              )}
              {basicInfo.phone && (
                <div className="flex items-center gap-1">
                  <span>☎</span>
                  <span>{basicInfo.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedSections.introduce && basicInfo.introduce && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">INTRODUCE</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{basicInfo.introduce}</p>
        </div>
      )}

      {selectedSections.career && careers.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-1">EXPERIENCE</h2>
          <p className="text-sm text-gray-600 mb-4">총 {years}년 {months}개월</p>
          <div className="space-y-6">
            {careers.map((career) => {
              const start = new Date(career.startDate);
              const end = career.current ? new Date() : new Date(career.endDate);
              const careerMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
              const careerYears = Math.floor(careerMonths / 12);
              const careerRemainingMonths = careerMonths % 12;

              return (
                <div key={career.id} className="border-l-4 border-blue-600 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-gray-600">
                        {career.startDate} ~ {career.current ? "현재" : career.endDate}
                      </p>
                      <p className="text-xs text-blue-600 font-medium">
                        {careerYears}년 {careerRemainingMonths}개월
                      </p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{career.company}</h3>
                  <p className="text-gray-700 font-medium mb-2">{career.position}</p>
                  {career.description && <p className="text-gray-700 mb-3 leading-relaxed">{career.description}</p>}
                  {career.achievements.length > 0 && (
                    <ul className="space-y-1 text-sm text-gray-700">
                      {career.achievements.map((achievement, index) => (
                        <li key={index} className="flex">
                          <span className="mr-2">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedSections.skills && Object.keys(groupedSkills).length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">SKILL</h2>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="space-y-1 text-xs text-gray-600">
              <p><span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white font-bold mr-2">3</span>{getLevelText(3)}</p>
              <p><span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white font-bold mr-2">2</span>{getLevelText(2)}</p>
              <p><span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white font-bold mr-2">1</span>{getLevelText(1)}</p>
            </div>
          </div>
          <div className="space-y-4">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category} className="flex">
                <div className="w-32 font-bold text-gray-700">{category}</div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-3">
                    {categorySkills.map((skill) => (
                      <div key={skill.id} className="flex items-center gap-1">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold">
                          {skill.level}
                        </span>
                        <span className="text-sm">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedSections.education && educations.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">EDUCATION</h2>
          <div className="space-y-3">
            {educations.map((education) => (
              <div key={education.id} className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600">{education.startDate} ~ {education.endDate}</p>
                  <h3 className="font-bold">{education.school}</h3>
                  <p className="text-sm text-gray-700">{education.major} / {education.degree}</p>
                  {education.gpa && <p className="text-sm text-gray-600">학점: {education.gpa}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedSections.projects && projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">PROJECT</h2>
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="border-l-4 border-blue-600 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm text-gray-600">{project.startDate} ~ {project.endDate}</p>
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    <p className="text-sm text-gray-600 italic">{project.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{project.description}</p>
                {project.techStack.length > 0 && (
                  <div className="mb-2">
                    <span className="font-semibold text-sm">Skill Keywords: </span>
                    <div className="inline-flex flex-wrap gap-1">
                      {project.techStack.map((tech, idx) => (
                        <span key={idx} className="bg-gray-700 text-white px-2 py-0.5 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {project.achievements.length > 0 && (
                  <ul className="space-y-1 text-sm text-gray-700">
                    {project.achievements.map((achievement, index) => (
                      <li key={index} className="flex">
                        <span className="mr-2">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (isPreview) {
    return (
      <div className="min-h-screen bg-gray-100 print:bg-white">
        <div className="fixed top-4 right-4 z-10 print:hidden">
          <button
            onClick={() => setIsPreview(false)}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 shadow-lg mr-2"
          >
            편집 모드로 돌아가기
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 shadow-lg"
          >
            PDF 저장
          </button>
        </div>
        <div className="py-8 flex justify-center print:p-0">
          <ResumeContent />
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="p-8">로딩 중...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">이력서</h1>
        <button
          onClick={() => setIsPreview(true)}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          미리보기
        </button>
      </div>

      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">포함할 섹션 선택</h2>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedSections.basic}
              onChange={() => toggleSection("basic")}
              className="mr-3 w-4 h-4"
            />
            <span>기본사항</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedSections.introduce}
              onChange={() => toggleSection("introduce")}
              className="mr-3 w-4 h-4"
            />
            <span>자기소개</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedSections.career}
              onChange={() => toggleSection("career")}
              className="mr-3 w-4 h-4"
            />
            <span>경력 ({careers.length}개)</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedSections.skills}
              onChange={() => toggleSection("skills")}
              className="mr-3 w-4 h-4"
            />
            <span>보유기술 ({skills.length}개)</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedSections.education}
              onChange={() => toggleSection("education")}
              className="mr-3 w-4 h-4"
            />
            <span>학력 ({educations.length}개)</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedSections.projects}
              onChange={() => toggleSection("projects")}
              className="mr-3 w-4 h-4"
            />
            <span>프로젝트 ({projects.length}개)</span>
          </label>
        </div>
      </div>

      {!basicInfo.name && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">
            데이터를 입력하지 않았습니다.{" "}
            <Link href="/data/basic" className="text-blue-600 hover:underline font-medium">
              데이터 입력하러 가기
            </Link>
          </p>
        </div>
      )}

      <div className="bg-gray-50 p-8 rounded-lg">
        <ResumeContent />
      </div>
    </div>
  );
}
