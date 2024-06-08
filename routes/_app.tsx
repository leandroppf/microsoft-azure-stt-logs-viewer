import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html lang="en-US">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Loads Microsoft STT Logs" />
        <title>Microsoft STT Logs</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="bg-neutral-100">
        <Component />
      </body>
    </html>
  );
}
