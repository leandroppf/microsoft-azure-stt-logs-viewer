import { IS_BROWSER } from "$fresh/runtime.ts";
import { JSX } from "preact";

import Input from "../components/Input.tsx";
import {
  endpointId,
  loadingLogs,
  ModelLog,
  modelLogs,
  serviceRegion,
  subscriptionKey,
} from "../utils/state.ts";

export default function Form() {
  if (!IS_BROWSER) return <></>;

  const onSubmit = async (event: JSX.TargetedSubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      loadingLogs.value = true;

      const response = await fetch(
        [
          "/api/log?serviceRegion=",
          serviceRegion,
          "&endpointId=",
          endpointId,
          "&subscriptionKey=",
          subscriptionKey,
        ].join(""),
      );
      const jsonResponse = await response.json();
      modelLogs.value = jsonResponse.values as ModelLog[];
    } catch (error) {
      console.error(error);
    } finally {
      loadingLogs.value = false;
    }
  };

  return (
    <form
      onSubmit={(event) => onSubmit(event)}
      class="flex xl:flex-row flex-col gap-6 px-12 py-8 xl:items-end items-center justify-center"
    >
      <Input
        label="Service region"
        value={serviceRegion.value}
        onChange={(event) => (serviceRegion.value = event.currentTarget.value)}
        required
      />
      <Input
        label="Endpoint ID"
        value={endpointId.value}
        onChange={(event) => (endpointId.value = event.currentTarget.value)}
        required
      />
      <Input
        label="Subscription Key"
        value={subscriptionKey.value}
        onChange={(
          event,
        ) => (subscriptionKey.value = event.currentTarget.value)}
        required
      />

      <button
        type="submit"
        class="rounded bg-neutral-700 text-white font-bold px-4 py-2 hover:bg-neutral-600"
      >
        Search Models
      </button>
    </form>
  );
}
