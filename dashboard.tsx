"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Moon, Sun, Search, Plus, Edit, LogOut, Settings, Users } from "lucide-react"
import { useState } from "react"

// Типы данных
type UserRole = "Саппорт" | "Администратор" | "Биг-Босс"

type User = {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
}

type Category =
  | "Автозагрузка"
  | "Центр сообщений"
  | "Чат-бот"
  | "AI ассистент"
  | "Интеграция с AMO"
  | "Отзывы"
  | "Парсер"
  | "Быть в сети"
  | "Уведомления"

type Case = {
  id: string
  title: string
  question: string
  answer: string
  category: Category
  author: string
  createdAt: string
}

// Моковые данные
const currentUser: User = {
  id: "1",
  name: "Иван Курганский",
  email: "ivan@example.com",
  role: "Администратор",
  createdAt: "15 января 2025",
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Иван Курганский",
    email: "ivan@example.com",
    role: "Администратор",
    createdAt: "15 января 2025",
  },
  {
    id: "2",
    name: "Кирилл Захаров",
    email: "kirill@example.com",
    role: "Саппорт",
    createdAt: "20 января 2025",
  },
  {
    id: "3",
    name: "Анна Петрова",
    email: "anna@example.com",
    role: "Саппорт",
    createdAt: "22 января 2025",
  },
  {
    id: "4",
    name: "Михаил Сидоров",
    email: "mikhail@example.com",
    role: "Биг-Босс",
    createdAt: "10 января 2025",
  },
]

const mockCases: Case[] = [
  {
    id: "1",
    title: "Как подключить API ключи к таблице?",
    question: "Клиент спрашивает как подключить API ключи к таблице в системе",
    answer:
      'Для корректного подключения вашего аккаунта к таблице необходимо выполнить следующие шаги: 1. Активируйте тариф - вам потребуется "Расширенный" тариф или выше в вашем профиле на Авито 2. Получите API-ключи - Перейдите в раздел "Интеграции и API" в личном кабинете Авито - Скопируйте значения client_id и client_secret - Добавьте ключи в таблицу - вставьте полученные данные. Если в процессе подключения возникнут сложности, будем рады помочь - просто опишите, на каком этапе появилась проблема.',
    category: "Интеграция с AMO",
    author: "Иван Курганский",
    createdAt: "24 июня 2025",
  },
  {
    id: "2",
    title: "Настройка автозагрузки объявлений",
    question: "Как настроить автоматическую загрузку объявлений?",
    answer: "Для настройки автозагрузки перейдите в раздел 'Автозагрузка' и следуйте инструкциям...",
    category: "Автозагрузка",
    author: "Кирилл Захаров",
    createdAt: "23 июня 2025",
  },
]

const categories: Category[] = [
  "Автозагрузка",
  "Центр сообщений",
  "Чат-бот",
  "AI ассистент",
  "Интеграция с AMO",
  "Отзывы",
  "Парсер",
  "Быть в сети",
  "Уведомления",
]

const canSeeAdminPanel = currentUser.role === "Администратор" || currentUser.role === "Биг-Босс"
const canEditAllCases = currentUser.role === "Администратор" || currentUser.role === "Биг-Босс"

