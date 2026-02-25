import { Check, CheckCheck } from "lucide-react"

interface ChatBubbleProps {
  text: string
  timestamp: string
  isMe: boolean
  read?: boolean
}

export function ChatBubble({ text, timestamp, isMe, read }: ChatBubbleProps) {
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 ${
          isMe
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md bg-card text-foreground shadow-sm"
        }`}
      >
        <p className="text-[13px] leading-relaxed">{text}</p>
        <div
          className={`mt-1 flex items-center justify-end gap-1 ${
            isMe ? "text-primary-foreground/60" : "text-muted-foreground"
          }`}
        >
          <span className="text-[10px]">{timestamp}</span>
          {isMe &&
            (read ? (
              <CheckCheck className="h-3 w-3 text-primary-foreground/80" />
            ) : (
              <Check className="h-3 w-3" />
            ))}
        </div>
      </div>
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl rounded-bl-md bg-card px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:0ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  )
}
