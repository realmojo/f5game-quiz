import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <meta
        name="naver-site-verification"
        content="3390438b809cda9477627d608e8b60e696ab734a"
      />
      <meta
        name="google-site-verification"
        content="T-CortVSsy0RoZLDuauWWqEQzp4utIjPVcoSYEM0-U8"
      />
      <script src="https://t1.kakaocdn.net/kakao_js_sdk/v1/kakao.js" />
      <script type="text/javascript" src="//wcs.naver.net/wcslog.js"></script>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
        if(!wcs_add) var wcs_add = {};
          wcs_add["wa"] = "18cf866f0226840";
          if(window.wcs) {
           wcs_do();
        }
      `,
        }}
      />
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9130836798889522"
        crossOrigin="anonymous"
      />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-556X35N');
      `,
        }}
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
