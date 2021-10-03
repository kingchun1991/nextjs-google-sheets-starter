import { Box } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";

import CTASection from "components/CTASection";
import SomeImage from "components/SomeImage";
import SomeText from "components/SomeText";

const csv2json = require("csvtojson");

interface IParams extends ParsedUrlQuery {
  id: string;
}

const Post = (props: any) => {
  // console.log(props)
  const data = props;
  // console.log(data)
  return (
    <Box mb={8} w="full">
      {data.record[0].title_en}
      <SomeText />
      {data.record[0].detail_en}
      <SomeImage />
      <CTASection />
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMf21Q2u8IXza55EClr4tlEn-hpHwoyZGxqS1Wy9xfjDRF5fy0MGjice0i2ONIaoIdp72pHQem7O6Z/pub?gid=0";

  const csv = "&single=true&output=csv&headers=0";
  const skipFirstRow = "&range=A2:ZZ";
  const result = await fetch(url + csv + skipFirstRow);
  const data = await result.text();
  const records = await csv2json().fromString(data);
  // console.log(records);
  const record = records.filter((r: any) => r.id === id);
  // console.log(record);
  return { props: { record } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMf21Q2u8IXza55EClr4tlEn-hpHwoyZGxqS1Wy9xfjDRF5fy0MGjice0i2ONIaoIdp72pHQem7O6Z/pub?gid=0";

  const csv = "&single=true&output=csv&headers=0";
  const skipFirstRow = "&range=A2:ZZ";
  const result = await fetch(url + csv + skipFirstRow);
  const data = await result.text();
  const records = await csv2json().fromString(data);

  const paths = records.map((record: any) => ({
    params: { id: record.id },
  }));
  return { paths, fallback: "blocking" };
};

export default Post;
