# Supabase 설정 가이드

## 쿠키 저장 문제 해결

로그인 후 쿠키가 저장되지 않는 문제가 발생하면 다음을 확인하세요.

### 1. Supabase Dashboard 설정

1. https://supabase.com/dashboard 접속
2. 프로젝트 선택
3. **Authentication > URL Configuration** 메뉴로 이동

### 2. URL 설정

다음 URL들을 정확히 입력하세요:

#### Site URL (개발 환경)
```
http://localhost:3000
```

#### Redirect URLs (개발 환경)
```
http://localhost:3000/auth/callback
http://localhost:3000
```

#### Site URL (프로덕션 환경)
프로덕션 배포 시 실제 도메인으로 변경:
```
https://your-domain.com
```

#### Redirect URLs (프로덕션 환경)
```
https://your-domain.com/auth/callback
https://your-domain.com
```

### 3. GitHub OAuth 설정

1. **Authentication > Providers > GitHub** 선택
2. GitHub OAuth App 생성 (아직 안했다면):
   - https://github.com/settings/developers 접속
   - "New OAuth App" 클릭
   - **Application name**: Mad Story (또는 원하는 이름)
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `https://ijzfhtuqbvpvlrczxdts.supabase.co/auth/v1/callback`

3. GitHub OAuth App의 **Client ID**와 **Client Secret**을 Supabase에 입력
4. "Enabled" 토글을 켜기

### 4. 개발 서버 재시작

설정 변경 후 반드시 개발 서버를 재시작하세요:

```bash
npm run dev
```

### 5. 브라우저 쿠키 삭제

문제가 계속되면:
1. F12 (개발자 도구) 열기
2. Application 탭 > Cookies
3. localhost의 모든 쿠키 삭제
4. 페이지 새로고침 후 다시 로그인

### 6. 쿠키 확인

로그인 성공 후 다음 쿠키들이 있어야 합니다:
- `sb-ijzfhtuqbvpvlrczxdts-auth-token`
- `sb-ijzfhtuqbvpvlrczxdts-auth-token.0`
- `sb-ijzfhtuqbvpvlrczxdts-auth-token.1`

## 문제 해결

### 증상 1: 로그인 후 계속 /login으로 리다이렉트
- **원인**: 쿠키가 저장되지 않음
- **해결**: 위의 "Supabase Dashboard 설정" 확인

### 증상 2: "Error exchanging code for session"
- **원인**: GitHub OAuth 설정 오류
- **해결**: GitHub OAuth App의 Callback URL 확인

### 증상 3: 데이터가 표시되지 않음
- **원인**: 데이터베이스에 데이터가 없음
- **해결**: 마이그레이션 실행
  ```bash
  npm run migrate <YOUR_USER_ID>
  ```

## 참고 링크

- [Supabase Auth 문서](https://supabase.com/docs/guides/auth)
- [Next.js와 Supabase SSR](https://supabase.com/docs/guides/auth/server-side/nextjs)
