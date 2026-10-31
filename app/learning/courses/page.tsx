'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Clock, Award, Play, Lock, CheckCircle2, TrendingUp, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/components/language-provider'

interface Course {
  id: number
  key:
    | 'businessFundamentals'
    | 'digitalMarketing'
    | 'financialManagement'
    | 'ecommerce'
  lessons: number
  progress: number
  enrolled: number
  locked: boolean
}

const COURSES: Course[] = [
  {
    id: 1,
    key: 'businessFundamentals',
    lessons: 12,
    progress: 75,
    enrolled: 1234,
    locked: false
  },
  {
    id: 2,
    key: 'digitalMarketing',
    lessons: 18,
    progress: 30,
    enrolled: 892,
    locked: false
  },
  {
    id: 3,
    key: 'financialManagement',
    lessons: 15,
    progress: 0,
    enrolled: 756,
    locked: false
  },
  {
    id: 4,
    key: 'ecommerce',
    lessons: 20,
    progress: 0,
    enrolled: 543,
    locked: true
  },
]

export default function CoursesPage() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState('all')

  const filteredCourses = COURSES.filter(course => 
    filter === 'all' ? true : 
    filter === 'enrolled' ? course.progress > 0 : 
    filter === 'completed' ? course.progress === 100 : true
  )

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-main/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-chart-2/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-main/10 via-chart-2/10 to-chart-3/10 border border-main/20 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-48 h-48 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80"
              alt="Learning"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-main" />
              {t.learningCourses.title}
            </h1>
            <p className="text-foreground/70 mt-2">
              {t.learningCourses.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="neutral" className="text-sm">
              <Award className="w-4 h-4 mr-1" />
              {t.learningCourses.points(850)}
            </Badge>
            <Badge variant="neutral" className="text-sm">
              {t.learningCourses.level(5)}
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: BookOpen, value: '12', label: t.learningCourses.stats.courses, color: 'main' },
            { icon: CheckCircle2, value: '3', label: t.learningCourses.stats.completed, color: 'chart-2' },
            { icon: Clock, value: '24h', label: t.learningCourses.stats.learningTime, color: 'chart-3' },
            { icon: Award, value: '8', label: t.learningCourses.stats.certificates, color: 'chart-4' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-4 hover:shadow-lg transition-all bg-gradient-to-br from-background to-secondary-background">
                <div className="flex items-center gap-3">
                  <div className={`p-2 bg-${stat.color}/10 rounded-lg`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-foreground/70">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <Tabs value={filter} onValueChange={setFilter} className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-3">
            <TabsTrigger value="all">{t.learningCourses.filters.all}</TabsTrigger>
            <TabsTrigger value="enrolled">
              {t.learningCourses.filters.inProgress}
            </TabsTrigger>
            <TabsTrigger value="completed">
              {t.learningCourses.filters.completed}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredCourses.map((course, idx) => {
            const copy = t.learningCourses.items[course.key]

            return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-6 hover:border-main transition-all hover:shadow-xl hover:shadow-main/20 relative overflow-hidden bg-gradient-to-br from-background to-secondary-background group">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-main/5 rounded-bl-full transition-all group-hover:w-32 group-hover:h-32" />
                {course.locked && (
                  <div className="absolute top-4 right-4">
                    <Lock className="w-5 h-5 text-foreground/50" />
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold">{copy.title}</h3>
                      <Badge variant="neutral">{copy.level}</Badge>
                    </div>
                    <p className="text-sm text-foreground/70">
                      {copy.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-foreground/70">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {copy.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {t.learningCourses.lessons(course.lessons)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.enrolled}
                    </div>
                  </div>

                  {course.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/70">
                          {t.learningCourses.progress}
                        </span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  <Button 
                    className="w-full" 
                    disabled={course.locked}
                    variant={course.progress > 0 ? 'default' : 'neutral'}
                  >
                    {course.locked ? (
                      <>
                        <Lock className="w-4 h-4 mr-2" />{" "}
                        {t.learningCourses.unlockAtLevel(10)}
                      </>
                    ) : course.progress > 0 ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />{" "}
                        {t.learningCourses.continueLearning}
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />{" "}
                        {t.learningCourses.startCourse}
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}