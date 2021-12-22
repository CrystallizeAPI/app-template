import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

import fetchFromPIM from "~/lib/crystallize.server";
import { NavBar } from "~/components/navbar";

export const loader: LoaderFunction = async () => {
  const { data } = await fetchFromPIM({
    query: `
    {
      me {
        id
        firstName
        lastName
        tenants {
          role
          tenant {
            id
            identifier
          }
        }
      }
    }
    `,
  });
  return data.me;
};

export default function Dashboard() {
  const me = useLoaderData();

  return (
    <div>
      <NavBar title="Dashboard" />
      <div className="mx-auto max-w-3xl p-6">
        <h2 className="mb-6 text-xl">
          Hi {me.firstName} {me.lastName}
        </h2>

        {me.tenants.length === 0 ? (
          "You don't have access to any tenants. How sad 😢"
        ) : (
          <div>
            You've got access to {me.tenants.length} tenants. Awesome! 🤘 Check
            them out:
            <ul className="list-none p-0 m-0 mt-3 flex gap-3 flex-wrap">
              {me.tenants.map((tenant: any) => (
                <li key={tenant.tenant.identifier} className="m-0 p-0">
                  <a href={`/fulfilment?tenantId=${tenant.tenant.id}`}>
                    {tenant.tenant.identifier}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
