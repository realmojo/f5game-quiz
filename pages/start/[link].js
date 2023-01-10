import { Layout } from "antd";
import axios from "axios";
import { HeadComponent } from "../../components/Head";

export default function Start({ item }) {
  return (
    <>
      <HeadComponent item={item} />
      <main>
        {/* <Header /> */}
        <Layout>{item.title}</Layout>
      </main>
    </>
  );
}

export const getServerSideProps = async ({ req, params }) => {
  const { link } = params;
  const res = await axios.get(
    `${process.env.BASE_API_URL}/test/getTestByLink.php?link=${link}`
  );
  return { props: { item: res.data, NODE_ENV: process.env.NODE_ENV } };
};
