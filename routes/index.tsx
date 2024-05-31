import Form from "../islands/form.tsx";
import Logs from "../islands/logs.tsx";

export default function Home() {
  return (
    <div>
      <header class="bg-neutral-700 h-40 flex items-center justify-center">
        <h1 class="text-4xl font-bold text-white">
          Microsoft Azure STT Logs Viewer
        </h1>
      </header>

      <Form />

      <Logs />
    </div>
  );
}
