import { supabase } from './supabase'
import { getCurrentUser } from './auth'

// Basic Info API
export async function getBasicInfo(userId?: string) {
  let query = supabase.from('basic_info').select('*')

  if (userId) {
    query = query.eq('user_id', userId)
  }

  const { data, error } = await query.single()

  if (error) throw error
  return data
}

export async function updateBasicInfo(info: any) {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('basic_info')
    .upsert({ ...info, user_id: user.id })
    .select()
    .single()

  if (error) throw error
  return data
}

// Careers API
export async function getCareers(userId?: string) {
  let query = supabase.from('careers').select('*')

  if (userId) {
    query = query.eq('user_id', userId)
  }

  const { data, error } = await query.order('start_date', { ascending: false })

  if (error) throw error
  return data
}

export async function createCareer(career: any) {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('careers')
    .insert({ ...career, user_id: user.id })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateCareer(id: string, career: any) {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('careers')
    .update(career)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteCareer(id: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const { error } = await supabase
    .from('careers')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw error
}

// Educations API
export async function getEducations(userId?: string) {
  let query = supabase.from('educations').select('*')

  if (userId) {
    query = query.eq('user_id', userId)
  }

  const { data, error } = await query.order('start_date', { ascending: false })

  if (error) throw error
  return data
}

export async function createEducation(education: any) {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('educations')
    .insert({ ...education, user_id: user.id })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateEducation(id: string, education: any) {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('educations')
    .update(education)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteEducation(id: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const { error } = await supabase
    .from('educations')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw error
}

// Projects API
export async function getProjects(userId?: string) {
  let query = supabase.from('projects').select('*')

  if (userId) {
    query = query.eq('user_id', userId)
  }

  const { data, error } = await query.order('start_date', { ascending: false })

  if (error) throw error
  return data
}

export async function createProject(project: any) {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('projects')
    .insert({ ...project, user_id: user.id })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateProject(id: string, project: any) {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteProject(id: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw error
}

// Skills API
export async function getSkills(userId?: string) {
  let query = supabase.from('skills').select('*')

  if (userId) {
    query = query.eq('user_id', userId)
  }

  const { data, error } = await query.order('category', { ascending: true })

  if (error) throw error
  return data
}

export async function createSkill(skill: any) {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('skills')
    .insert({ ...skill, user_id: user.id })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateSkill(id: string, skill: any) {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('skills')
    .update(skill)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteSkill(id: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw error
}
