import { useCallback, useMemo, useState } from "preact/hooks";

import {
  filterByDateBetween,
  formatDateToInputDate,
  getPastDate,
} from "../utils/date.ts";
import { loadingLogs, type ModelLog, modelLogs } from "../utils/state.ts";

export default function Logs() {
  const [startDate, setStartDate] = useState<Date>(getPastDate({ days: 30 }));
  const [endDate, setEndDate] = useState<Date>(new Date());

  const hasLogs = useMemo<boolean>(() => {
    return !!modelLogs.value.length;
  }, [modelLogs.value.length]);

  const logs = useMemo<ModelLog[]>(() => {
    return modelLogs.value.filter((log) => {
      const logDate = new Date(log.createdDateTime);
      return filterByDateBetween({
        dateToFilter: logDate,
        endDate,
        startDate,
      });
    }).sort((a, b) => {
      const dateA = new Date(a.createdDateTime);
      const dateB = new Date(b.createdDateTime);
      return dateA > dateB ? 1 : 0;
    });
  }, [modelLogs.value, startDate, endDate]);

  const donwloadResult = useCallback((): void => {
    const anchorElement = document.createElement("a");
    const file = new Blob([JSON.stringify(logs)], {
      type: "text/plain",
    });
    anchorElement.href = URL.createObjectURL(file);
    anchorElement.download = "logs.json";
    anchorElement.click();
    anchorElement.remove();
  }, [logs]);

  return (
    <div class="w-full px-12">
      <div class="w-full bg-white shadow-lg p-12 rounded-lg flex flex-col gap-12">
        <h2 class="text-xl">Log list - Sorted by Date</h2>

        {loadingLogs.value
          ? "Loading logs. This action may take a few seconds"
          : hasLogs
          ? (
            <div class="flex flex-col" style={{ gap: "32px" }}>
              <div
                id="filters"
                class="flex flex-row items-center justify-start gap-4"
              >
                <div class="flex flex-col">
                  <label
                    htmlFor="start-date-input"
                    class="text-base text-neutral-800"
                  >
                    Start date
                  </label>
                  <input
                    id="start-date-input"
                    aria-label="start-date-input"
                    type="date"
                    class="px-4 py-2 shadow rounded border border-neutral-100 border-solid"
                    value={formatDateToInputDate(startDate)}
                    onChange={(event) =>
                      setStartDate(new Date(event.currentTarget.value))}
                  />
                </div>

                <div class="flex flex-col">
                  <label
                    htmlFor="end-date-input"
                    class="text-base text-neutral-800"
                  >
                    End date
                  </label>
                  <input
                    id="end-date-input"
                    aria-label="end-date-input"
                    type="date"
                    class="px-4 py-2 shadow rounded border border-neutral-100 border-solid"
                    value={formatDateToInputDate(endDate)}
                    onChange={(event) =>
                      setEndDate(new Date(event.currentTarget.value))}
                  />
                </div>
              </div>

              <button
                id="download-json-button"
                aria-label="download-json-button"
                class="rounded bg-neutral-700 text-white font-bold px-4 py-2 hover:bg-neutral-600"
                onClick={donwloadResult}
                style={{ maxWidth: "224px" }}
              >
                Download logs in JSON
              </button>

              <pre class="">
                <code
                  class="block overflow-x-scroll"
                  style={{whiteSpace: 'pre-wrap'}}
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(logs, null, "\t"),
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
