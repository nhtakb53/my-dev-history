# 이력서 데이터 입력 가이드

브라우저 개발자 도구(F12)의 Console 탭에서 아래 코드를 실행하세요.

## 1. 기본사항

```javascript
localStorage.setItem("basicInfo", JSON.stringify({
  name: "남형탁",
  nameEn: "Philip",
  email: "nhtakb53@naver.com",
  phone: "010-3077-3687",
  github: "",
  blog: "",
  linkedin: "",
  introduce: "다양한 웹 서비스 개발 프로젝트에서 백엔드 개발을 맡아 안정성 있는 시스템을 구축하고 성능을 개선하는데 집중했으며, 여러 기술을 접목해 효율적인 구조를 설계하고 복잡한 문제를 해결하는 능력을 키워왔습니다.\n\n문제의 본질을 파악하려고 노력하며, 조금 돌아가더라도 올바른 해결책을 찾는 것을 중요하게 생각합니다.\n\n\"내 10분이 다른사람의 1시간을 아껴줄 수 있다면 기꺼이 투자하겠다\"라는 철학을 가지고 동료들과 지식을 공유하며, 협업을 통해 더 나은 생산성과 성과를 이끌어왔다고 생각합니다.\n\n안되는 이유를 찾기보다 어떻게 하면 해결 할 수 있을지 방법을 찾으려하고, 긍정적이고 적극적인 커뮤니케이션을 통해 동료들의 신뢰를 얻는 개발자가 되고 싶습니다.",
  profileImage: ""
}));
```

## 2. 경력

```javascript
localStorage.setItem("careers", JSON.stringify([
  {
    id: "1",
    company: "아이온커뮤니케이션즈",
    position: "ACT 사업본부 / DEV 2팀 / 백엔드 개발자",
    startDate: "2015-03",
    endDate: "2024-05",
    current: false,
    description: "20명 전후의 인력으로 구성된 프로젝트 수행 조직인 ACT 사업본부에서 백엔드 개발자로 업무 수행",
    achievements: [
      "CMS(웹 컨텐츠 관리 시스템), DAMS(웹 자산 관리 시스템) 제품 설계 및 개발 경험, 다양한 기술 스택 사용과 DevOps 경험 보유",
      "삼성카드, 아모레퍼시픽, 삼성 SDS 등 고객사의 기존 레거시 시스템을 분석하여 CMS 시스템으로 통합 구축하는 프로젝트에 참여하고 안정적으로 수행하여 매출에 기여함",
      "운영 및 유지보수 업무를 안정화 하여 팀의 업무 분배 및 집중도를 높이는데 기여함",
      "CI/CD 도구, 협업 도구를 사용하여 커뮤니케이션 하고 새로운 방식의 기술과 아이디어 도입을 위해 적극 전파하였으며, 새로운 시도를 적극 어필하여 팀내 개발 문화 개선을 위해 노력함"
    ]
  },
  {
    id: "2",
    company: "대국지아이에스",
    position: "개발팀 / 웹 개발자",
    startDate: "2014-01",
    endDate: "2015-02",
    current: false,
    description: "5명으로 구성된 개발팀에서 웹 개발 업무를 수행하였고, SI 개발 프로젝트 및 유지보수 업무에 참여함",
    achievements: [
      "실제 업무를 몸으로 습득하는 기간이었으며, 개발언어에 대한 지식과 개발 툴에 대한 사용력을 높이려 노력함",
      "시스템 업데이트 및 패치를 위해 폐쇄망 전산실에서 작업을 진행하거나, 실제 고객사에 방문하여 사용자의 개선사항이나 의견을 청취하는 등 실무를 경험"
    ]
  }
]));
```

## 3. 보유기술

