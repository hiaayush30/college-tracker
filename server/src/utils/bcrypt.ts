import bcrypt from "bcryptjs";


export const hashPassword = async (string: string) => {
    const hashed = await bcrypt.hash(string, 5);
    return hashed
}

export const comparePassword = async (password: string, hash: string) => {
    const isValid = await bcrypt.compare(password, hash)
    return isValid;
}
