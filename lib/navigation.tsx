"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react"

export type Screen =
  // Shared
  | "splash"
  | "login"
  | "register"
  | "register-form"
  // Provider
  | "dashboard"
  | "services"
  | "create-service"
  | "requests"
  | "request-detail"
  | "subscriptions"
  | "notifications"
  | "chat"
  | "profile"
  // Client
  | "client-home"
  | "client-search"
  | "client-service-detail"
  | "client-request-service"
  | "client-my-services"
  | "client-contracted-detail"
  | "client-rate-service"
  | "client-profile"

export type UserMode = "client" | "provider"

interface NavigationContext {
  screen: Screen
  userMode: UserMode
  navigate: (screen: Screen, params?: Record<string, string>) => void
  goBack: () => void
  setUserMode: (mode: UserMode) => void
  params: Record<string, string>
}

const NavigationContext = createContext<NavigationContext>({
  screen: "splash",
  userMode: "provider",
  navigate: () => {},
  goBack: () => {},
  setUserMode: () => {},
  params: {},
})

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>("splash")
  const [history, setHistory] = useState<
    { screen: Screen; params: Record<string, string> }[]
  >([])
  const [params, setParams] = useState<Record<string, string>>({})
  const [userMode, setUserModeState] = useState<UserMode>("provider")
  const screenRef = useRef<Screen>(screen)
  const paramsRef = useRef<Record<string, string>>(params)
  screenRef.current = screen
  paramsRef.current = params

  const navigate = useCallback(
    (newScreen: Screen, newParams?: Record<string, string>) => {
      setHistory((prev) => [
        ...prev,
        { screen: screenRef.current, params: paramsRef.current },
      ])
      setScreen(newScreen)
      setParams(newParams ?? {})
    },
    [],
  )

  const goBack = useCallback(() => {
    setHistory((prev) => {
      const newHistory = [...prev]
      const entry = newHistory.pop()
      if (entry) {
        setScreen(entry.screen)
        setParams(entry.params)
      }
      return newHistory
    })
  }, [])

  const setUserMode = useCallback(
    (mode: UserMode) => {
      setUserModeState(mode)
      setHistory([])
      setParams({})
      if (mode === "client") {
        setScreen("client-home")
      } else {
        setScreen("dashboard")
      }
    },
    [],
  )

  return (
    <NavigationContext.Provider
      value={{ screen, userMode, navigate, goBack, setUserMode, params }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  return useContext(NavigationContext)
}
