"use client"

import React from "react"
import ReactMarkdown from "react-markdown"
import { Card, CardContent } from "@/components/ui/card"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

const syntaxStyle = oneDark as { [key: string]: React.CSSProperties }

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <Card className="max-w-2xl mx-auto p-4">
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
            {content}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  )
}
