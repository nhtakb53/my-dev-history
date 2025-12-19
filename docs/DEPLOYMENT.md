# Vercel 배포 가이드

## 1. Vercel CLI로 배포하기

### 로그인
```bash
vercel login
```

### 프로젝트 배포
```bash
# 개발 환경 배포 (테스트용)
vercel

# 프로덕션 배포
vercel --prod
```

## 2. Vercel Dashboard로 배포하기 (추천)

### 2.1 GitHub와 연동
1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. "Add New Project" 클릭
3. "Import Git Repository" 선택
4. GitHub 연동 후 `mad-story` 저장소 선택

### 2.2 환경 변수 설정
Vercel Dashboard → Project Settings → Environment Variables에서 설정:

```
NEXT_PUBLIC_SUPABASE_URL=https://ijzfhtuqbvpvlrczxdts.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqemZodHVxYnZwdmxyY3p4ZHRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNDM0OTAsImV4cCI6MjA4MTYxOTQ5MH0.hAmKZLZoP7DuAhe9E8Ap-5Hs1lZQi4L6ia0CvoF-8fY
```

### 2.3 배포
- "Deploy" 클릭하면 자동으로 빌드 및 배포가 진행됩니다
- GitHub에 push하면 자동으로 재배포됩니다

## 3. Supabase GitHub OAuth 콜백 URL 업데이트

배포 후 Vercel에서 받은 도메인으로 Supabase 설정을 업데이트해야 합니다:

1. Supabase Dashboard → Authentication → URL Configuration
2. **Site URL**: `https://your-project.vercel.app`
3. **Redirect URLs**에 추가:
   - `https://your-project.vercel.app/auth/callback`
   - `http://localhost:3000/auth/callback` (로컬 개발용)

4. Supabase Dashboard → Authentication → Providers → GitHub
5. **Authorization callback URL**:
   - `https://ijzfhtuqbvpvlrczxdts.supabase.co/auth/v1/callback`

## 4. 배포 확인

배포 완료 후:
- Vercel Dashboard에서 제공하는 URL 접속
- GitHub 로그인 테스트
- 데이터 CRUD 기능 테스트

## 5. 커스텀 도메인 설정 (선택)

Vercel Dashboard → Project Settings → Domains에서 커스텀 도메인 추가 가능

## 주의사항

- `.env.local` 파일은 Git에 커밋되지 않으므로 Vercel에서 환경 변수를 직접 설정해야 합니다
- 환경 변수 변경 시 프로젝트를 다시 배포해야 적용됩니다
- GitHub Actions나 자동 배포가 활성화되어 있으면 main 브랜치에 push할 때마다 자동으로 배포됩니다
