import { getSession } from "next-auth/react";

export default function ProtectedPage() {
  // Page content
}

// Redirect unauthenticated users
export async function getServerSideProps(context) {
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
    props: {},
  };
}
