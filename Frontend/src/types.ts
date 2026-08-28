export type Skill = {
  name: string
  category: string
  description: string
  importance?: string
}

export type Job = { name: string; description: string }

export type Analysis = {
  job: string
  currentSkills: string[]
  missingSkills: Skill[]
  learningPaths: { targetSkill: string; learningPath: string[] }[]
}

export type SkillDetail = Skill & {
  prerequisites: string[]
  relatedSkills: string[]
  projects: { name: string; description: string }[]
}

export type Page = 'home' | 'results' | 'explore' | 'detail'
