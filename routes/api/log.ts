import { Handlers } from "$fresh/server.ts";

import { ModelLog } from "../../utils/state.ts";

export const handler: Handlers<ModelLog | null> = {
  async GET(request, _context) {
    const requestUrl = new URL(request.url);
    const serviceRegion = requestUrl.searchParams.get("serviceRegion");
    const endpointId = requestUrl.searchParams.get("endpointId");
    const subscriptionKey = requestUrl.searchParams.get("subscriptionKey");

    if (!serviceRegion || !endpointId || !subscriptionKey) {
      return new Response(
        "Check if all parameters have a value: serviceRegion | endpointId | subscriptionKey",
        {
          status: 400,
        },
      );
    }

    const url =
      `https://${serviceRegion}.api.cognitive.microsoft.com/speechtotext/v3.2-preview.2/endpoints/${endpointId}/files/logs`;

    const apiResponse = await fetch(url, {
      headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
    });
    const jsonResponse = await apiResponse.json();

    return new Response(JSON.stringify(jsonResponse));
  },
};
