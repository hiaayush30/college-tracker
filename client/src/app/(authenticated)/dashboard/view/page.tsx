"use client"

import React, { useEffect, useState } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, Trash2 } from "lucide-react"
import axios from "axios"

interface IAssignment {
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

function ViewAssignment() {
  const { user } = useAuthStore()
  const [assignments, setAssignments] = useState<IAssignment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // sorting state
  const [programFilter, setProgramFilter] = useState<string>("")
  const [semesterFilter, setSemesterFilter] = useState<string>("")

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true)
        const res = await axios.get<{ assignments: IAssignment[] }>(
          process.env.NEXT_PUBLIC_BE_URL + "/assignment",
          { withCredentials: true }
        )
        setAssignments(res.data.assignments)
      } catch (err) {
        setError("failed to fetch assignments")
      } finally {
        setLoading(false)
      }
    }
    fetchAssignments()
  }, [])

  // filter assignments
  const filteredAssignments = assignments.filter((a) => {
    return (
      (programFilter ? a.program === programFilter : true) &&
      (semesterFilter ? a.semester === semesterFilter : true)
    )
  })

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this assignment?")) return
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BE_URL}/assignment/${id}`,
        { withCredentials: true }
      )
      setAssignments((prev) => prev.filter((a) => a._id !== id))
    } catch (err) {
      alert("Failed to delete assignment")
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex justify-between items-center">
          <span>Assignments</span>
          <div className="flex gap-2">
            {/* Program filter */}
            <select
              className="border rounded px-2 py-1 text-sm"
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
            >
              <option value="">All Programs</option>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
            </select>

            {/* Semester filter */}
            <select
              className="border rounded px-2 py-1 text-sm"
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
            >
              <option value="">All Semesters</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
              <option value="VI">VI</option>
              <option value="VII">VII</option>
              <option value="VIII">VIII</option>
            </select>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-6">
            <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredAssignments.length === 0 ? (
          <p className="text-muted-foreground">No assignments found.</p>
        ) : (
          <Table>
            <TableCaption>A list of all assignments.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>File</TableHead>
                {user?.role === "admin" && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.map((a) => (
                <TableRow key={a._id}>
                  <TableCell className="font-medium">{a.subject}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{a.type}</Badge>
                  </TableCell>
                  <TableCell>{a.program}</TableCell>
                  <TableCell>{a.semester}</TableCell>
                  <TableCell>
                    {new Date(a.due).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {a.url ? (
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View File
                      </a>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  {user?.role === "admin" && (
                    <TableCell>
                      <Button
                      className="hover:scale-110 cursor-pointer"
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(a._id)}
                      >
                        <Trash2 />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

export default ViewAssignment
