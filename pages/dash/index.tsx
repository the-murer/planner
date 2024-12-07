import { getSession } from "next-auth/react";

import DefaultLayout from "@/components/default";
import TableComponent from "@/components/table";

const rows = [
  {
    key: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "555-123-4567",
  },
  {
    key: "2",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "555-123-4567",
  },
  {
    key: "3",
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "555-123-4567",
  },
];

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
];

type DashPageProps = {
  user: {
    name: string;
    email: string;
    id: string;
  };
};

export default function DashPage({ user }: DashPageProps) {
  return (
    <DefaultLayout user={user}>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <img alt="Logo" className="w-132" src="/planner.png" />
        <div className="text-center">
          <h1 className="text-[3rem] lg:text-5xl font-semibold tracking-tight">
            Seja bem vindo <span className="uppercase">{user.name}</span>
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl">
          {/* Left Panel - Reuniões */}
          <div className="flex-1 p-6 rounded-lg shadow-md">
            <h2 className="text-center text-lg font-medium mb-4">
              3 Reuniões marcadas
            </h2>
            <div className="overflow-hidden rounded-md">
              <TableComponent columns={columns} rows={rows} />
            </div>
          </div>
          {/* Right Panel - Formulários */}
          <div className="flex-1 p-6 rounded-lg shadow-md">
            <h2 className="text-center text-lg font-medium mb-4">
              2 Formulários pendentes
            </h2>
            <div className="overflow-hidden rounded-md">
              <TableComponent columns={columns} rows={rows} />
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}
