import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import 'dayjs/locale/he'
import ContextWrapper from './context/ContextWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
dayjs.locale('he')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ContextWrapper>
    <html lang="he" dir="rtl">
      <body className={inter.className}>{children}</body>
    </html>
    </ContextWrapper>
  )
}
