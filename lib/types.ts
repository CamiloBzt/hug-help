export type UserType = "client" | "provider"

export type RequestStatus =
  | "pending"
  | "accepted"
  | "in_progress"
  | "completed"
  | "cancelled"

export type SubscriptionPlan = "basic" | "premium" | "enterprise"

export type VerificationStatus =
  | "pending"
  | "in_review"
  | "approved"
  | "rejected"

export interface Provider {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  bio: string
  rating: number
  totalReviews: number
  verified: boolean
  plan: SubscriptionPlan
  verificationStatus: VerificationStatus
  joinedDate: string
  servicesCount: number
  completedServices: number
}

export interface Service {
  id: string
  title: string
  category: string
  description: string
  price: number | "negotiable"
  images: string[]
  active: boolean
  rating: number
  totalReviews: number
  createdAt: string
}

export interface ServiceRequest {
  id: string
  clientName: string
  clientAvatar: string
  serviceTitle: string
  description: string
  images: string[]
  status: RequestStatus
  date: string
  time: string
  location: string
  locationLat: number
  locationLng: number
  preferredDates: string[]
  createdAt: string
}

export interface ChatMessage {
  id: string
  senderId: string
  text: string
  timestamp: string
  read: boolean
  type: "text" | "image"
  imageUrl?: string
}

export interface ChatConversation {
  id: string
  participantName: string
  participantAvatar: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  relatedRequestId?: string
  relatedServiceTitle?: string
  relatedRequestStatus?: RequestStatus
}

export interface Review {
  id: string
  clientName: string
  clientAvatar: string
  rating: number
  comment: string
  date: string
  serviceTitle: string
}

export interface DashboardMetrics {
  activeServices: number
  pendingRequests: number
  completedServices: number
  averageRating: number
  monthlyEarnings: number
  weeklyActivity: { day: string; requests: number; completed: number }[]
}

export interface SubscriptionTier {
  id: SubscriptionPlan
  name: string
  price: number
  features: string[]
  maxServices: number
  highlighted: boolean
  popular: boolean
}

// Client-specific types

export interface BrowseService {
  id: string
  title: string
  category: string
  description: string
  price: number | "negotiable"
  images: string[]
  rating: number
  totalReviews: number
  providerName: string
  providerAvatar: string
  providerVerified: boolean
  providerRating: number
  distance: string
  location: string
  providerLat: number
  providerLng: number
}

export interface ClientContractedService {
  id: string
  serviceTitle: string
  providerName: string
  providerAvatar: string
  status: RequestStatus
  date: string
  time: string
  location: string
  price: number
  rated: boolean
  providerLat: number
  providerLng: number
}

export type NotificationType =
  | "new_request"
  | "request_accepted"
  | "request_completed"
  | "new_message"
  | "new_review"
  | "system"

export interface AppNotification {
  id: string
  type: NotificationType
  title: string
  message: string
  time: string
  read: boolean
  relatedId?: string
}

export interface ClientProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  joinedDate: string
  totalServicesRequested: number
}
