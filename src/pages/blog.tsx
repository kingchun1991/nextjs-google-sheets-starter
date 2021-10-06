import { GetStaticProps } from "next";
// import Card from "components/layout/Card";
import Card2 from "components/layout/Card2";
import { SimpleGrid } from "@chakra-ui/react";

const csv2json = require("csvtojson");

function Blog(props: any) {
  const data = props;
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing="40px">
      {/* <Card2 /> */}
      {data.records.map((record: any) => {
        // console.log(record.id);
        // Return the element. Also pass key
        return (
          <Card2
            key={record.id}
            title={record.title_en}
            imgSrc={record.imgSrc}
            url={record.id}
          />
        );
      })}
    </SimpleGrid>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMf21Q2u8IXza55EClr4tlEn-hpHwoyZGxqS1Wy9xfjDRF5fy0MGjice0i2ONIaoIdp72pHQem7O6Z/pub?gid=0";
  const csv = "&single=true&output=csv&headers=0";
  const skipFirstRow = "&range=A2:ZZ";
  const result = await fetch(url + csv + skipFirstRow);
  const data = await result.text();
  const records = await csv2json().fromString(data);
  return { props: { records } };
};

export default Blog;
