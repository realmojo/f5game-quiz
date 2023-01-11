import Head from "next/head";
import { Layout, Card, Col, Row } from "antd";
import { Header } from "../components/Header";
import Link from "next/link";
import axios from "axios";

const { Meta } = Card;

export default function Home({ items, NODE_ENV }) {
  return (
    <>
      <Head>
        <title>테스트팡 - 심심할 땐 재미있는 테스트들을 즐겨보세요.</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="테스트팡의 모든 테스트들은 무료로 즐길 수 있습니다. 드라마, 연예, 방송 등 다양한 테스트를 즐겨보세요."
        />
        <meta name="theme-color" content="#338ff1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="canonical" href="https://test.f5game.co.kr" />
        <meta
          name="title"
          content="테스트팡 - 심심할 땐 재미있는 테스트들을 즐겨보세요."
        />
        <meta name="plink" content="https://test.f5game.co.kr" />
        <meta
          name="description"
          content="테스트팡의 모든 테스트들은 무료로 즐길 수 있습니다. 드라마, 연예, 방송 등 다양한 테스트를 즐겨보세요."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://test.f5game.co.kr" />
        <meta property="og:article:author" content="F5game" />
        <meta property="og:site_name" content="테스트팡" />
        <meta
          property="og:title"
          content="테스트팡 - 심심할 땐 재미있는 테스트들을 즐겨보세요."
        />
        <meta
          property="og:description"
          content="테스트팡의 모든 테스트들은 무료로 즐길 수 있습니다. 드라마, 연예, 방송 등 다양한 테스트를 즐겨보세요."
        />
        <meta
          property="og:image"
          content="https://f5game.s3.ap-northeast-2.amazonaws.com/f5game-test-logo.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@test.f5game.co.kr" />
        <meta
          name="twitter:title"
          content="테스트팡 - 심심할 땐 재미있는 테스트들을 즐겨보세요."
        />
        <meta
          name="twitter:description"
          content="테스트팡의 모든 테스트들은 무료로 즐길 수 있습니다. 드라마, 연예, 방송 등 다양한 테스트를 즐겨보세요."
        />
        <meta
          property="twitter:image"
          content="https://f5game.s3.ap-northeast-2.amazonaws.com/f5game-test-logo.png"
        />
        <link
          rel="apple-touch-icon"
          content="https://f5game.s3.ap-northeast-2.amazonaws.com/f5game-test-logo.png"
        />
      </Head>
      <main>
        <Header NODE_ENV={NODE_ENV} />
        <Layout className="site-layout">
          <Row className="mt-8 mb-24 px-4" gutter={[4, 4]}>
            {items.map((item, key) => (
              <Col
                xs={12}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                key={key}
                className="pb-6"
              >
                <Link href={`/start/${item.link}`} target="_blank">
                  <Card
                    hoverable
                    size="small"
                    height={400}
                    cover={
                      <img
                        alt={item.title}
                        src={item.logo}
                        width={320}
                        height={320}
                      />
                    }
                  >
                    <Meta title={<h2 className="text-sm">{item.title}</h2>} />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Layout>
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.BASE_API_URL}/test/list`);
  return { props: { items: res.data, NODE_ENV: process.env.NODE_ENV } };
};
