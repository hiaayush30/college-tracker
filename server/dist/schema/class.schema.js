import z from "zod";
export const addClassSchema = z.object({
    name: z.string().min(1, "Class name is required"),
});
export const updateClassSchema = z.object({
    name: z.string().optional()
});
//# sourceMappingURL=class.schema.js.map