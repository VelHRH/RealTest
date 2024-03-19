import { cookies } from "next/headers";

export const getTest = async (id: string) => {
  const res = await fetch(`${process.env.API_HOST}/test/${id}`, {
    cache: "no-store",
    headers: {
      Cookie: `COOKIE_AUTH=${cookies().get("COOKIE_AUTH")?.value}`,
    },
  });
  return (await res.json()) as ITest;
};

export const getTestsByProduct = async (id: string) => {
  const res = await fetch(`${process.env.API_HOST}/test/getByProduct/${id}`, {
    headers: {
      Cookie: `COOKIE_AUTH=${cookies().get("COOKIE_AUTH")?.value || ""}`,
    },
    cache: "no-store",
  });
  return (await res.json()) as ITest[] | { error: string };
};

export const getResults = async (id: string) => {
  const res = await fetch(`${process.env.API_HOST}/test/${id}/result`, {
    headers: {
      Cookie: `COOKIE_AUTH=${cookies().get("COOKIE_AUTH")?.value}`,
    },
    cache: "no-store",
  });
  return await res.json();
};

export const getTests = async () => {
  const res = await fetch(`${process.env.API_HOST}/test`, {
    headers: {
      Cookie: `COOKIE_AUTH=${cookies().get("COOKIE_AUTH")?.value}`,
    },
  });
  return (await res.json()) as ITest[];
};

export const getBinomial = async (id: string, people: string) => {
  const params = new URLSearchParams();
  params.append("peopleNumber", people);
  const res = await fetch(
    `${process.env.API_HOST}/test/${id}/binomial?${params.toString()}`,
    {
      headers: {
        Cookie: `COOKIE_AUTH=${cookies().get("COOKIE_AUTH")?.value}`,
      },
    }
  );
  return await res.json();
};
