import { loadingLogs, modelLogs } from "../utils/state.ts";

export default function Logs() {
  const donwloadResult = () => {
    const anchorElement = document.createElement("a");
    const file = new Blob([JSON.stringify(modelLogs.value)], {
      type: "text/plain",
    });
    anchorElement.href = URL.createObjectURL(file);
    anchorElement.download = "logs.json";
    anchorElement.click();
    anchorElement.remove();
  };

  return (
    <div class="w-full px-12">
      <div class="w-full bg-white shadow-lg p-12 rounded-lg flex flex-col gap-12">
        <h2 class="text-xl">Log list</h2>

        {loadingLogs.value
          ? "Loading logs. This action may take a few seconds"
          : modelLogs.value.length
          ? (
            <div class="flex flex-col" style={{ gap: "32px" }}>
              <button
                class="rounded bg-neutral-700 text-white font-bold px-4 py-2 hover:bg-neutral-600"
                onClick={donwloadResult}
                style={{ maxWidth: "224px" }}
              >
                Download file
              </button>

              <pre class="">
                <code
                  class="block overflow-x-scroll"
                  style={{whiteSpace: 'pre-wrap'}}
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(modelLogs.value, null, "\t"),
                  }}
                />
              </pre>
            </div>
          )
          : ""}
      </div>
    </div>
  );
}
