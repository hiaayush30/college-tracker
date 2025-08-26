import z from "zod";

export enum ProgramEnum {
    BCA = "BCA",
    BBA = "BBA"
}

export enum SemesterEnum {
    I = "I",
    II = "II",
    III = "III",
    IV = "IV",
    V = "V",
    VI = "VI",
    VII = "VII",
    VIII = "VIII"
}

export const addAssignmentSchema = z.object({
    type: z.string(),
    subject: z.string(),
    due: z.date(),
    program: z.enum(ProgramEnum),
    semester: z.enum(SemesterEnum),
    url: z.string().optional()
})

export const updateAssignmentSchema = z.object({
    id: z.string(),
    type: z.string().optional(),
    subject: z.string().optional(),
    due: z.date().optional(),
    program: z.enum(ProgramEnum).optional(),
    semester: z.enum(SemesterEnum).optional(),
    url: z.string().optional(),
})