import { Fragment } from "react";

const ltrRun = /([A-Za-z0-9][A-Za-z0-9@._%+,\u2013-]*(?:(?:\s+|\s*\/\s*)[A-Za-z0-9][A-Za-z0-9@._%+,\u2013-]*)*)/g;
const arabicCharacter = /[\u0600-\u06ff]/;
const ltrCharacter = /[A-Za-z0-9]/;

export function BidiText({ children }: { children: string }) {
  if (!ltrCharacter.test(children)) return children;
  if (!arabicCharacter.test(children)) return <bdi dir="ltr">{children}</bdi>;

  return children.split(ltrRun).map((part, index) =>
    ltrCharacter.test(part)
      ? <bdi dir="ltr" key={`${part}-${index}`}>{part}</bdi>
      : <Fragment key={`${part}-${index}`}>{part}</Fragment>,
  );
}

export function BidiIsolate({ children }: { children: string }) {
  return <bdi dir={arabicCharacter.test(children) ? "rtl" : "ltr"}>{children}</bdi>;
}
