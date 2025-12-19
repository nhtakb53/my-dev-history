# 데이터 마이그레이션 가이드

JSON 데이터를 Supabase 데이터베이스로 마이그레이션하는 방법을 안내합니다.

## 사전 준비

### 1. Supabase 스키마 생성

Supabase 대시보드의 SQL Editor에서 `supabase-schema.sql` 파일을 실행하여 테이블을 생성합니다.

```bash
# 또는 Supabase CLI를 사용하는 경우
supabase db push
```

### 2. 환경 변수 설정

`.env.local` 파일에 다음 환경 변수를 설정합니다:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
```

**SUPABASE_SERVICE_KEY 찾는 방법:**
1. Supabase 프로젝트 대시보드 접속
2. Settings > API 메뉴로 이동
3. "service_role" 키를 복사 (secret이라고 표시됨)

⚠️ **주의**: Service Role Key는 모든 보안 정책을 우회하므로 절대 공개하지 마세요!

### 3. 의존성 설치

```bash
npm install
```

## 마이그레이션 실행

### 1단계: GitHub로 로그인

먼저 애플리케이션에서 GitHub 계정으로 로그인합니다:

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`에 접속하여 GitHub로 로그인합니다.

### 2단계: User ID 확인

로그인 후, 브라우저 개발자 도구(F12)를 열고 콘솔에서 다음 명령을 실행합니다:

```javascript
// 방법 1: 콘솔에서 직접 확인
const {data} = await fetch('/api/auth/user').then(r => r.json())
console.log('User ID:', data.user.id)

// 방법 2: Supabase 클라이언트 사용
import {supabase} from './supabase'

const {data: {user}} = await supabase.auth.getUser()
console.log('User ID:', user.id)
```

또는 간단하게 애플리케이션 UI에서 프로필을 확인하면 User ID가 표시됩니다.

### 3단계: 데이터 마이그레이션 실행

터미널에서 다음 명령을 실행합니다 (USER_ID는 2단계에서 확인한 ID로 대체):

```bash
npm run migrate <YOUR_USER_ID>
```

예시:
```bash
npm run migrate 550e8400-e29b-41d4-a716-446655440000
```

### 4단계: 결과 확인

마이그레이션이 완료되면 다음과 같은 메시지가 표시됩니다:

```
🚀 데이터 마이그레이션 시작...
사용자 ID: 550e8400-e29b-41d4-a716-446655440000

📝 Basic Info 마이그레이션 중...
✅ Basic Info 마이그레이션 완료

💼 Careers 마이그레이션 중...
✅ Careers 마이그레이션 완료 (3개 항목)

🎓 Educations 마이그레이션 중...
✅ Educations 마이그레이션 완료 (4개 항목)

🚀 Projects 마이그레이션 중...
✅ Projects 마이그레이션 완료 (19개 항목)

🛠️  Skills 마이그레이션 중...
✅ Skills 마이그레이션 완료 (41개 항목)

🎉 모든 데이터 마이그레이션이 완료되었습니다!
✅ 프로세스 완료
```

## 데이터 확인

Supabase 대시보드에서 Table Editor로 이동하여 데이터가 정상적으로 삽입되었는지 확인합니다.

## 문제 해결

### 오류: "User not authenticated"

- GitHub로 로그인이 되어 있는지 확인
- User ID가 올바른지 확인

### 오류: "duplicate key value violates unique constraint"

- 이미 해당 사용자의 데이터가 존재하는 경우 발생
- Supabase 대시보드에서 기존 데이터를 삭제한 후 다시 시도

### 오류: "permission denied"

- SUPABASE_SERVICE_KEY가 올바르게 설정되었는지 확인
- Service Role Key가 아닌 Anon Key를 사용하지 않았는지 확인

## 주의사항

1. **마이그레이션은 한 번만 실행하세요**: 중복 실행 시 데이터가 중복될 수 있습니다.
2. **Service Role Key 보안**: 마이그레이션 후 `.env.local` 파일이 Git에 커밋되지 않도록 주의하세요.
3. **데이터 백업**: 중요한 데이터는 마이그레이션 전에 백업하세요.

## 다음 단계

마이그레이션이 완료되면:

1. 애플리케이션에서 데이터가 정상적으로 표시되는지 확인
2. `data/` 폴더의 JSON 파일들은 백업 용도로 보관
3. 이후부터는 Supabase 데이터베이스를 직접 사용
