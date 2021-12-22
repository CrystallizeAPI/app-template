import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import fetchFromPIM from "~/lib/crystallize.server";

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
      <nav className="navbar p-6 bg-purple text-white flex justify-between items-center">
        <a href="/">
          <img
            src="/crystallize_logo_white.svg"
            alt="Crystallize logo"
            width="106"
            height="36"
          />
        </a>
        <div>
          <h1 className="text-3xl">Dashboard</h1>
        </div>
        <div>
          <a href="/">Log out</a>
        </div>
      </nav>
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
                <li key={tenant.tenant.identifier} className="appearance-none">
                  {tenant.tenant.identifier}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
