"use client"

import { useState, useEffect } from 'react'
import { Moon, Sun, Clock, Home, Target, TrendingUp, ChevronRight, ChevronLeft, Check, Play, Pause, Volume2, VolumeX, Wind, Waves, CloudRain, Music, Sparkles, Brain, Heart, Zap, Calendar, BarChart3, Award } from 'lucide-react'

interface SleepData {
  currentBedtime: string
  currentWakeTime: string
  sleepQuality: number
  idealBedtime: string
  idealWakeTime: string
  environment: {
    temperature: string
    lighting: string
    noise: string
    comfort: string
  }
  routine: string[]
  goals: string[]
  soundTheme: string
  breathingPattern: string
  storyTheme: string
}

export default function SleepApp() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [sleepData, setSleepData] = useState<SleepData>({
    currentBedtime: '',
    currentWakeTime: '',
    sleepQuality: 5,
    idealBedtime: '',
    idealWakeTime: '',
    environment: {
      temperature: '',
      lighting: '',
      noise: '',
      comfort: ''
    },
    routine: [],
    goals: [],
    soundTheme: 'ocean',
    breathingPattern: '4-7-8',
    storyTheme: 'nature'
  })

  // Breathing animation cycle
  useEffect(() => {
    if (currentStep === 2 && isPlaying) {
      const pattern = sleepData.breathingPattern
      let inhale = 4, hold = 7, exhale = 8
      
      if (pattern === '4-4-4') {
        inhale = hold = exhale = 4
      } else if (pattern === '5-5-5') {
        inhale = hold = exhale = 5
      }

      const cycle = async () => {
        setBreathingPhase('inhale')
        await new Promise(resolve => setTimeout(resolve, inhale * 1000))
        setBreathingPhase('hold')
        await new Promise(resolve => setTimeout(resolve, hold * 1000))
        setBreathingPhase('exhale')
        await new Promise(resolve => setTimeout(resolve, exhale * 1000))
      }

      const interval = setInterval(cycle, (inhale + hold + exhale) * 1000)
      return () => clearInterval(interval)
    }
  }, [currentStep, isPlaying, sleepData.breathingPattern])

  const steps = [
    { id: 1, title: 'Análise', icon: Target, description: 'Entenda seu sono atual', color: 'from-blue-500 to-cyan-500' },
    { id: 2, title: 'Relaxamento', icon: Wind, description: 'Meditação e respiração', color: 'from-purple-500 to-pink-500' },
    { id: 3, title: 'Ambiente', icon: Volume2, description: 'Sons e atmosfera', color: 'from-green-500 to-emerald-500' },
    { id: 4, title: 'Rotina', icon: Moon, description: 'Hábitos pré-sono', color: 'from-indigo-500 to-blue-500' },
    { id: 5, title: 'Insights', icon: TrendingUp, description: 'Acompanhamento', color: 'from-orange-500 to-red-500' }
  ]

  const soundThemes = [
    { id: 'ocean', name: 'Ondas do Mar', icon: Waves, description: 'Som relaxante de ondas' },
    { id: 'rain', name: 'Chuva Suave', icon: CloudRain, description: 'Chuva tranquila' },
    { id: 'forest', name: 'Floresta', icon: Sparkles, description: 'Sons da natureza' },
    { id: 'white-noise', name: 'Ruído Branco', icon: Wind, description: 'Som contínuo relaxante' },
    { id: 'piano', name: 'Piano Suave', icon: Music, description: 'Melodias relaxantes' }
  ]

  const breathingPatterns = [
    { id: '4-7-8', name: 'Técnica 4-7-8', description: 'Inspire 4s, segure 7s, expire 8s', benefit: 'Reduz ansiedade' },
    { id: '4-4-4', name: 'Box Breathing', description: 'Inspire 4s, segure 4s, expire 4s', benefit: 'Acalma a mente' },
    { id: '5-5-5', name: 'Respiração 5-5-5', description: 'Inspire 5s, segure 5s, expire 5s', benefit: 'Equilíbrio profundo' }
  ]

  const storyThemes = [
    { id: 'nature', name: 'Caminhada na Floresta', duration: '15 min', description: 'Explore uma floresta mágica ao entardecer' },
    { id: 'beach', name: 'Praia ao Pôr do Sol', duration: '12 min', description: 'Relaxe em uma praia paradisíaca' },
    { id: 'mountain', name: 'Montanha Serena', duration: '18 min', description: 'Contemple as estrelas no alto da montanha' },
    { id: 'garden', name: 'Jardim Secreto', duration: '10 min', description: 'Descubra um jardim encantado' }
  ]

  const routineOptions = [
    { id: 'shower', name: 'Banho morno', icon: Sparkles, benefit: 'Relaxa músculos' },
    { id: 'reading', name: 'Ler um livro', icon: Brain, benefit: 'Acalma a mente' },
    { id: 'meditation', name: 'Meditar 10 min', icon: Heart, benefit: 'Reduz estresse' },
    { id: 'stretch', name: 'Alongamento leve', icon: Zap, benefit: 'Libera tensão' },
    { id: 'tea', name: 'Chá de camomila', icon: Sparkles, benefit: 'Induz sono' },
    { id: 'music', name: 'Música relaxante', icon: Music, benefit: 'Ambiente calmo' },
    { id: 'screens-off', name: 'Desligar eletrônicos', icon: Moon, benefit: 'Essencial' },
    { id: 'journal', name: 'Escrever no diário', icon: Brain, benefit: 'Organiza pensamentos' }
  ]

  const goalOptions = [
    { id: 'duration', name: 'Dormir 8 horas por noite', icon: Clock, metric: 'Duração' },
    { id: 'natural-wake', name: 'Acordar sem despertador', icon: Sun, metric: 'Qualidade' },
    { id: 'fall-asleep', name: 'Adormecer em 15 minutos', icon: Moon, metric: 'Latência' },
    { id: 'quality', name: 'Melhorar qualidade do sono', icon: Award, metric: 'Score' },
    { id: 'energy', name: 'Mais energia durante o dia', icon: Zap, metric: 'Energia' },
    { id: 'consistency', name: 'Manter horários regulares', icon: Calendar, metric: 'Consistência' }
  ]

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const toggleRoutine = (routineId: string) => {
    setSleepData(prev => ({
      ...prev,
      routine: prev.routine.includes(routineId)
        ? prev.routine.filter(r => r !== routineId)
        : [...prev.routine, routineId]
    }))
  }

  const toggleGoal = (goalId: string) => {
    setSleepData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }))
  }

  const calculateSleepDuration = () => {
    if (!sleepData.idealBedtime || !sleepData.idealWakeTime) return null
    const bedtime = new Date(`2000-01-01T${sleepData.idealBedtime}`)
    const waketime = new Date(`2000-01-02T${sleepData.idealWakeTime}`)
    const diff = waketime.getTime() - bedtime.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return { hours, minutes }
  }

  const getSleepScore = () => {
    let score = 0
    if (sleepData.sleepQuality >= 7) score += 25
    else if (sleepData.sleepQuality >= 5) score += 15
    else score += 5

    const duration = calculateSleepDuration()
    if (duration && duration.hours >= 7 && duration.hours <= 9) score += 25
    else if (duration && duration.hours >= 6) score += 15

    if (sleepData.routine.length >= 4) score += 25
    else if (sleepData.routine.length >= 2) score += 15

    if (sleepData.environment.temperature && sleepData.environment.lighting) score += 25

    return Math.min(score, 100)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Análise do Sono</h2>
              <p className="text-gray-600">Vamos entender seus padrões atuais</p>
            </div>

            <div className="grid gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl">
                <label className="block text-sm font-semibold mb-3 text-blue-900">🌙 Que horas você costuma dormir?</label>
                <input
                  type="time"
                  value={sleepData.currentBedtime}
                  onChange={(e) => setSleepData(prev => ({ ...prev, currentBedtime: e.target.value }))}
                  className="w-full p-4 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                />
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-2xl">
                <label className="block text-sm font-semibold mb-3 text-cyan-900">☀️ Que horas você acorda?</label>
                <input
                  type="time"
                  value={sleepData.currentWakeTime}
                  onChange={(e) => setSleepData(prev => ({ ...prev, currentWakeTime: e.target.value }))}
                  className="w-full p-4 border-2 border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-lg"
                />
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                <label className="block text-sm font-semibold mb-3 text-purple-900">
                  ⭐ Qualidade do seu sono atual
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={sleepData.sleepQuality}
                    onChange={(e) => setSleepData(prev => ({ ...prev, sleepQuality: parseInt(e.target.value) }))}
                    className="flex-1 h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #fecaca 0%, #fef08a 50%, #bbf7d0 100%)`
                    }}
                  />
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {sleepData.sleepQuality}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>😴 Péssimo</span>
                  <span>😊 Excelente</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Wind className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Relaxamento Guiado</h2>
              <p className="text-gray-600">Técnicas de respiração e meditação</p>
            </div>

            {/* Breathing Exercise */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 rounded-3xl text-white shadow-2xl">
              <h3 className="text-xl font-bold mb-6 text-center">Exercício de Respiração</h3>
              
              <div className="flex flex-col items-center mb-8">
                <div className={`relative w-48 h-48 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-1000 ${
                  breathingPhase === 'inhale' ? 'scale-125' : breathingPhase === 'hold' ? 'scale-125' : 'scale-100'
                }`}>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">
                      {breathingPhase === 'inhale' ? '🌬️' : breathingPhase === 'hold' ? '⏸️' : '😌'}
                    </div>
                    <div className="text-lg font-semibold">
                      {breathingPhase === 'inhale' ? 'Inspire' : breathingPhase === 'hold' ? 'Segure' : 'Expire'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <label className="block text-sm font-semibold">Escolha seu padrão:</label>
                <div className="grid gap-3">
                  {breathingPatterns.map((pattern) => (
                    <button
                      key={pattern.id}
                      onClick={() => setSleepData(prev => ({ ...prev, breathingPattern: pattern.id }))}
                      className={`p-4 rounded-xl text-left transition-all ${
                        sleepData.breathingPattern === pattern.id
                          ? 'bg-white text-purple-600 shadow-lg scale-105'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      <div className="font-semibold">{pattern.name}</div>
                      <div className="text-sm opacity-90">{pattern.description}</div>
                      <div className="text-xs mt-1 opacity-75">✨ {pattern.benefit}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-full bg-white text-purple-600 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                {isPlaying ? 'Pausar' : 'Iniciar Exercício'}
              </button>
            </div>

            {/* Sleep Stories */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-4 text-indigo-900">📖 Histórias para Dormir</h3>
              <div className="grid gap-3">
                {storyThemes.map((story) => (
                  <button
                    key={story.id}
                    onClick={() => setSleepData(prev => ({ ...prev, storyTheme: story.id }))}
                    className={`p-4 rounded-xl text-left transition-all ${
                      sleepData.storyTheme === story.id
                        ? 'bg-indigo-500 text-white shadow-lg'
                        : 'bg-white hover:bg-indigo-100'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">{story.name}</div>
                        <div className="text-sm opacity-90 mt-1">{story.description}</div>
                      </div>
                      <div className="text-xs opacity-75 whitespace-nowrap ml-2">{story.duration}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Volume2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Ambiente Perfeito</h2>
              <p className="text-gray-600">Sons e configurações ideais</p>
            </div>

            {/* Sound Themes */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-6 rounded-3xl text-white shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">🎵 Sons Ambiente</h3>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {soundThemes.map((theme) => {
                  const Icon = theme.icon
                  return (
                    <button
                      key={theme.id}
                      onClick={() => setSleepData(prev => ({ ...prev, soundTheme: theme.id }))}
                      className={`p-4 rounded-2xl transition-all ${
                        sleepData.soundTheme === theme.id
                          ? 'bg-white text-green-600 shadow-lg scale-105'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      <Icon className="w-8 h-8 mx-auto mb-2" />
                      <div className="text-sm font-semibold">{theme.name}</div>
                      <div className="text-xs opacity-75 mt-1">{theme.description}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Environment Settings */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl">
                <label className="block text-sm font-semibold mb-3 text-blue-900">🌡️ Temperatura</label>
                <select
                  value={sleepData.environment.temperature}
                  onChange={(e) => setSleepData(prev => ({
                    ...prev,
                    environment: { ...prev.environment, temperature: e.target.value }
                  }))}
                  className="w-full p-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione</option>
                  <option value="16-18">16-18°C (Frio)</option>
                  <option value="18-20">18-20°C (Ideal) ⭐</option>
                  <option value="20-22">20-22°C (Morno)</option>
                  <option value="22+">22°C+ (Quente)</option>
                </select>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                <label className="block text-sm font-semibold mb-3 text-purple-900">💡 Iluminação</label>
                <select
                  value={sleepData.environment.lighting}
                  onChange={(e) => setSleepData(prev => ({
                    ...prev,
                    environment: { ...prev.environment, lighting: e.target.value }
                  }))}
                  className="w-full p-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Selecione</option>
                  <option value="blackout">Blackout total ⭐</option>
                  <option value="dim">Luz fraca/noturna</option>
                  <option value="natural">Luz natural</option>
                </select>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl">
                <label className="block text-sm font-semibold mb-3 text-green-900">🔊 Ruído</label>
                <select
                  value={sleepData.environment.noise}
                  onChange={(e) => setSleepData(prev => ({
                    ...prev,
                    environment: { ...prev.environment, noise: e.target.value }
                  }))}
                  className="w-full p-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Selecione</option>
                  <option value="silence">Silêncio total</option>
                  <option value="white-noise">Ruído branco ⭐</option>
                  <option value="nature">Sons da natureza</option>
                  <option value="music">Música suave</option>
                </select>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl">
                <label className="block text-sm font-semibold mb-3 text-orange-900">🛏️ Conforto</label>
                <select
                  value={sleepData.environment.comfort}
                  onChange={(e) => setSleepData(prev => ({
                    ...prev,
                    environment: { ...prev.environment, comfort: e.target.value }
                  }))}
                  className="w-full p-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Selecione</option>
                  <option value="firm">Colchão firme</option>
                  <option value="medium">Colchão médio ⭐</option>
                  <option value="soft">Colchão macio</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Moon className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Rotina Pré-Sono</h2>
              <p className="text-gray-600">Crie hábitos relaxantes</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl mb-6">
              <h3 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Dica dos Especialistas
              </h3>
              <p className="text-indigo-700 text-sm">
                Comece sua rotina 1-2 horas antes de dormir. Evite telas e atividades estimulantes. 
                Consistência é a chave para um sono de qualidade!
              </p>
            </div>

            {/* Horários Ideais */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                <label className="block text-sm font-semibold mb-3 text-purple-900">🌙 Horário para dormir</label>
                <input
                  type="time"
                  value={sleepData.idealBedtime}
                  onChange={(e) => setSleepData(prev => ({ ...prev, idealBedtime: e.target.value }))}
                  className="w-full p-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl">
                <label className="block text-sm font-semibold mb-3 text-orange-900">☀️ Horário para acordar</label>
                <input
                  type="time"
                  value={sleepData.idealWakeTime}
                  onChange={(e) => setSleepData(prev => ({ ...prev, idealWakeTime: e.target.value }))}
                  className="w-full p-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {calculateSleepDuration() && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-2xl text-white shadow-lg mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm opacity-90 mb-1">Duração do sono</div>
                    <div className="text-3xl font-bold">
                      {calculateSleepDuration()?.hours}h {calculateSleepDuration()?.minutes}min
                    </div>
                  </div>
                  <div className="text-5xl">
                    {calculateSleepDuration()!.hours >= 7 && calculateSleepDuration()!.hours <= 9 ? '✅' : '⚠️'}
                  </div>
                </div>
              </div>
            )}

            {/* Routine Activities */}
            <div>
              <label className="block text-sm font-semibold mb-4 text-gray-800">
                Selecione suas atividades pré-sono:
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {routineOptions.map((routine) => {
                  const Icon = routine.icon
                  return (
                    <button
                      key={routine.id}
                      onClick={() => toggleRoutine(routine.id)}
                      className={`p-4 text-left rounded-xl border-2 transition-all ${
                        sleepData.routine.includes(routine.id)
                          ? 'border-indigo-500 bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg scale-105'
                          : 'border-gray-200 hover:border-indigo-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Icon className="w-5 h-5 mt-0.5" />
                          <div>
                            <div className="font-semibold">{routine.name}</div>
                            <div className="text-xs opacity-75 mt-1">✨ {routine.benefit}</div>
                          </div>
                        </div>
                        {sleepData.routine.includes(routine.id) && (
                          <Check className="w-5 h-5" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {sleepData.routine.length > 0 && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Sua rotina ({sleepData.routine.length} atividades)
                </h3>
                <div className="space-y-2">
                  {sleepData.routine.map((routineId, index) => {
                    const routine = routineOptions.find(r => r.id === routineId)
                    return (
                      <div key={routineId} className="flex items-center gap-2 text-green-700">
                        <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="text-sm">{routine?.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )

      case 5:
        const sleepScore = getSleepScore()
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Insights & Acompanhamento</h2>
              <p className="text-gray-600">Seu plano personalizado</p>
            </div>

            {/* Sleep Score */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 rounded-3xl text-white shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-sm opacity-90 mb-2">Seu Sleep Score</div>
                <div className="text-7xl font-bold mb-2">{sleepScore}</div>
                <div className="text-lg">
                  {sleepScore >= 80 ? '🌟 Excelente!' : sleepScore >= 60 ? '👍 Bom!' : sleepScore >= 40 ? '⚠️ Pode melhorar' : '🔴 Precisa atenção'}
                </div>
              </div>
              <div className="bg-white/20 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-white h-full transition-all duration-1000 rounded-full"
                  style={{ width: `${sleepScore}%` }}
                ></div>
              </div>
            </div>

            {/* Goals */}
            <div>
              <label className="block text-sm font-semibold mb-4 text-gray-800">
                🎯 Suas metas de sono:
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {goalOptions.map((goal) => {
                  const Icon = goal.icon
                  return (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`p-4 text-left rounded-xl border-2 transition-all ${
                        sleepData.goals.includes(goal.id)
                          ? 'border-orange-500 bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg'
                          : 'border-gray-200 hover:border-orange-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Icon className="w-5 h-5 mt-0.5" />
                          <div>
                            <div className="font-semibold">{goal.name}</div>
                            <div className="text-xs opacity-75 mt-1">📊 {goal.metric}</div>
                          </div>
                        </div>
                        {sleepData.goals.includes(goal.id) && (
                          <Check className="w-5 h-5" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 rounded-3xl shadow-xl">
              <h3 className="font-bold text-2xl mb-6 text-gray-800 flex items-center gap-2">
                <Award className="w-7 h-7 text-purple-600" />
                Seu Plano Personalizado
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-6 h-6 text-blue-600" />
                    <strong className="text-blue-700 text-lg">Horários</strong>
                  </div>
                  <p className="text-gray-700">
                    Dormir às <span className="font-bold text-purple-600">{sleepData.idealBedtime || '22:00'}</span> • 
                    Acordar às <span className="font-bold text-orange-600">{sleepData.idealWakeTime || '06:00'}</span>
                  </p>
                  {calculateSleepDuration() && (
                    <p className="text-sm text-gray-600 mt-2">
                      ⏱️ Duração: {calculateSleepDuration()?.hours}h {calculateSleepDuration()?.minutes}min
                    </p>
                  )}
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Wind className="w-6 h-6 text-purple-600" />
                    <strong className="text-purple-700 text-lg">Relaxamento</strong>
                  </div>
                  <p className="text-gray-700">
                    Respiração: <span className="font-bold text-purple-600">{breathingPatterns.find(p => p.id === sleepData.breathingPattern)?.name}</span>
                  </p>
                  <p className="text-gray-700 mt-1">
                    História: <span className="font-bold text-purple-600">{storyThemes.find(s => s.id === sleepData.storyTheme)?.name}</span>
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Volume2 className="w-6 h-6 text-green-600" />
                    <strong className="text-green-700 text-lg">Ambiente</strong>
                  </div>
                  <p className="text-gray-700">
                    Som: <span className="font-bold text-green-600">{soundThemes.find(s => s.id === sleepData.soundTheme)?.name}</span>
                  </p>
                  <p className="text-gray-700 mt-1">
                    Temperatura: <span className="font-bold text-green-600">{sleepData.environment.temperature || '18-20°C'}</span> • 
                    Luz: <span className="font-bold text-green-600">{sleepData.environment.lighting || 'Blackout'}</span>
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Moon className="w-6 h-6 text-indigo-600" />
                    <strong className="text-indigo-700 text-lg">Rotina ({sleepData.routine.length} atividades)</strong>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sleepData.routine.length > 0 ? (
                      sleepData.routine.map(routineId => {
                        const routine = routineOptions.find(r => r.id === routineId)
                        return (
                          <span key={routineId} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                            {routine?.name}
                          </span>
                        )
                      })
                    ) : (
                      <span className="text-gray-500 text-sm">Nenhuma atividade selecionada</span>
                    )}
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="w-6 h-6 text-orange-600" />
                    <strong className="text-orange-700 text-lg">Metas ({sleepData.goals.length} objetivos)</strong>
                  </div>
                  <div className="space-y-2">
                    {sleepData.goals.length > 0 ? (
                      sleepData.goals.map(goalId => {
                        const goal = goalOptions.find(g => g.id === goalId)
                        return (
                          <div key={goalId} className="flex items-center gap-2 text-gray-700">
                            <Check className="w-4 h-4 text-orange-500" />
                            <span className="text-sm">{goal?.name}</span>
                          </div>
                        )
                      })
                    ) : (
                      <span className="text-gray-500 text-sm">Nenhuma meta selecionada</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl text-white">
                <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  Próximos Passos
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-lg">1️⃣</span>
                    <span>Comece hoje com seus novos horários de sono</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg">2️⃣</span>
                    <span>Configure seu ambiente (temperatura, luz, som)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg">3️⃣</span>
                    <span>Pratique exercícios de respiração antes de dormir</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg">4️⃣</span>
                    <span>Siga sua rotina pré-sono consistentemente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg">5️⃣</span>
                    <span>Monitore seu progresso e ajuste após 1-2 semanas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Moon className="w-12 h-12 text-purple-400 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white ml-4">SleepMaster</h1>
          </div>
          <p className="text-purple-200 text-lg">Seu guia completo para o sono perfeito</p>
          <p className="text-purple-300 text-sm mt-2">Baseado nos melhores apps do mundo: Calm, Headspace, Sleep Cycle & mais</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6 px-2">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = step.id === currentStep
              const isCompleted = step.id < currentStep
              
              return (
                <div key={step.id} className="flex flex-col items-center relative">
                  {index > 0 && (
                    <div className={`absolute right-full top-5 w-full h-1 -mr-2 ${
                      isCompleted ? 'bg-gradient-to-r ' + steps[index - 1].color : 'bg-gray-700'
                    }`} style={{ width: 'calc(100% + 1rem)' }}></div>
                  )}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 relative z-10 ${
                      isActive
                        ? `bg-gradient-to-br ${step.color} text-white shadow-2xl scale-110`
                        : isCompleted
                        ? `bg-gradient-to-br ${step.color} text-white`
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-medium text-center hidden sm:block transition-all ${
                    isActive ? 'text-white scale-110' : isCompleted ? 'text-purple-300' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 h-full transition-all duration-500 rounded-full shadow-lg"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
          <p className="text-center text-sm text-purple-300 mt-3 font-medium">
            Etapa {currentStep} de 5 • {Math.round((currentStep / 5) * 100)}% completo
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-10 mb-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center px-8 py-4 rounded-2xl font-bold transition-all text-lg ${
              currentStep === 1
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-2xl hover:scale-105'
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Anterior
          </button>

          {currentStep === 5 ? (
            <button
              onClick={() => setCurrentStep(1)}
              className="flex items-center px-8 py-4 rounded-2xl font-bold transition-all text-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-2xl hover:scale-105"
            >
              <Award className="w-5 h-5 mr-2" />
              Recomeçar
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="flex items-center px-8 py-4 rounded-2xl font-bold transition-all text-lg bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-2xl hover:scale-105"
            >
              Próximo
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-purple-300 text-sm">
          <p>💤 Durma melhor, viva melhor</p>
        </div>
      </div>
    </div>
  )
}
