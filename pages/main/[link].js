const RedirectURL = () => {
  return null;
};

export default RedirectURL;

export const getServerSideProps = async ({ params }) => {
  // console.log(params.link);
  const redirectUrl = "https://mindpang.com/main/" + encodeURI(params.link);
  return {
    redirect: {
      permanent: true,
      destination: redirectUrl,
    },
    props: {},
  };
};
