import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import axios from "axios"

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

// Server fetch
async function getAssignment(id: string): Promise<IAssignment | null> {
  try {
    const { data } = await axios.get<{ assignment: IAssignment }>(
      `${process.env.NEXT_PUBLIC_BE_URL}/assignments/${id}`
    )
    return data.assignment
  } catch (error) {
    return null
  }
}

export default async function AssignmentPage({ params }: AssignmentPageProps) {
  const assignment = await getAssignment(params.id)

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
    <div className="max-w-2xl mx-auto mt-10">
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
            <span className="font-semibold">Created By:</span> {assignment.createdBy}
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
            <div className="pt-4">
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
    </div>
  )
}
