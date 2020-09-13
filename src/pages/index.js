import Link from 'next/link';

import Nav from 'components/nav';

export default function IndexPage() {
  return (
    <div>
      <Nav />
      <div className="py-20">
        <h1 className="text-5xl text-center text-accent-1">PIM app</h1>
      </div>
      <div className="text-center text-xl">
        {/* Firebase auth here */}
        <Link href="/dashboard">
          <a>Login</a>
        </Link>
      </div>
    </div>
  );
}
