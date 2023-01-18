import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Start() {
  const router = useRouter();
  const { link } = router.query;
  useEffect(() => {
    location.href = `/main/${link}`;
  });
}
