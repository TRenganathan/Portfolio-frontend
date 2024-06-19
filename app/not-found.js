import Link from "next/link";
import { headers } from "next/headers";

export default async function NotFound() {
  const headersList = headers();
  const domain = headersList.get("host");

  return (
    <div className="absolute top-0 bottom-0 m-auto flex-column left-0 right-0 p-10 h-max">
      <p className="text-center font-semibold text-md">
        Could not find requested resource in this Domain: {domain}
      </p>
      <button className="bg-purple text-white font-bold m-auto w-max block space-x-4 space-y-2 p-4 rounded mt-4">
        <Link href="/">Back to Home Page</Link>
      </button>
    </div>
  );
}
