import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

import fetchFromPIM from "~/lib/crystallize.server";
import { NavBar } from "~/components/navbar";

function PrettyDate({ date }: { date: string }) {
  return <time>{new Date(date).toDateString()}</time>;
}

function PrettyMoney({
  currency = "EUR",
  gross,
}: {
  currency: string;
  gross: number;
}) {
  return (
    <span>
      {new Intl.NumberFormat("en-UK", { style: "currency", currency }).format(
        gross || 0
      )}
    </span>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const tenantId = url.searchParams.get("tenantId");

  const { data } = await fetchFromPIM({
    query: `
    query GET_FIRST_PIPELINE ($tenantId: ID!){
      pipeline {
        getMany (first: 1, tenantId: $tenantId) {
          edges {
            node {
              name
              id
              stages {
                id
                name
                orders {
                  edges {
                    node {
                      createdAt
                      total {
                        gross
                        currency
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
    variables: {
      tenantId,
    },
  });

  const firstPipeline = data?.pipeline?.getMany?.edges?.[0]?.node;

  return {
    tenantId,
    name: firstPipeline?.name,
    stages: firstPipeline?.stages,
  };
};

export default function Fulfilment() {
  const data = useLoaderData();

  return (
    <div>
      <NavBar title={data?.name} />
      {!data.stages ? (
        <div className="p-6 text-center">
          You have not setup any fulfilment pipelines yet
        </div>
      ) : (
        <ul className="list-none p-0 m-0 flex items-stretch justify-items-stretch min-h-screen">
          {data.stages.map((stage: any) => (
            <li
              key={stage.id}
              className="grow m-0 p-0 border-l-2 border-l-purple first:border-l-0"
            >
              <div className="bg-purple text-white text-center p-2">
                {stage.name}
              </div>
              {stage.orders?.edges?.map((edge: any) => (
                <div
                  key={edge.node.createdAt}
                  className="m-2 p-2 bg-purple-light rounded flex justify-between"
                >
                  <PrettyDate date={edge.node.createdAt} />
                  <PrettyMoney {...edge.node.total} />
                </div>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