```javascript
localStorage.setItem("skills", JSON.stringify([
  // Backend
  { id: "1", category: "Back-end", name: "Java", level: 3 },
  { id: "2", category: "Back-end", name: "Spring Framework", level: 3 },
  { id: "3", category: "Back-end", name: "Spring Boot", level: 3 },
  { id: "4", category: "Back-end", name: "Apache Struts", level: 3 },
  { id: "5", category: "Back-end", name: "JSP", level: 3 },
  { id: "6", category: "Back-end", name: "Node.js", level: 3 },
  { id: "7", category: "Back-end", name: "Python", level: 2 },

  // Database
  { id: "8", category: "Database", name: "MySQL", level: 3 },
  { id: "9", category: "Database", name: "Oracle", level: 3 },
  { id: "10", category: "Database", name: "PostgreSQL", level: 3 },
  { id: "11", category: "Database", name: "MongoDB", level: 2 },
  { id: "12", category: "Database", name: "ElasticSearch", level: 2 },
  { id: "13", category: "Database", name: "Redis", level: 1 },
  { id: "14", category: "Database", name: "Infinispan", level: 1 },

  // Frontend
  { id: "15", category: "Front-end", name: "JavaScript", level: 3 },
  { id: "16", category: "Front-end", name: "TypeScript", level: 3 },
  { id: "17", category: "Front-end", name: "Vue.js", level: 3 },
  { id: "18", category: "Front-end", name: "Nuxt.js", level: 3 },
  { id: "19", category: "Front-end", name: "React.js", level: 1 },

  // Server
  { id: "20", category: "Server", name: "Linux", level: 3 },
  { id: "21", category: "Server", name: "Unix", level: 2 },
  { id: "22", category: "Server", name: "ShellScript", level: 3 },
  { id: "23", category: "Server", name: "Apache", level: 3 },
  { id: "24", category: "Server", name: "Nginx", level: 3 },
  { id: "25", category: "Server", name: "Tomcat", level: 3 },
  { id: "26", category: "Server", name: "Jetty", level: 3 },
  { id: "27", category: "Server", name: "Docker", level: 3 },
  { id: "28", category: "Server", name: "Kubernetes", level: 1 },

  // DevOps
  { id: "29", category: "DevOps", name: "Git", level: 3 },
  { id: "30", category: "DevOps", name: "Subversion", level: 3 },
  { id: "31", category: "DevOps", name: "Jenkins", level: 3 },
  { id: "32", category: "DevOps", name: "GitLab CI/CD", level: 3 },
  { id: "33", category: "DevOps", name: "GitHub Actions", level: 2 },
  { id: "34", category: "DevOps", name: "Gradle", level: 3 },
  { id: "35", category: "DevOps", name: "Maven", level: 2 },

  // Tools
  { id: "36", category: "Tools", name: "IntelliJ", level: 3 },
  { id: "37", category: "Tools", name: "VSCode", level: 3 },
  { id: "38", category: "Tools", name: "Vim", level: 3 },
  { id: "39", category: "Tools", name: "Redmine", level: 3 },
  { id: "40", category: "Tools", name: "Jira", level: 3 },
  { id: "41", category: "Tools", name: "Confluence", level: 3 }
]));
```

## 4. 학력

```javascript
localStorage.setItem("educations", JSON.stringify([
  {
    id: "1",
    school: "숭실대학교 대학원",
    major: "IT융합학과",
    degree: "일반대학원 석사과정 / 졸업",
    startDate: "2020-09",
    endDate: "2022-08",
    gpa: ""
  },
  {
    id: "2",
    school: "영진전문대학 학사학위과정",
    major: "컴퓨터정보공학과",
    degree: "학사학위 전공심화과정 / 졸업",
    startDate: "2014-03",
    endDate: "2015-02",
    gpa: ""
  },
  {
    id: "3",
    school: "영진전문대학",
    major: "컴퓨터정보계열(3년제)",
    degree: "전문학사 / 졸업",
    startDate: "2009-03",
    endDate: "2014-02",
    gpa: ""
  },
  {
    id: "4",
    school: "대구 경상고등학교",
    major: "이과",
    degree: "졸업",
    startDate: "2006-03",
    endDate: "2009-02",
    gpa: ""
  }
]));
```

## 5. 모든 데이터 한번에 입력

