'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Mic, MicOff, Send, Volume2, Sparkles, MessageSquare, BookOpen, TrendingUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { EmotionalCanvas } from '@/components/emotional-canvas'
import Image from 'next/image'
import { useLanguage } from '@/components/language-provider'
import { LanguageToggle } from '@/components/language-toggle'
import { LOCALES } from '@/lib/translations'

const QUICK_TOPICS = [
  { icon: TrendingUp, key: 'businessIdeas' },
  { icon: BookOpen, key: 'marketingTips' },
  { icon: MessageSquare, key: 'customerService' },
  { icon: Sparkles, key: 'pricingStrategy' },
] as const

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AiMentorPage() {
  const { language, t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: t.aiMentor.greeting,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentEmotion, setCurrentEmotion] = useState('calm')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    setMessages((prev) =>
      prev.length === 1 && prev[0].role === 'assistant'
        ? [{ ...prev[0], content: t.aiMentor.greeting }]
        : prev
    )
  }, [language, t])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const messageId = crypto.randomUUID()
    const userMessage: Message = {
      id: messageId,
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const userInput = input
    setInput('')
    setIsLoading(true)

    // Detect emotion from input
    const lowerInput = userInput.toLowerCase()
    const happyWords = ['happy', 'excited', 'great', 'खुश', 'उत्साहित', 'बढ़िया']
    const focusedWords = ['help', 'problem', 'difficult', 'मदद', 'समस्या', 'मुश्किल']
    const calmWords = ['thank', 'good', 'धन्यवाद', 'अच्छा', 'शुक्रिया']

    if (happyWords.some((word) => lowerInput.includes(word))) {
      setCurrentEmotion('happy')
    } else if (focusedWords.some((word) => lowerInput.includes(word))) {
      setCurrentEmotion('focused')
    } else if (calmWords.some((word) => lowerInput.includes(word))) {
      setCurrentEmotion('calm')
    } else {
      setCurrentEmotion('focused')
    }

    try {
      const response = await fetch('/api/mentor-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          history: messages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
          message: userInput,
          language,
        }),
      })

      const data = (await response.json()) as { success: boolean; reply?: string; error?: string }

      if (!response.ok || !data.reply) {
        throw new Error(data.error || 'Unable to get mentor response')
      }

      const aiResponse: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      const aiResponse: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content:
          error instanceof Error
            ? t.aiMentor.errorWithMessage(error.message)
            : t.aiMentor.error,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false)
        setInput(t.aiMentor.simulatedVoiceInput)
      }, 2000)
    }
  }

  const handleQuickTopic = (query: string) => {
    setInput(query)
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-main/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-chart-2/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-chart-3/5 rounded-full blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-main/10 via-chart-2/10 to-chart-3/10 border border-main/20 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-48 h-48 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&q=80"
              alt="AI Mentor"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-main" />
              {t.aiMentor.title}
            </h1>
            <p className="text-foreground/70 mt-2">{t.aiMentor.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Badge variant="neutral" className="text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              {t.aiMentor.online}
            </Badge>
          </div>
        </div>

        {/* Quick Topics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {QUICK_TOPICS.map((topic, idx) => (
            <motion.div
              key={topic.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className="p-4 cursor-pointer hover:border-main transition-all hover:shadow-lg hover:shadow-main/20 bg-gradient-to-br from-background to-secondary-background"
                onClick={() =>
                  handleQuickTopic(t.aiMentor.quickQueries[topic.key])
                }
              >
                <div className="p-2 bg-main/10 rounded-lg w-fit mb-2">
                  <topic.icon className="w-6 h-6 text-main" />
                </div>
                <p className="text-sm font-medium">
                  {t.aiMentor.quickTopics[topic.key]}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Chat Interface with Emotional Background */}
        <Card className="h-[500px] flex flex-col relative overflow-hidden shadow-xl">
          {/* Emotional Canvas Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <EmotionalCanvas emotion={currentEmotion} />
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-main/5 via-transparent to-chart-2/5 pointer-events-none" />
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-main text-main-foreground'
                        : 'bg-secondary-background border border-border'
                    }`}
                  >
                    <p className="text-sm md:text-base">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString(LOCALES[language], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-secondary-background border border-border rounded-lg p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-main rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-main rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-main rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4 relative z-10 bg-background/80 backdrop-blur-sm">
            <div className="flex gap-2">
              <Button
                variant={isRecording ? 'default' : 'neutral'}
                size="icon"
                onClick={handleVoiceToggle}
                className={isRecording ? 'animate-pulse' : ''}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t.aiMentor.placeholder}
                className="flex-1"
                disabled={isRecording}
              />
              <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
                <Send className="w-5 h-5" />
              </Button>
            </div>
            {isRecording && (
              <p className="text-sm text-main mt-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-main rounded-full animate-pulse" />
                {t.aiMentor.listening}
              </p>
            )}
          </div>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4">
            <Volume2 className="w-8 h-8 text-main mb-2" />
            <h3 className="font-semibold mb-1">{t.aiMentor.voiceSupport}</h3>
            <p className="text-sm text-foreground/70">
              {t.aiMentor.voiceSupportDesc}
            </p>
          </Card>
          <Card className="p-4">
            <MessageSquare className="w-8 h-8 text-main mb-2" />
            <h3 className="font-semibold mb-1">{t.aiMentor.available}</h3>
            <p className="text-sm text-foreground/70">
              {t.aiMentor.availableDesc}
            </p>
          </Card>
          <Card className="p-4">
            <Sparkles className="w-8 h-8 text-main mb-2" />
            <h3 className="font-semibold mb-1">
              {t.aiMentor.personalized}
            </h3>
            <p className="text-sm text-foreground/70">
              {t.aiMentor.personalizedDesc}
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}