const getAvatarColor = (role: UserRole): string => {
  switch (role) {
    case "Саппорт":
      return "bg-green-500"
    case "Администратор":
      return "bg-blue-500"
    case "Биг-Босс":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getRoleBadgeColor = (role: UserRole): string => {
  switch (role) {
    case "Саппорт":
      return "bg-green-100 text-green-800"
    case "Администратор":
      return "bg-blue-100 text-blue-800"
    case "Биг-Босс":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const handleCreateCase = () => {
  // Logic to handle case creation
}

const filteredCases = mockCases

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"knowledge" | "my-cases">("knowledge")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all")
  const [isCreateCaseOpen, setIsCreateCaseOpen] = useState(false)
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false)
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [newCase, setNewCase] = useState({
    title: "",
    question: "",
    answer: "",
    category: "" as Category | "",
  })

  // Initialize theme from localStorage immediately
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      return savedTheme === "dark"
    }
    return false
  })
  const [isTransitioning, setIsTransitioning] = useState(false)

  const toggleTheme = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      const newTheme = !isDark
      setIsDark(newTheme)
      localStorage.setItem("theme", newTheme ? "dark" : "light")
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, 150)
  }

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ))
  }

  // Функция для определения доступных ролей для каждого пользователя
  const getAvailableRoles = (targetUserId: string): UserRole[] => {
    const baseRoles: UserRole[] = ["Саппорт", "Администратор"]
    
    // Администраторы и Биг-Боссы могут назначать роль Биг-Босса
    if (currentUser.role === "Администратор" || currentUser.role === "Биг-Босс") {
      baseRoles.push("Биг-Босс")
    }
    
    return baseRoles
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ease-in-out ${
        isTransitioning ? "opacity-90" : "opacity-100"
      }`}
      style={{
        backgroundImage: isDark ? "url(/background-dark.png)" : "url(/background.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header */}
      <header
        className={`flex items-center justify-between p-6 transition-all duration-500 ${
          isDark ? "bg-black/20" : "bg-white/10"
        } backdrop-blur-sm`}
      >
        {/* Navigation Menu */}
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("knowledge")}
            className={`transition-colors ${
              isDark ? "text-white hover:text-white/80" : "text-gray-800 hover:text-gray-600"
            } ${activeTab === "knowledge" ? "font-semibold" : ""}`}
          >
            База знаний
          </button>
          <button
            onClick={() => setActiveTab("my-cases")}
            className={`transition-colors ${
              isDark ? "text-white hover:text-white/80" : "text-gray-800 hover:text-gray-600"
            } ${activeTab === "my-cases" ? "font-semibold" : ""}`}
          >
            Мои кейсы
          </button>
          {canSeeAdminPanel && (
            <Dialog open={isAdminPanelOpen} onOpenChange={setIsAdminPanelOpen}>
              <DialogTrigger asChild>
                <button
                  className={`transition-colors ${
                    isDark ? "text-white hover:text-white/80" : "text-gray-800 hover:text-gray-600"
                  }`}
                >
                  Админ-панель
                </button>
              </DialogTrigger>
              <DialogContent
                className={`max-w-4xl max-h-[80vh] overflow-y-auto transition-all duration-500 ${
                  isDark ? "bg-gray-900 text-white border-gray-700" : ""
                }`}
              >
                <DialogHeader>
                  <DialogTitle className={`flex items-center gap-2 ${isDark ? "text-white" : ""}`}>
                    <Users className="w-5 h-5" />
                    Управление пользователями
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      Управление ролями пользователей системы
                    </p>
                    <Badge variant="secondary" className={isDark ? "bg-gray-700 text-gray-300" : ""}>
                      Всего пользователей: {users.length}
                    </Badge>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow className={isDark ? "border-gray-700" : ""}>
                        <TableHead className={isDark ? "text-gray-300" : ""}>Пользователь</TableHead>
                        <TableHead className={isDark ? "text-gray-300" : ""}>Email</TableHead>
                        <TableHead className={isDark ? "text-gray-300" : ""}>Роль</TableHead>
                        <TableHead className={isDark ? "text-gray-300" : ""}>Дата регистрации</TableHead>
                        <TableHead className={isDark ? "text-gray-300" : ""}>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id} className={isDark ? "border-gray-700" : ""}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className={`${getAvatarColor(user.role)} text-white text-xs`}>
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className={isDark ? "text-white" : ""}>{user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className={isDark ? "text-gray-300" : "text-gray-600"}>
                            {user.email}
                          </TableCell>
                          <TableCell>
                            <Badge className={getRoleBadgeColor(user.role)}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell className={isDark ? "text-gray-300" : "text-gray-600"}>
                            {user.createdAt}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={user.role}
                              onValueChange={(value) => handleRoleChange(user.id, value as UserRole)}
                            >
                              <SelectTrigger className={`w-40 ${isDark ? "bg-gray-800 text-white border-gray-700" : ""}`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className={isDark ? "bg-gray-800 text-white border-gray-700" : ""}>
                                {getAvailableRoles(user.id).map((role) => (
                                  <SelectItem key={role} value={role}>
                                    {role}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </nav>

        {/* Logo */}
        <div
          className={`flex items-center space-x-2 transition-all duration-700 delay-200 ${
            isTransitioning ? "opacity-80" : "opacity-100"
          }`}
        >
          <img
            src={isDark ? "/logo-dark.png" : "/logo-light.png"}
            alt="SRP Logo"
            className="h-14 w-auto transition-all duration-500"
          />
        </div>

        {/* User Avatar and Theme Toggle */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className={`font-medium transition-colors duration-500 ${isDark ? "text-white" : "text-gray-800"}`}>
              {currentUser.name}
            </div>
            <div className={`text-sm transition-colors duration-500 ${isDark ? "text-white/70" : "text-gray-600"}`}>
              {currentUser.role}
            </div>
          </div>
          <Avatar className="w-12 h-12">
            <AvatarFallback className={`${getAvatarColor(currentUser.role)} text-white font-semibold`}>
              {currentUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <Button
            variant="ghost"
            size="sm"
            className={`transition-colors duration-500 ${
              isDark ? "text-white hover:text-white/80" : "text-gray-800 hover:text-gray-600"
            }`}
          >
            <LogOut className="w-4 h-4" />
          </Button>

          {/* Theme Toggle Button */}
          <Button
            onClick={toggleTheme}
            disabled={isTransitioning}
            className={`w-10 h-10 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              isDark ? "bg-gray-700 hover:bg-gray-600 text-yellow-400" : "bg-white hover:bg-gray-100 text-gray-800"
            } ${isTransitioning ? "animate-spin" : ""}`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-88px)]">
        {/* Sidebar */}
        <div
          className={`w-80 p-6 transition-all duration-500 ${
            isDark ? "bg-gray-900/80" : "bg-gray-800/80"
          } backdrop-blur-sm text-white`}
        >
          <h2 className="text-xl font-semibold mb-6">
            {activeTab === "knowledge" && "Общая база знаний"}
            {activeTab === "my-cases" && "Мои кейсы"}
          </h2>

          <div className="space-y-2">
            <div className="text-sm text-gray-300">Иван Курганский</div>
            <div className="text-sm text-gray-300">Кирилл Захаров</div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8">
          <div
            className={`rounded-3xl p-8 h-full overflow-hidden transition-all duration-500 ${
              isDark ? "bg-gray-900/90" : "bg-white/90"
            } backdrop-blur-sm`}
          >
            {/* Search and Filters */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Поиск"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 rounded-full border-0 transition-all duration-500 ${
                    isDark ? "bg-gray-800 text-white placeholder:text-gray-400" : "bg-gray-100 text-gray-800"
                  }`}
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value as Category | "all")}
              >
                <SelectTrigger
                  className={`w-48 rounded-full border-0 transition-all duration-500 ${
                    isDark ? "bg-gray-800 text-white" : "bg-gray-100"
                  }`}
                >
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent className={isDark ? "bg-gray-800 text-white border-gray-700" : ""}>
                  <SelectItem value="all">Все категории</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {activeTab === "my-cases" && (
                <Dialog open={isCreateCaseOpen} onOpenChange={setIsCreateCaseOpen}>
                  <DialogTrigger asChild>
                    <Button className="rounded-full bg-blue-500 hover:bg-blue-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Создать новый кейс
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className={`max-w-2xl transition-all duration-500 ${
                      isDark ? "bg-gray-900 text-white border-gray-700" : ""
                    }`}
                  >
                    <DialogHeader>
                      <DialogTitle className={isDark ? "text-white" : ""}>Создать новый кейс</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Название кейса"
                        value={newCase.title}
                        onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                        className={isDark ? "bg-gray-800 text-white border-gray-700" : ""}
                      />
                      <Textarea
                        placeholder="Вопрос клиента"
                        value={newCase.question}
                        onChange={(e) => setNewCase({ ...newCase, question: e.target.value })}
                        rows={3}
                        className={isDark ? "bg-gray-800 text-white border-gray-700" : ""}
                      />
                      <Textarea
                        placeholder="Ответ на вопрос"
                        value={newCase.answer}
                        onChange={(e) => setNewCase({ ...newCase, answer: e.target.value })}
                        rows={5}
                        className={isDark ? "bg-gray-800 text-white border-gray-700" : ""}
                      />
                      <Select
                        value={newCase.category}
                        onValueChange={(value) => setNewCase({ ...newCase, category: value as Category })}
                      >
                        <SelectTrigger className={isDark ? "bg-gray-800 text-white border-gray-700" : ""}>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent className={isDark ? "bg-gray-800 text-white border-gray-700" : ""}>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsCreateCaseOpen(false)}
                          className={isDark ? "border-gray-700 text-white hover:bg-gray-800" : ""}
                        >
                          Отмена
                        </Button>
                        <Button onClick={handleCreateCase}>Создать кейс</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {/* Cases List */}
            <div className="space-y-4 h-[calc(100%-120px)] overflow-y-auto">
              {filteredCases.map((case_) => (
                <Card
                  key={case_.id}
                  className={`hover:shadow-md transition-all duration-300 ${
                    isDark ? "bg-gray-800/50 border-gray-700 text-white" : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className={`text-lg mb-2 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                          {case_.title}
                        </CardTitle>
                        <div
                          className={`flex items-center space-x-4 text-sm ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <span>{case_.createdAt}</span>
                          <Badge variant="secondary" className={isDark ? "bg-gray-700 text-gray-300" : ""}>
                            {case_.category}
                          </Badge>
                          <span>Автор: {case_.author}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback
                            className={`text-xs ${isDark ? "bg-gray-700 text-gray-300" : "bg-gray-300 text-gray-600"}`}
                          >
                            {case_.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {(canEditAllCases || case_.author === currentUser.name) && (
                          <Button variant="ghost" size="sm" className={isDark ? "text-gray-300 hover:text-white" : ""}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className={`leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>{case_.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}