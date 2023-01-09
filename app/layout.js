export default function RootLayout({ children }) {
  console.log(children);
  return (
    <html>
      <head>
        <title>퀴즈 심리 테스트 - F5 Games</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
