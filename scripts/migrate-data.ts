import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

// .env.local 파일 로드
dotenv.config({ path: '.env.local' })

// Supabase 클라이언트 설정
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ 환경 변수가 설정되지 않았습니다.')
  console.error('다음 환경 변수를 .env.local 파일에 설정해주세요:')
  console.error('  - NEXT_PUBLIC_SUPABASE_URL')
  console.error('  - SUPABASE_SERVICE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// JSON 파일 읽기
function readJsonFile<T>(filename: string): T {
  const filePath = path.join(process.cwd(), 'data', filename)
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(fileContent)
}

// camelCase를 snake_case로 변환
function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

// 객체의 키를 camelCase에서 snake_case로 변환
function convertKeysToSnakeCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToSnakeCase(item))
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const snakeKey = toSnakeCase(key)
      acc[snakeKey] = convertKeysToSnakeCase(obj[key])
      return acc
    }, {} as any)
  }
  return obj
}

async function migrateData(userId: string) {
  try {
    console.log('🚀 데이터 마이그레이션 시작...')
    console.log(`사용자 ID: ${userId}`)

    // 1. Basic Info 마이그레이션
    console.log('\n📝 Basic Info 마이그레이션 중...')
    const basicInfo = readJsonFile<any>('basic-info.json')
    const basicInfoData = convertKeysToSnakeCase(basicInfo)

    const { data: basicInfoResult, error: basicInfoError } = await supabase
      .from('basic_info')
      .upsert({
        ...basicInfoData,
        user_id: userId
      })
      .select()

    if (basicInfoError) {
      console.error('❌ Basic Info 마이그레이션 실패:', basicInfoError)
    } else {
      console.log('✅ Basic Info 마이그레이션 완료')
    }

    // 2. Careers 마이그레이션
    console.log('\n💼 Careers 마이그레이션 중...')
    const careers = readJsonFile<any[]>('careers.json')
    const careersData = careers.map(career => {
      const converted = convertKeysToSnakeCase(career)
      // JSON의 id 필드를 제거하고 user_id 추가
      const { id, ...rest } = converted
      return {
        ...rest,
        user_id: userId
      }
    })

    const { data: careersResult, error: careersError } = await supabase
      .from('careers')
      .insert(careersData)
      .select()

    if (careersError) {
      console.error('❌ Careers 마이그레이션 실패:', careersError)
    } else {
      console.log(`✅ Careers 마이그레이션 완료 (${careersResult.length}개 항목)`)
    }

    // 3. Educations 마이그레이션
    console.log('\n🎓 Educations 마이그레이션 중...')
    const educations = readJsonFile<any[]>('educations.json')
    const educationsData = educations.map(education => {
      const converted = convertKeysToSnakeCase(education)
      const { id, ...rest } = converted
      return {
        ...rest,
        user_id: userId
      }
    })

    const { data: educationsResult, error: educationsError } = await supabase
      .from('educations')
      .insert(educationsData)
      .select()

    if (educationsError) {
      console.error('❌ Educations 마이그레이션 실패:', educationsError)
    } else {
      console.log(`✅ Educations 마이그레이션 완료 (${educationsResult.length}개 항목)`)
    }

    // 4. Projects 마이그레이션
    console.log('\n🚀 Projects 마이그레이션 중...')
    const projects = readJsonFile<any[]>('projects.json')
    const projectsData = projects.map(project => {
      const converted = convertKeysToSnakeCase(project)
      const { id, ...rest } = converted
      return {
        ...rest,
        user_id: userId
      }
    })

    const { data: projectsResult, error: projectsError } = await supabase
      .from('projects')
      .insert(projectsData)
      .select()

    if (projectsError) {
      console.error('❌ Projects 마이그레이션 실패:', projectsError)
    } else {
      console.log(`✅ Projects 마이그레이션 완료 (${projectsResult.length}개 항목)`)
    }

    // 5. Skills 마이그레이션
    console.log('\n🛠️  Skills 마이그레이션 중...')
    const skills = readJsonFile<any[]>('skills.json')
    const skillsData = skills.map(skill => {
      const converted = convertKeysToSnakeCase(skill)
      const { id, ...rest } = converted
      return {
        ...rest,
        user_id: userId
      }
    })

    const { data: skillsResult, error: skillsError } = await supabase
      .from('skills')
      .insert(skillsData)
      .select()

    if (skillsError) {
      console.error('❌ Skills 마이그레이션 실패:', skillsError)
    } else {
      console.log(`✅ Skills 마이그레이션 완료 (${skillsResult.length}개 항목)`)
    }

    console.log('\n🎉 모든 데이터 마이그레이션이 완료되었습니다!')

  } catch (error) {
    console.error('❌ 마이그레이션 중 오류 발생:', error)
    throw error
  }
}

// 실행
const userId = process.argv[2]

if (!userId) {
  console.error('❌ 사용자 ID를 입력해주세요.')
  console.log('사용법: npm run migrate <USER_ID>')
  console.log('\n사용자 ID를 확인하는 방법:')
  console.log('1. GitHub로 로그인')
  console.log('2. 브라우저 개발자 도구 콘솔에서 다음 명령 실행:')
  console.log('   supabase.auth.getUser().then(({ data }) => console.log(data.user.id))')
  process.exit(1)
}

migrateData(userId)
  .then(() => {
    console.log('✅ 프로세스 완료')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ 프로세스 실패:', error)
    process.exit(1)
  })
