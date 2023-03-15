export const metadata = {
  title: 'OpenAiDemoApp',
  description: 'This is make for fun & practice! enjoy!',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
