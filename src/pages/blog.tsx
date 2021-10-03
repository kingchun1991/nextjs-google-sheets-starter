import { GetStaticProps } from "next"
import Card from "components/layout/Card"


function Blog(props: any) {
    return (
      <ul>
        {props.records.map((record: any) => {     
        //    console.log("Entered");                 
           // Return the element. Also pass key     
           return (<Card title={record.title_en} imgSrc={record.imgSrc}/>) 
        })}
      </ul>
    )
  }

export const getStaticProps: GetStaticProps = async (context) => {
    // const { slug } = context.params as IParams // no longer causes error
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTMf21Q2u8IXza55EClr4tlEn-hpHwoyZGxqS1Wy9xfjDRF5fy0MGjice0i2ONIaoIdp72pHQem7O6Z/pub?gid=0';
    // const props = fetch(url + '&single=true&output=csv&headers=0')
    const csv = '&single=true&output=csv&headers=0';
    const skipFirstRow = '&range=A2:ZZ';
    const result = await fetch(url + csv + skipFirstRow);
    const data = await result.text();
    const csv2json = require("csvtojson");
    const records = await csv2json().fromString(data);
    // console.log(data)
    // console.log(props)
    // console.log(records)
    return { props: { records }}
}



export default Blog