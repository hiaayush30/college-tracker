"use client"

import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import axios from "axios"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

// Fix type for style
const syntaxStyle = oneDark as { [key: string]: React.CSSProperties }

function NotesGeneratorPage() {
  const [topic, setTopic] = useState("")
  const [subject, setSubject] = useState("")
  const [notes, setNotes] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const handleGenerateNotes = async () => {
    if (!topic || !subject) return
    setLoading(true)
    setNotes("")

    try {
      const { data } = await axios.post<{ result: string }>(
        process.env.NEXT_PUBLIC_BE_URL + "/api/gemini/notes",
        { topic, subject },
        { withCredentials: true }
      )
      setNotes(data.result)
    } catch (error) {
      console.error(error)
      setNotes("⚠️ Something went wrong while generating notes.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notes Generator</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="my-2" htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
              />
            </div>
            <div>
              <Label className="my-2" htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter topic"
              />
            </div>
            <Button className="cursor-pointer" onClick={handleGenerateNotes} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Generate Notes"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {notes && (
        <Card>
          <CardContent className="prose dark:prose-invert max-w-none overflow-x-auto">
            <div className="break-words whitespace-pre-wrap">
              <ReactMarkdown
                components={{
                  code({
                    inline,
                    className,
                    children,
                    ...props
                  }: {
                    inline?: boolean
                    className?: string
                    children?: React.ReactNode
                  }) {
                    const match = /language-(\w+)/.exec(className || "")
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={syntaxStyle}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {notes}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default NotesGeneratorPage
