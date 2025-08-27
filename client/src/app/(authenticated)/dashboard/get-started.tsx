"use client"
import { translations } from '@/lib/translations'
import { useLanguageStore } from '@/store/useLanguageStore'
import { Cross, Eye, MessageSquareDot } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

interface ICard {
    title: string
    href: string
    logo: ReactNode
}

export default function GetStarted() {
    const { language } = useLanguageStore();
    const t = translations[language];
    const cardArray: ICard[] = [
        { href: "/dashboard/add", logo: <Cross size={24} aria-hidden />, title: t.addAssignments },
        { href: "/dashboard/view", logo: <Eye size={24} aria-hidden />, title: t.viewAssignments },
        { href: "/dashboard/chat", logo: <MessageSquareDot size={24} aria-hidden />, title: t.globalChatroom },
    ]

    return (
        <section className="w-full bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
            <div className="mx-auto max-w-6xl px-6 text-center">
                {/* Heading */}
                <div>
                    <h2 className="text-4xl font-semibold lg:text-5xl">{t.getStarted}</h2>
                    <p className="mt-4">{t.whatToDo}</p>
                </div>

                {/* Cards Grid */}
                <div className="mt-10 flex md:flex-row flex-col items-center justify-center gap-8">
                    {cardArray.map((card) => (
                        <Link
                            href={card.href}
                            key={card.title}
                            className="cursor-pointer hover:scale-110 transition-all border border-slate-400 py-6 px-8 rounded-lg flex flex-col items-center w-60 shadow-md"
                        >
                            <CardDecorator>{card.logo}</CardDecorator>
                            <h3 className="mt-4 text-lg font-medium">{card.title}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="relative mx-auto size-36 duration-200">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
        />
        <div aria-hidden className="bg-radial to-background absolute inset-0 from-transparent to-75%" />
        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
            {children}
        </div>
    </div>
)
