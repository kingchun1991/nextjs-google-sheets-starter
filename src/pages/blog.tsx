import type { GetStaticProps } from "next";
// import Card from "components/layout/Card";
import Card2 from "lib/components/layout/Card2";
import { SimpleGrid } from "@chakra-ui/react";
import getData from "lib/data/googleSheet";

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
  const records = await getData();
  return { props: { records } };
};

export default Blog;
