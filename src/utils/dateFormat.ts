import router from "next/router";

type DateFormatConfig = {
  locale?: string;
};

export function dateFormat(
  date?: string,
  time?: boolean,
  config?: DateFormatConfig
) {
  return new Date(date)[time ? "toLocaleString" : "toLocaleDateString"](
    config ? config.locale : router.locale
  );
}