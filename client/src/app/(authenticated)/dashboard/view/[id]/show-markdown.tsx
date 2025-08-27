"use client"

import React from "react"
import ReactMarkdown from "react-markdown"
import { Card, CardContent } from "@/components/ui/card"

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <Card className="max-w-2xl mx-auto p-4">
      <CardContent className="prose dark:prose-invert">
        <ReactMarkdown>{content}</ReactMarkdown>
      </CardContent>
    </Card>
  )
}
