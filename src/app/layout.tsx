export const metadata = {
  title: 'OpenAiDemoApp',
  description: 'This is make for fun & practice! enjoy!',
}
import ClientRoot from "./components/ClientRoot"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <ClientRoot>
          {children}
        </ClientRoot>
      </body>
    </html>
  )
}
