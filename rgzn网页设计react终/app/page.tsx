'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import axios from 'axios'

const Particle = ({ x, y }: { x: number; y: number }) => (
  <motion.div
    className="absolute rounded-full bg-blue-200 w-2 h-2"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  />
)

const testServerConnection = async () => {
  try {
    await axios.get('http://8.210.102.154:26004/health');
    return true;
  } catch (error) {
    console.error('无法连接到服务器', error);
    return false;
  }
};

const uploadFile = async (file: File) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'text/markdown'];
  if (!allowedTypes.includes(file.type)) {
    alert('只允许上传 PDF、图像文件和 Markdown 文件');
    return;
  }

  const isServerConnected = await testServerConnection();
  if (!isServerConnected) {
    alert('无法连接到服务器，请稍后再试');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    await axios.post('http://8.210.102.154:26004/upload', formData, { // 添加 /upload 以指定上传文件的端点
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      auth: {
        username: 'JavaQA',
        password: 's4scLRf57pJDbHRs',
      },
    });
    alert('文件上传成功');
  } catch (error) {
    console.error('文件上传失败', error);
    alert('文件上传失败');
  }
};

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    uploadFile(file);
  }
};

export default function Home() {
  const { scrollYProgress } = useScroll()
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const [isExpanded, setIsExpanded] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setParticles(Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    })));
  }, []);

  const scrollToChat = () => {
    const chatSection = document.getElementById('chat-section');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          <a href="#" className="hover:underline">基于本地知识库部署的在线大模型问答网站开发</a>
        </nav>
        <div className="flex items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            whileHover={{ scale: 1.2 }}
          >
            <Image
              src="/3.jpg"
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </motion.div>
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
          <h1 className="text-5xl font-bold mb-4">您好，我是您的JAVA智能助手 小李OvO</h1>
          <p className="text-xl mb-8 max-w-2xl">
            我能帮你解决有关JAVA的问题，并给出示例代码。
          </p>
          <div className="flex space-x-4">
            <Button variant="secondary" size="lg" onClick={scrollToChat}>开始使用</Button>
            <Button variant="outline" size="lg" onClick={() => window.open('https://github.com/Killingsx', '_blank')}>
              GitHub
            </Button>
            <Button variant="outline" size="lg">
              <label htmlFor="file-upload" className="cursor-pointer">
                上传文件
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </Button>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="chat-section"
        className="min-h-screen bg-blue-100 text-blue-900 p-8"
        style={{ opacity: contentOpacity }}
      >
        <div className="max-w-7xl mx-auto bg-white/70 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
          <div className="p-8 bg-white/50">
            <h2 className="text-3xl font-bold mb-8 text-blue-600">对话窗口</h2>
            <div className="w-full h-[600px]">
              <iframe
                src="http://1.94.65.23:8080/ui/chat/b0c99a3fea5fbd58"
                className="w-full h-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                frameBorder="0"
                allow="microphone"
              />
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

