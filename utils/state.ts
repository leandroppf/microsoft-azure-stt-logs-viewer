import { signal } from "@preact/signals";

export type ModelLog = {
  self: string;
  name: string;
  kind: string;
  properties: { size: number };
  createdDateTime: string;
  links: { contentUrl: string };
};

export const serviceRegion = signal<string>("");
export const endpointId = signal<string>("");
export const subscriptionKey = signal<string>("");

export const modelLogs = signal<ModelLog[]>([]);
export const loadingLogs = signal<boolean>(false);
