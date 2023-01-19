import React, { useEffect } from "react";
import { message, Button } from "antd";

const success = () => {
  message.success("URL이 복사되었습니다.");
};
export const Share = ({ item, total, totalCount, contentTotalCount }) => {
  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=https://test.f5game.co.kr/main/${encodeURIComponent(
        item.link
      )}&t=${item.title}`,
      "_blank",
      "width=600, height: 400"
    );
  };
  const copy = () => {
    success();
    var textarea = document.createElement("textarea");
    textarea.value = `https://test.f5game.co.kr/main/${item.link}`;

    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 9999); // 추가

    document.execCommand("copy");
    document.body.removeChild(textarea);
  };
  const createKakaoButton = () => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window.Kakao) {
      const kakao = window.Kakao;
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init("4620ebc4c39b8b6bb94e0e471b33de8c");
      }
      kakao.Link.createDefaultButton({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: item.title,
          description: item.description,
          imageUrl: item.logo,
          link: {
            mobileWebUrl: `https://test.f5game.co.kr/main/${item.link}`,
            webUrl: `https://test.f5game.co.kr/main/${item.link}`,
          },
        },
        buttons: [
          {
            title: "플레이 하기",
            link: {
              mobileWebUrl: `https://test.f5game.co.kr/main/${item.link}`,
              webUrl: `https://test.f5game.co.kr/main/${item.link}`,
            },
          },
        ],
      });
    }
  };
  useEffect(() => {
    createKakaoButton();
  }, []);
  return (
    <>
      <div className="px-4">
        <a href="https://pf.kakao.com/_gqbxixj">
          <Button
            className="btn-kakao-plus"
            icon={
              <img
                src="https://f5game.s3.ap-northeast-2.amazonaws.com/kakaoplus.png"
                alt="카카오톡 플러스친구"
              />
            }
          >
            카카오톡 플친 추가
          </Button>
        </a>
        <div className="text-center pt-2 text-xs">
          플친을 추가하고 테스트 알림을 받아보세요
        </div>
      </div>
      <div className="flex justify-center px-4 pt-4 pb-4">
        <div
          className="twitter-share-button inline"
          style={{ cursor: "pointer" }}
        >
          <a
            href={`https://twitter.com/intent/tweet?text=${
              item.title
            }%0A----------------%0A테스트결과점수 ${total}점%0Ahttps://test.f5game.co.kr/main/${encodeURI(
              encodeURI(item.link)
            )}%0A#테스트결과 #테스트팡`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://f5game.s3.ap-northeast-2.amazonaws.com/twitter.png"
              alt="twitter-share-icon"
              style={{ width: 90 }}
            />
          </a>
        </div>
        <div
          className="facebook-share-button pt-1 inline"
          onClick={() => shareFacebook()}
          style={{ cursor: "pointer" }}
        >
          <img
            src="https://f5game.s3.ap-northeast-2.amazonaws.com/facebook.png"
            alt="facebook-share-icon"
            style={{ width: 80 }}
          />
        </div>
        <div
          className="kakao-share-button inline"
          style={{ cursor: "pointer" }}
        >
          <button id="kakao-link-btn">
            <img
              src="https://f5game.s3.ap-northeast-2.amazonaws.com/kakao.png"
              alt="kakao-share-icon"
              style={{ width: 90 }}
            />
          </button>
        </div>
        <div
          className="link-share-button inline pt-2"
          onClick={() => copy()}
          style={{ cursor: "pointer" }}
        >
          <img
            src="https://f5game.s3.ap-northeast-2.amazonaws.com/link.png"
            alt="link-share-icon"
            style={{ width: 70 }}
          />
        </div>
      </div>
    </>
  );
};
