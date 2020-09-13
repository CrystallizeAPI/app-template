import useSWR from 'swr';

import Nav from 'components/nav';

export default function Dashboard() {
  const { data: me } = useSWR(`
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
  `);

  return (
    <div>
      <Nav />
      <div className="p-10">
        <h2 className="text-2xl text-accent-1">Hello</h2>
        <pre>{JSON.stringify(me, null, 2)}</pre>
      </div>
    </div>
  );
}
