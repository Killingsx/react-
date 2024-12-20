'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { Github } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useCallback } from 'react'

const Particle = ({ x, y }: { x: number; y: number }) => (
  <motion.div
    className="absolute rounded-full bg-blue-200 w-2 h-2"
    style={{ x, y }}
    animate={{
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  />
)

export default function Home() {
  const { scrollYProgress } = useScroll()
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const [isExpanded, setIsExpanded] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const particles = useMemo(() => Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  })), [])

  return (
    <div className="min-h-screen bg-blue-600 text-white">
      <motion.header
        className={`fixed left-0 right-0 z-50 flex items-center justify-between p-4 transition-all duration-300 ${
          isScrolled ? 'bg-white text-blue-600 rounded-full mx-4 shadow-lg' : 'bg-transparent text-white'
        }`}
        animate={{
          top: isScrolled ? 20 : 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        <div className="text-2xl font-bold">CHY.OL</div>
        <nav className="flex space-x-4">
          <a href="#" className="hover:underline">产品</a>
          <a href="#" className="hover:underline">价格</a>
          <a href="#" className="hover:underline">文档</a>
          <a href="#" className="hover:underline">博客</a>
        </nav>
        <div className="flex items-center space-x-4">
          <a href="#" className="flex items-center space-x-2">
            <Github />
            <span>54.7k</span>
          </a>
          <Button variant={isScrolled ? "default" : "secondary"}>开始使用</Button>
        </div>
      </motion.header>

      <motion.section
        className="relative min-h-screen flex flex-col items-center justify-center text-center p-8 overflow-hidden"
        style={{ opacity: backgroundOpacity }}
      >
        {particles.map((particle) => (
          <Particle key={particle.id} x={particle.x} y={particle.y} />
        ))}
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">生成式 AI 应用创新引擎</h1>
          <p className="text-xl mb-8 max-w-2xl">
            开源的 LLM 应用开发平台。提供从 Agent 构建到 AI workflow 编排、RAG 检索、模型管理等能力，轻松构建和运营生成式 AI 原生应用。
          </p>
          <div className="flex space-x-4">
            <Button variant="secondary" size="lg">开始使用</Button>
            <Button variant="outline" size="lg">
              <Github className="mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="min-h-screen bg-blue-100 text-blue-900 p-8"
        style={{ opacity: contentOpacity }}
      >
        <div className="max-w-6xl mx-auto bg-white/70 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
          <div className="p-8 bg-white/50">
            <h2 className="text-3xl font-bold mb-8 text-blue-600">开放灵活的生成式 AI 应用开发框架</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-700">{feature.title}</h3>
                  <p className="text-blue-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

const features = [
  {
    icon: '🎭',
    title: 'Dify Orchestration Studio',
    description: '可视化编排生成式 AI 应用的专业工作站'
  },
  {
    icon: '🌐',
    title: 'RAG Pipeline',
    description: '安全构建私有数据与大型语言模型之间的数据通道'
  },
  {
    icon: '📝',
    title: 'Prompt IDE',
    description: '为提示词工程师精心设计，友好易用的提示词开发工具'
  },
  {
    icon: '🏢',
    title: 'Enterprise LLMOps',
    description: '开发者可以观测推理过程、记录日志、标注数据、训练并管理模型；使应用效果能测量、持续优化。'
  },
  {
    icon: '☁️',
    title: 'BaaS Solution',
    description: '基于后端及服务理念的 API 设计，大幅简化生成式 AI 应用研发流程'
  },
  {
    icon: '🤖',
    title: 'LLM Agent',
    description: '定制化 Agent，自主调用系列工具完成复杂任务。'
  }
]

