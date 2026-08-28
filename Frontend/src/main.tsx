import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { api } from './api'
import { Header } from './components/Header'
import './index.css'
import { ExplorePage } from './pages/ExplorePage'
import { HomePage } from './pages/HomePage'
import { ResultsPage } from './pages/ResultsPage'
import { SkillDetailPage } from './pages/SkillDetailPage'
import type { Analysis, Job, Page, Skill } from './types'

function App() {
  const [page, setPage] = useState<Page>('home')
  const [jobs, setJobs] = useState<Job[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [selectedSkill, setSelectedSkill] = useState('')
  const [previousPage, setPreviousPage] = useState<Page>('home')

  const loadDirectory = () => {
    setLoading(true)
    setError(false)

    Promise.all([api<{ jobs: Job[] }>('/jobs'), api<{ skills: Skill[] }>('/skills')])
      .then(([jobData, skillData]) => {
        setJobs(jobData.jobs)
        setSkills(skillData.skills)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  useEffect(loadDirectory, [])

  const openSkill = (name: string) => {
    setSelectedSkill(name)
    setPreviousPage(page)
    setPage('detail')
  }

  const analyzeSkills = async (job: string, currentSkills: string[]) => {
    try {
      const result = await api<Analysis>('/analyze', {
        method: 'POST',
        body: JSON.stringify({ job, skills: currentSkills }),
      })
      setAnalysis(result)
      setPage('results')
    } catch {
      window.alert('Unable to load your skill analysis. Please try again in a moment.')
    }
  }

  return <>
    <Header page={page} navigate={setPage} />

    {page === 'home' && <HomePage jobs={jobs} skills={skills} loading={loading} error={error} onAnalyze={analyzeSkills} />}

    {page === 'explore' && <ExplorePage skills={skills} loading={loading} error={error} openSkill={openSkill} />}

    {page === 'results' && analysis && <ResultsPage analysis={analysis} openSkill={openSkill} newAnalysis={() => setPage('home')} />}
      
    {page === 'detail' && <SkillDetailPage skillName={selectedSkill} role={analysis?.job} goBack={() => setPage(previousPage)} openSkill={openSkill} />}
  </>
}

createRoot(document.getElementById('root')!).render(<App />)
