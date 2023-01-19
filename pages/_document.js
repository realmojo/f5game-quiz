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
      <meta name="msvalidate.01" content="9D6C85394BA833AF09FFDD20770E7D56" />
      <script
        defer
        src="https://t1.kakaocdn.net/kakao_js_sdk/v1/kakao.min.js"
      />
      <script
        defer
        type="text/javascript"
        src="//wcs.naver.net/wcslog.js"
      ></script>
      <script
        defer
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
        async
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
      <script
        defer
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "feybr6kyxk");`,
        }}
      />
      <script
        defer
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-9130836798889522",
    enable_page_level_ads: true,
    overlays: {bottom: true}
  });`,
        }}
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
