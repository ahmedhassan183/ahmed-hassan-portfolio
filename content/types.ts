import type { en } from "./en";

type ContentShape<T> = T extends string ? string : T extends readonly (infer U)[] ? readonly ContentShape<U>[] : T extends object ? { [K in keyof T]: K extends "icon" | "id" | "path" ? T[K] : ContentShape<T[K]> } : T;
export type Dictionary = ContentShape<typeof en>;
export type Locale = "en" | "ar";
