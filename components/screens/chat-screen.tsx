"use client"

import { useState } from "react"
import { useNavigation } from "../../lib/navigation"
import {
  chatMessages,
  chatConversations,
  clientChatConversations,
} from "../../lib/mock-data"
import {
  ArrowLeft,
  Send,
  Camera,
  Wrench,
  CheckCircle2,
  XCircle,
  FileText,
  Check,
  CheckCheck,
} from "lucide-react"
import { Avatar } from "../atoms/avatar"
import { ChatBubble, TypingIndicator } from "../molecules/chat-bubble"

export function ChatScreen() {
  const { goBack, params, userMode, navigate } = useNavigation()
  const [message, setMessage] = useState("")
  const [requestHandled, setRequestHandled] = useState(false)

  const allConversations =
    userMode === "client" ? clientChatConversations : chatConversations
  const conv = allConversations.find((c) => c.id === params.chatId)

  const isServiceEnded =
    conv?.relatedRequestStatus === "completed" ||
    conv?.relatedRequestStatus === "cancelled"

  const isPending =
    userMode === "provider" &&
    conv?.relatedRequestStatus === "pending" &&
    !requestHandled

  const statusLabel: Record<string, string> = {
    pending: "Pendiente",
    accepted: "Aceptada",
    in_progress: "En curso",
    completed: "Completada",
  }

  const goToDetail = () => {
    if (!conv?.relatedRequestId) return
    if (userMode === "provider") {
      navigate("request-detail", { requestId: conv.relatedRequestId })
    } else {
      navigate("client-contracted-detail", {
        serviceId: conv.relatedRequestId,
      })
    }
  }

  return (
    <div className="flex flex-1 flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 pb-3 pt-12">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goBack}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors active:bg-muted"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className="flex flex-1 items-center gap-2.5">
            <div className="relative">
              <Avatar name={conv?.participantName || "?"} size="md" />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-success" />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-semibold text-foreground">
                {conv?.participantName || "Chat"}
              </span>
              <span className="text-[10px] text-success">En linea</span>
            </div>
          </div>
          {/* Functional action: go to related detail */}
          {conv?.relatedRequestId && (
            <button
              type="button"
              onClick={goToDetail}
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-secondary px-2.5 py-1.5 text-xs font-medium text-primary transition-colors active:bg-secondary/80"
            >
              <FileText className="h-3.5 w-3.5" />
              {userMode === "provider" ? "Solicitud" : "Servicio"}
            </button>
          )}
        </div>
      </div>

      {/* Related service context banner */}
      {conv?.relatedServiceTitle && (
        <button
          type="button"
          onClick={goToDetail}
          disabled={!conv.relatedRequestId}
          className="flex items-center gap-2.5 border-b border-border bg-secondary/50 px-4 py-2 text-left transition-colors active:bg-secondary disabled:pointer-events-none"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
            <Wrench className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="flex-1 truncate text-xs font-medium text-foreground">
            {conv.relatedServiceTitle}
          </span>
          {conv.relatedRequestStatus && (
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                conv.relatedRequestStatus === "pending"
                  ? "bg-accent/10 text-accent"
                  : conv.relatedRequestStatus === "accepted"
                    ? "bg-primary/10 text-primary"
                    : conv.relatedRequestStatus === "in_progress"
                      ? "bg-success/10 text-success"
                      : "bg-muted text-muted-foreground"
              }`}
            >
              {statusLabel[conv.relatedRequestStatus] || conv.relatedRequestStatus}
            </span>
          )}
        </button>
      )}

      {/* Accept / Reject quick actions for pending requests */}
      {isPending && (
        <div className="flex items-center gap-2 border-b border-border bg-accent/5 px-4 py-2.5">
          <span className="flex-1 text-xs font-medium text-foreground">
            Responder:
          </span>
          <button
            type="button"
            onClick={() => setRequestHandled(true)}
            className="flex items-center gap-1 rounded-lg bg-success px-3 py-1.5 text-xs font-semibold text-success-foreground transition-colors active:bg-success/90"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Aceptar
          </button>
          <button
            type="button"
            onClick={() => setRequestHandled(true)}
            className="flex items-center gap-1 rounded-lg bg-destructive px-3 py-1.5 text-xs font-semibold text-destructive-foreground transition-colors active:bg-destructive/90"
          >
            <XCircle className="h-3.5 w-3.5" />
            Rechazar
          </button>
        </div>
      )}

      {requestHandled && (
        <div className="flex items-center gap-2 border-b border-border bg-success/10 px-4 py-2">
          <CheckCircle2 className="h-3.5 w-3.5 text-success" />
          <span className="text-xs font-medium text-success">
            Solicitud respondida
          </span>
        </div>
      )}

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-4">
        {chatMessages.map((msg) => {
          const isProvider = msg.senderId === "provider"
          const isMe = userMode === "provider" ? isProvider : !isProvider
          return (
            <ChatBubble
              key={msg.id}
              text={msg.text}
              timestamp={msg.timestamp}
              isMe={isMe}
              read={msg.read}
            />
          )
        })}
        <TypingIndicator />
      </div>

      {/* Input */}
      {isServiceEnded ? (
        <div className="border-t border-border bg-muted/50 px-4 pb-8 pt-4">
          <div className="flex items-center justify-center gap-2 rounded-xl bg-muted px-4 py-3">
            <XCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              Este chat se cerro al finalizar el servicio
            </span>
          </div>
        </div>
      ) : (
        <div className="border-t border-border bg-card px-4 pb-8 pt-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted transition-colors active:bg-muted/80"
              aria-label="Enviar foto"
            >
              <Camera className="h-5 w-5 text-muted-foreground" />
            </button>
            <div className="flex flex-1 items-center rounded-full border border-input bg-background px-4">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-10 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary transition-colors active:bg-primary/90"
              aria-label="Enviar mensaje"
            >
              <Send className="h-4 w-4 text-primary-foreground" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
