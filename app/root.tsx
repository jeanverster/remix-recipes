import { Clipboard, Home } from "react-feather";
import { NavLink } from "react-router-dom";
import type { LinksFunction } from "remix";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import globalStyles from "./styles/global.css";
import styles from "./tailwind.css";

// https://remix.run/api/app#links
export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: globalStyles },
  ];
};

const NAV_LINKS = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/recipes",
    label: "Recipes",
    icon: Clipboard,
  },
];

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 h-screen bg-zinc-900 text-white">
      <nav
        aria-label="Main navigation"
        className="h-full content-start flex items-center top-0 left-0 z-50 px-1 bg-cyan-800"
      >
        <ul className="flex flex-col mb-auto pt-4">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <NavLink key={href} to={href}>
              <li className="flex items-center px-4 py-1 bg-slate-800 hover:bg-cyan-900 rounded mx-2 mb-2">
                <Icon className="w-4 h-4 mr-2" />
                <span>{label}</span>
              </li>
            </NavLink>
          ))}
        </ul>
      </nav>
      {children}
    </div>
  );
}
