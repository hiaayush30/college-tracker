"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

function ChatRoom() {
  const { user } = useAuthStore();
  const router = useRouter();
  useEffect(()=>{
    if(!user) router.replace("/login")
  },[user,router])
  const [ws, setWs] = useState<null | WebSocket>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [online,setOnline] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!);

    socket.onopen = () => {
      setWs(socket);
      toast.success("Connected to Chat Room 🎉");
      socket.send(JSON.stringify({ type:"meta",message:user?.username }))
    };

    socket.onmessage = (event) => {
      const parsed = JSON.parse(event.data) as { type: "meta" | "chat", message: string }
      if (parsed.type == "chat") {
        setMessages((prev) => [...prev, parsed.message]);
      }
      else if (parsed.type == "meta") {
         setOnline(Number(parsed.message))
      }
    };

    socket.onclose = () => {
      toast.error("Disconnected from Chat Room 😢");
      setWs(null);
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!ws) {
      return toast.error("Not connected to chat-room! Please reload.");
    }
    if (!input.trim()) {
      return toast.error("Message can't be empty");
    }
    ws.send(JSON.stringify({type:"chat",message:input}));
    setInput("");
  };

  return (
    <div className="flex h-[90vh] w-full items-center justify-center px-6">
      <Card className="flex h-full max-h-[600px] w-full max-w-md flex-col shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Chat Room <p className="text-sm text-green-400">{online} online!</p>
          </CardTitle>
        </CardHeader>

        {/* Messages Area */}
        <CardContent className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-2 pr-2">
            {messages.length === 0 && (
              <p className="text-sm text-muted-foreground text-center">
                No messages yet. Start chatting!
              </p>
            )}
            {messages.map((message, idx) => (
              <div
                key={idx}
                className="rounded-md bg-secondary px-3 py-2 text-sm"
              >
                {message.split(":")[0] == user?.username ? <span className="text-green-500">{message}</span>:<span>{message}</span>}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input fixed at bottom */}
          <div className="mt-4 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChatRoom;
