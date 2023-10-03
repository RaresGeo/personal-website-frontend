import Image from "next/image";
import { Inter } from "next/font/google";
import client from "@/libs/apollo";
import { GET_INTRODUCTION } from "@/graphql/queries/introduction";
import { Introduction, IntroductionEntityResponse } from "@/generated/graphql";
import { Maybe } from "graphql/jsutils/Maybe";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  introduction: Introduction | null;
};

export default function Home({ introduction }: Props) {
  console.log(introduction);

  return !introduction ? (
    <h1 className="text-xl font-bold mb-2 text-center">Not found</h1>
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-5/12">
        <div className="flex items-center justify-center mb-4">
          <Image
            src={
              introduction.avatar?.data?.attributes?.url
                ? process.env.NEXT_PUBLIC_STRAPI_URL +
                  introduction.avatar.data.attributes.url
                : ""
            }
            alt={introduction.fullName}
            width={100}
            height={100}
            className="rounded-full w-32"
          />
        </div>
        <h1 className="text-xl font-bold mb-2 text-center">
          {introduction.fullName}
        </h1>
        <p className="text-gray-700 text-center">{introduction.description}</p>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = (await client.query({
    query: GET_INTRODUCTION,
  })) as {
    data: {
      introduction: Maybe<IntroductionEntityResponse>;
    };
  };

  const introduction = data.introduction?.data?.attributes;

  return { props: { introduction } };
}
