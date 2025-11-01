'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './page.module.css'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello, I'm here to listen and support you. This is a safe space where you can share what's on your mind. How are you feeling today?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Anxiety responses
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried') || lowerMessage.includes('nervous')) {
      const responses = [
        "I hear that you're feeling anxious. Anxiety is a natural response, but I understand it can be overwhelming. Can you tell me more about what specifically is triggering these feelings?",
        "Thank you for sharing that. When you notice anxiety arising, try to ground yourself - feel your feet on the floor, notice your breathing. What situations tend to make your anxiety worse?",
        "It takes courage to acknowledge anxiety. Remember, these feelings are temporary. Have you noticed any patterns in when your anxiety appears?"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    // Depression/sadness responses
    if (lowerMessage.includes('depressed') || lowerMessage.includes('sad') || lowerMessage.includes('hopeless') || lowerMessage.includes('down')) {
      const responses = [
        "I'm really glad you're opening up about this. Depression can feel very isolating. You're not alone in this. What has been the most difficult part for you?",
        "Thank you for trusting me with these feelings. When you're feeling down, even small steps matter. Have you been able to do any activities that used to bring you joy?",
        "I hear the pain in your words. These feelings are real and valid. Can you tell me about your support system? Who do you have that you can talk to?"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    // Stress responses
    if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('pressure') || lowerMessage.includes('too much')) {
      const responses = [
        "Feeling overwhelmed is completely understandable, especially when life feels demanding. Let's break this down - what's the biggest source of stress for you right now?",
        "Stress affects us all differently. It sounds like you're carrying a lot. Have you been able to take any breaks or practice self-care recently?",
        "I hear that you're under a lot of pressure. Remember, you don't have to handle everything at once. What's one thing we could work on making more manageable?"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    // Relationship issues
    if (lowerMessage.includes('relationship') || lowerMessage.includes('partner') || lowerMessage.includes('friend') || lowerMessage.includes('family')) {
      const responses = [
        "Relationships can be complex and challenging. Thank you for sharing this with me. How does this relationship situation make you feel?",
        "It sounds like this relationship is weighing on you. Can you tell me more about what's been happening? What would you like to be different?",
        "Interpersonal connections are so important to our wellbeing. What would healthy communication look like in this situation for you?"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    // Sleep issues
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired') || lowerMessage.includes('exhausted')) {
      const responses = [
        "Sleep difficulties can really impact how we feel during the day. How long has this been going on? What does your bedtime routine look like?",
        "Quality sleep is so important for mental health. Have you noticed any patterns - like thoughts keeping you awake, or physical restlessness?",
        "I understand how frustrating sleep problems can be. Creating good sleep hygiene can help. What time do you usually try to sleep?"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    // Work/school stress
    if (lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('school') || lowerMessage.includes('study')) {
      const responses = [
        "Work/school stress is very common. It sounds like this is really affecting you. What aspects are most challenging right now?",
        "Finding balance between work/school and personal life can be difficult. How are you managing your boundaries?",
        "I hear you. These environments can be demanding. What support systems do you have in place?"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    // Positive responses
    if (lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('happy') || lowerMessage.includes('better')) {
      const responses = [
        "That's wonderful to hear! I'm glad you're feeling positive. What's been contributing to these good feelings?",
        "It's great that you're in a good place. What positive changes have you noticed?",
        "I'm so happy to hear that! Acknowledging the good moments is important. What's been going well?"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    // Greetings
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
      return "Hello! I'm here to listen and support you. How are you doing today? What would you like to talk about?"
    }

    // Thank you
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're very welcome. I'm here for you whenever you need to talk. How else can I support you today?"
    }

    // Default empathetic responses
    const defaultResponses = [
      "I appreciate you sharing that with me. Can you tell me more about how this makes you feel?",
      "Thank you for opening up. That sounds important. How long has this been on your mind?",
      "I'm listening. What you're experiencing matters. Can you help me understand this better?",
      "It sounds like you're going through something significant. What would help you feel better about this situation?",
      "I hear you. Your feelings are valid. What thoughts have been coming up for you around this?",
      "That must be difficult. How has this been affecting your daily life?",
      "Thank you for trusting me with this. What kind of support would be most helpful for you right now?"
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(input.trim())
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  return (
    <div className={styles.container}>
      <div className={styles.chatWindow}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>🧠</div>
          <div>
            <h1 className={styles.title}>AI Psychologist</h1>
            <p className={styles.subtitle}>Your supportive mental health companion</p>
          </div>
        </div>

        <div className={styles.messagesContainer}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                message.role === 'user' ? styles.userMessage : styles.assistantMessage
              }`}
            >
              <div className={styles.messageContent}>
                <div className={styles.messageText}>{message.content}</div>
                <div className={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className={`${styles.message} ${styles.assistantMessage}`}>
              <div className={styles.messageContent}>
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share what's on your mind..."
            className={styles.input}
            disabled={isTyping}
          />
          <button
            type="submit"
            className={styles.sendButton}
            disabled={!input.trim() || isTyping}
          >
            Send
          </button>
        </form>

        <div className={styles.disclaimer}>
          <small>
            This is an AI simulation for supportive conversations. For professional help,
            please contact a licensed mental health professional or call a crisis helpline.
          </small>
        </div>
      </div>
    </div>
  )
}
