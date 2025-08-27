"use client"

import React, { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { Bot } from "lucide-react"
import MarkdownRenderer from "./show-markdown"

export interface IAssignment {
    _id: string
    type: string
    subject: string
    due: string
    program: string
    semester: string
    url?: string | null
    createdAt: string
    updatedAt: string
    createdBy: string
}

interface AssignmentPageProps {
    params: { id: string }
}

export default function AssignmentPage({ params }: AssignmentPageProps) {
    const [assignment, setAssignment] = useState<IAssignment | null>(null)
    const [loading, setLoading] = useState(true)
    const [prompt, setPrompt] = useState("")
    const [aiResponse, setAiResponse] = useState<string | null>(null)
    const [sending, setSending] = useState(false)

    useEffect(() => {
        async function fetchAssignment() {
            try {
                const { data } = await axios.get<{ assignment: IAssignment }>(
                    `${process.env.NEXT_PUBLIC_BE_URL}/assignment/${params.id}`
                )
                setAssignment(data.assignment)
            } catch (error) {
                setAssignment(null)
            } finally {
                setLoading(false)
            }
        }
        fetchAssignment()
    }, [params.id])

    const askChatGPT = async () => {
        if (!assignment?.url) return
        setSending(true)
        setAiResponse(null)

        try {
            const { data } = await axios.post<{ result: string }>(
                process.env.NEXT_PUBLIC_BE_URL + "/api/gemini/process-assignment", // <-- Your Next.js route
                {
                    s3Url: assignment.url,
                    prompt,
                }
            )
            setAiResponse(data.result)
        } catch (error) {
            setAiResponse("Failed to get response from Gemini.")
        } finally {
            setSending(false)
        }
    }

    if (loading) {
        return <p className="text-center mt-10">Loading assignment...</p>
    }

    if (!assignment) {
        return (
            <div className="max-w-2xl mx-auto mt-10">
                <Card className="border-red-500">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-red-600">
                            Assignment not found
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            We couldn’t fetch the assignment details. It may have been deleted
                            or the link is invalid.
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                        {assignment.subject} — <Badge>{assignment.type}</Badge>
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3 text-sm">
                    <p>
                        <span className="font-semibold">Due:</span>{" "}
                        {new Date(assignment.due).toLocaleDateString()}
                    </p>
                    <p>
                        <span className="font-semibold">Program:</span> {assignment.program}
                    </p>
                    <p>
                        <span className="font-semibold">Semester:</span> {assignment.semester}
                    </p>
                    <p>
                        <span className="font-semibold">Created At:</span>{" "}
                        {new Date(assignment.createdAt).toLocaleString()}
                    </p>
                    <p>
                        <span className="font-semibold">Updated At:</span>{" "}
                        {new Date(assignment.updatedAt).toLocaleString()}
                    </p>

                    {assignment.url && (
                        <div className="pt-4 flex gap-2">
                            <Button asChild variant="outline">
                                <a
                                    href={assignment.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    📄 View PDF
                                </a>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* ChatGPT section */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        Ask ChatGPT about this file
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Input
                        placeholder="Enter your query regarding the file..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={!assignment.url}
                    />
                    <Button
                        className="cursor-pointer"
                        onClick={askChatGPT}
                        disabled={!assignment.url || sending}
                    >
                        {sending ? <>Asking... <Bot className="animate-spin"/></> : <> Ask Gemini <Bot /></>}
                    </Button>

                    {aiResponse && (
                        <div className="mt-3 p-3 border rounded-md bg-muted text-sm">
                            <strong>AI Response:</strong>
                            <MarkdownRenderer content={aiResponse}/>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
