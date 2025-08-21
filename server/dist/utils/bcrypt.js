import bcrypt from "bcryptjs";
export const hashPassword = async (string) => {
    const hashed = await bcrypt.hash(string, 5);
    return hashed;
};
export const comparePassword = async (password, hash) => {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
};
//# sourceMappingURL=bcrypt.js.map