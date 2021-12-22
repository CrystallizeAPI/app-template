interface APIResponse {
  data?: any;
  errors?: any[];
}

interface IProps {
  query: string;
  variables?: Record<string, any>;
}

export default function fetchFromPIM(props: IProps): Promise<APIResponse> {
  return fetch("https://pim.crystallize.com/graphql", {
    method: "post",
    // @ts-expect-error
    headers: {
      "content-type": "application/json",
      "X-Crystallize-Access-Token-Id": process.env.CRYSTALLIZE_ACCESS_TOKEN_ID,
      "X-Crystallize-Access-Token-Secret":
        process.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET,
    },
    body: JSON.stringify(props),
  }).then((r) => r.json());
}