```javascript
// 1. 기본사항
localStorage.setItem("basicInfo", JSON.stringify({name:"남형탁",nameEn:"Philip",email:"nhtakb53@naver.com",phone:"010-3077-3687",github:"",blog:"",linkedin:"",introduce:"다양한 웹 서비스 개발 프로젝트에서 백엔드 개발을 맡아 안정성 있는 시스템을 구축하고 성능을 개선하는데 집중했으며, 여러 기술을 접목해 효율적인 구조를 설계하고 복잡한 문제를 해결하는 능력을 키워왔습니다.\n\n문제의 본질을 파악하려고 노력하며, 조금 돌아가더라도 올바른 해결책을 찾는 것을 중요하게 생각합니다.\n\n\"내 10분이 다른사람의 1시간을 아껴줄 수 있다면 기꺼이 투자하겠다\"라는 철학을 가지고 동료들과 지식을 공유하며, 협업을 통해 더 나은 생산성과 성과를 이끌어왔다고 생각합니다.\n\n안되는 이유를 찾기보다 어떻게 하면 해결 할 수 있을지 방법을 찾으려하고, 긍정적이고 적극적인 커뮤니케이션을 통해 동료들의 신뢰를 얻는 개발자가 되고 싶습니다.",profileImage:""}));

// 2. 경력
localStorage.setItem("careers", JSON.stringify([{id:"1",company:"아이온커뮤니케이션즈",position:"ACT 사업본부 / DEV 2팀 / 백엔드 개발자",startDate:"2015-03",endDate:"2024-05",current:false,description:"20명 전후의 인력으로 구성된 프로젝트 수행 조직인 ACT 사업본부에서 백엔드 개발자로 업무 수행",achievements:["CMS(웹 컨텐츠 관리 시스템), DAMS(웹 자산 관리 시스템) 제품 설계 및 개발 경험, 다양한 기술 스택 사용과 DevOps 경험 보유","삼성카드, 아모레퍼시픽, 삼성 SDS 등 고객사의 기존 레거시 시스템을 분석하여 CMS 시스템으로 통합 구축하는 프로젝트에 참여하고 안정적으로 수행하여 매출에 기여함","운영 및 유지보수 업무를 안정화 하여 팀의 업무 분배 및 집중도를 높이는데 기여함","CI/CD 도구, 협업 도구를 사용하여 커뮤니케이션 하고 새로운 방식의 기술과 아이디어 도입을 위해 적극 전파하였으며, 새로운 시도를 적극 어필하여 팀내 개발 문화 개선을 위해 노력함"]},{id:"2",company:"대국지아이에스",position:"개발팀 / 웹 개발자",startDate:"2014-01",endDate:"2015-02",current:false,description:"5명으로 구성된 개발팀에서 웹 개발 업무를 수행하였고, SI 개발 프로젝트 및 유지보수 업무에 참여함",achievements:["실제 업무를 몸으로 습득하는 기간이었으며, 개발언어에 대한 지식과 개발 툴에 대한 사용력을 높이려 노력함","시스템 업데이트 및 패치를 위해 폐쇄망 전산실에서 작업을 진행하거나, 실제 고객사에 방문하여 사용자의 개선사항이나 의견을 청취하는 등 실무를 경험"]}]));

// 3. 보유기술
localStorage.setItem("skills", JSON.stringify([{id:"1",category:"Back-end",name:"Java",level:3},{id:"2",category:"Back-end",name:"Spring Framework",level:3},{id:"3",category:"Back-end",name:"Spring Boot",level:3},{id:"4",category:"Back-end",name:"Apache Struts",level:3},{id:"5",category:"Back-end",name:"JSP",level:3},{id:"6",category:"Back-end",name:"Node.js",level:3},{id:"7",category:"Back-end",name:"Python",level:2},{id:"8",category:"Database",name:"MySQL",level:3},{id:"9",category:"Database",name:"Oracle",level:3},{id:"10",category:"Database",name:"PostgreSQL",level:3},{id:"11",category:"Database",name:"MongoDB",level:2},{id:"12",category:"Database",name:"ElasticSearch",level:2},{id:"13",category:"Database",name:"Redis",level:1},{id:"14",category:"Database",name:"Infinispan",level:1},{id:"15",category:"Front-end",name:"JavaScript",level:3},{id:"16",category:"Front-end",name:"TypeScript",level:3},{id:"17",category:"Front-end",name:"Vue.js",level:3},{id:"18",category:"Front-end",name:"Nuxt.js",level:3},{id:"19",category:"Front-end",name:"React.js",level:1},{id:"20",category:"Server",name:"Linux",level:3},{id:"21",category:"Server",name:"Unix",level:2},{id:"22",category:"Server",name:"ShellScript",level:3},{id:"23",category:"Server",name:"Apache",level:3},{id:"24",category:"Server",name:"Nginx",level:3},{id:"25",category:"Server",name:"Tomcat",level:3},{id:"26",category:"Server",name:"Jetty",level:3},{id:"27",category:"Server",name:"Docker",level:3},{id:"28",category:"Server",name:"Kubernetes",level:1},{id:"29",category:"DevOps",name:"Git",level:3},{id:"30",category:"DevOps",name:"Subversion",level:3},{id:"31",category:"DevOps",name:"Jenkins",level:3},{id:"32",category:"DevOps",name:"GitLab CI/CD",level:3},{id:"33",category:"DevOps",name:"GitHub Actions",level:2},{id:"34",category:"DevOps",name:"Gradle",level:3},{id:"35",category:"DevOps",name:"Maven",level:2},{id:"36",category:"Tools",name:"IntelliJ",level:3},{id:"37",category:"Tools",name:"VSCode",level:3},{id:"38",category:"Tools",name:"Vim",level:3},{id:"39",category:"Tools",name:"Redmine",level:3},{id:"40",category:"Tools",name:"Jira",level:3},{id:"41",category:"Tools",name:"Confluence",level:3}]));

// 4. 학력
localStorage.setItem("educations", JSON.stringify([{id:"1",school:"숭실대학교 대학원",major:"IT융합학과",degree:"일반대학원 석사과정 / 졸업",startDate:"2020-09",endDate:"2022-08",gpa:""},{id:"2",school:"영진전문대학 학사학위과정",major:"컴퓨터정보공학과",degree:"학사학위 전공심화과정 / 졸업",startDate:"2014-03",endDate:"2015-02",gpa:""},{id:"3",school:"영진전문대학",major:"컴퓨터정보계열(3년제)",degree:"전문학사 / 졸업",startDate:"2009-03",endDate:"2014-02",gpa:""},{id:"4",school:"대구 경상고등학교",major:"이과",degree:"졸업",startDate:"2006-03",endDate:"2009-02",gpa:""}]));

// 완료 메시지
console.log('✅ 데이터가 성공적으로 입력되었습니다! 페이지를 새로고침하세요.');
```

## 사용 방법

1. `npm run dev`로 개발 서버 실행
2. 브라우저에서 http://localhost:3000 접속
3. F12를 눌러 개발자 도구 열기
4. Console 탭 선택
5. 위의 "모든 데이터 한번에 입력" 코드 복사 & 붙여넣기
6. 엔터 키 실행
7. 페이지 새로고침 (F5)

프로젝트 데이터는 별도로 입력해야 합니다.
