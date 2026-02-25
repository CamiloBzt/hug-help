"use client"

import { NavigationProvider, useNavigation } from "../lib/navigation"
import { BottomNavigation } from "../components/organisms/bottom-navigation"
import { SplashScreen } from "../components/screens/splash-screen"
import { LoginScreen } from "../components/screens/login-screen"
import { RegisterScreen } from "../components/screens/register-screen"
import { RegisterFormScreen } from "../components/screens/register-form-screen"
import { DashboardScreen } from "../components/screens/dashboard-screen"
import { ServicesScreen } from "../components/screens/services-screen"
import { CreateServiceScreen } from "../components/screens/create-service-screen"
import { RequestsScreen } from "../components/screens/requests-screen"
import { RequestDetailScreen } from "../components/screens/request-detail-screen"
import { SubscriptionsScreen } from "../components/screens/subscriptions-screen"
import { NotificationsScreen } from "../components/screens/notifications-screen"
import { ChatScreen } from "../components/screens/chat-screen"
import { ProfileScreen } from "../components/screens/profile-screen"
import { ClientHomeScreen } from "../components/screens/client-home-screen"
import { ClientSearchScreen } from "../components/screens/client-search-screen"
import { ClientServiceDetailScreen } from "../components/screens/client-service-detail-screen"
import { ClientRequestServiceScreen } from "../components/screens/client-request-service-screen"
import { ClientMyServicesScreen } from "../components/screens/client-my-services-screen"
import { ClientContractedDetailScreen } from "../components/screens/client-contracted-detail-screen"
import { ClientRateServiceScreen } from "../components/screens/client-rate-service-screen"
import { ClientProfileScreen } from "../components/screens/client-profile-screen"

const screensWithNav = new Set([
  // Provider
  "dashboard",
  "services",
  "requests",
  "profile",
  // Client
  "client-home",
  "client-search",
  "client-my-services",
  "client-profile",
])

function AppContent() {
  const { screen } = useNavigation()

  const renderScreen = () => {
    switch (screen) {
      // Shared
      case "splash":
        return <SplashScreen />
      case "login":
        return <LoginScreen />
      case "register":
        return <RegisterScreen />
      case "register-form":
        return <RegisterFormScreen />
      // Provider
      case "dashboard":
        return <DashboardScreen />
      case "services":
        return <ServicesScreen />
      case "create-service":
        return <CreateServiceScreen />
      case "requests":
        return <RequestsScreen />
      case "request-detail":
        return <RequestDetailScreen />
      case "subscriptions":
        return <SubscriptionsScreen />
      case "notifications":
        return <NotificationsScreen />
      case "chat":
        return <ChatScreen />
      case "profile":
        return <ProfileScreen />
      // Client
      case "client-home":
        return <ClientHomeScreen />
      case "client-search":
        return <ClientSearchScreen />
      case "client-service-detail":
        return <ClientServiceDetailScreen />
      case "client-request-service":
        return <ClientRequestServiceScreen />
      case "client-my-services":
        return <ClientMyServicesScreen />
      case "client-contracted-detail":
        return <ClientContractedDetailScreen />
      case "client-rate-service":
        return <ClientRateServiceScreen />
      case "client-profile":
        return <ClientProfileScreen />
      default:
        return <SplashScreen />
    }
  }

  return (
    <>
      <main className="flex min-h-0 flex-1 flex-col">{renderScreen()}</main>
      {screensWithNav.has(screen) && <BottomNavigation />}
    </>
  )
}

export default function Home() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  )
}
