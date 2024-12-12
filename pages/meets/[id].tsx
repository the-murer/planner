"use server";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "@nextui-org/react";

import DefaultLayout from "@/components/default";
import { LoadComponent } from "@/components/loadComponent";
import { Meet } from "@/types";
import { Timer } from "@/components/timer";

type MeetsPageProps = {
  user: {
    name: string;
    email: string;
    id: string;
  };
};

export default function MeetsPage({ user }: MeetsPageProps) {
  const [loading, setLoading] = useState(true);
  const [forms, setForms] = useState(undefined);
  const [meet, setMeet] = useState<Meet | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const fetchMeet = async () => {
      const response = await fetch(`/api/meet/${router.query.id}`, {
        method: "GET",
      });

      const resp = await response.json();

      setMeet(resp.meet);

      setLoading(false);
    };

    const fetchForms = async () => {
      const response = await fetch(`/api/form/${router.query.id}`, {
        method: "GET",
      });

      const resp = await response.json();

      console.log("🚀 ~ fetchForms ~ response => ", resp);

      // console.log("🚀 ~ resp => ", resp);
      // setForms(resp.forms);
    };

    fetchMeet();
    fetchForms();
  }, [router.query.id]);

  if (loading) {
    return <LoadComponent />;
  }

  if (!meet) {
    return <div>Meet not found</div>;
  }

  return (
    <DefaultLayout user={user}>
      <h1 className="text-[3rem] lg:text-5xl font-semibold tracking-tight">
        {meet.name}
        <Timer />
      </h1>

      <section className="flex flex-row w-100%">
        <div className="mt-10 w-30%">
          {meet.squads.map((squad) => (
            <Card key={squad} className="sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 p-4">
              {squad}
            </Card>
          ))}
        </div>
        <div className="mt-10 w-70%">
          <Card className="mt-10 w-70%">
            <h2 className="text-center text-lg font-medium mb-4">teste</h2>
          </Card>
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

  const user = session.user as any;

  return {
    props: {
      user,
    },
  };
}
