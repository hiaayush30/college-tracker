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
import { Edit, Loader2, Trash2 } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
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
function ViewAssignment() {
  const router = useRouter();
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
      toast("Assignment deleted!")
    } catch (err) {
      toast("Failed to delete assignment")
    }
  }
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <span>Assignments</span>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {/* Program filter */}
            <select
              className="border rounded px-2 py-1 text-sm w-full sm:w-auto"
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
            >
              <option value="">All Programs</option>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
            </select>
            {/* Semester filter */}
            <select
              className="border rounded px-2 py-1 text-sm w-full sm:w-auto"
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
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>A list of all assignments.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">Subject</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Program</TableHead>
                  <TableHead className="hidden md:table-cell">Semester</TableHead>
                  <TableHead className="hidden sm:table-cell">Due Date</TableHead>
                  <TableHead>File</TableHead>
                  {user?.role === "admin" && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.map((a) => (
                  <TableRow
                    key={a._id}
                    className="cursor-pointer"
                    onClick={() => router.push("/dashboard/view/" + a._id)}
                  >
                    <TableCell className="font-medium">{a.subject}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="secondary">{a.type}</Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{a.program}</TableCell>
                    <TableCell className="hidden md:table-cell">{a.semester}</TableCell>
                    <TableCell className="hidden sm:table-cell">
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
                        <div className="flex gap-2">
                          {/* Edit Button */}
                          <Button
                            className="hover:scale-110 cursor-pointer"
                            variant="outline"
                            size="icon"
                            asChild
                          >
                            <a href={`/assignments/edit/${a._id}`}>
                              <Edit className="w-4 h-4" />
                            </a>
                          </Button>
                          {/* Delete Button */}
                          <Button
                            className="hover:scale-110 cursor-pointer"
                            variant="destructive"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(a._id)
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
export default ViewAssignment