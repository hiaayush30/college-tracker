"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import { Dispatch, FormEvent, SetStateAction } from 'react';

interface props {
    setUsername: Dispatch<SetStateAction<string>>;
    setPassword: Dispatch<SetStateAction<string>>;
    setEmail: Dispatch<SetStateAction<string>>;
    handleSubmit: (e: FormEvent) => Promise<void>;
    loading: boolean;
}

export default function SignupPage({ handleSubmit, loading, setEmail, setPassword, setUsername }: props) {
    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            <form
                onSubmit={handleSubmit}
                className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
                    <div className="text-center">
                        <Link
                            href="/"
                            aria-label="go home"
                            className="mx-auto block w-fit">
                            {/* <LogoIcon /> */}
                        </Link>
                        <h1 className=" mb-1 mt-4 text-xl font-semibold">Create a College Tracker Account</h1>
                        <p className="text-sm">Welcome! Create an account to get started</p>
                    </div>

                    <div className="mt-6 space-y-6">

                        {/* Username */}
                        <div className="space-y-2">
                            <Label htmlFor="username" className="block text-sm">
                                Username
                            </Label>
                            <Input
                                type="text"
                                required
                                name="username"
                                id="username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="block text-sm">
                                Email
                            </Label>
                            <Input
                                type="email"
                                required
                                name="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-0.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="pwd" className=" text-sm">
                                    Password
                                </Label>
                                <Button asChild variant="link" size="sm">
                                    <Link href="#" className="link intent-info variant-ghost text-sm">
                                        Forgot your Password ?
                                    </Link>
                                </Button>
                            </div>
                            <Input
                                type="password"
                                required
                                name="pwd"
                                id="pwd"
                                className="input sz-md variant-mixed"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Submit */}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Loader className='animate-spin'/> : "Sign Up"}
                        </Button>
                    </div>
                </div>

                <div className="p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Have an account ?
                        <Button asChild variant="link" className="px-2">
                            <Link href="/login">Sign In</Link>
                        </Button>
                    </p>
                </div>
            </form>
        </section>
    )
}
