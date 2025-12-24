export type GRowValue = Record<
  "Tên" | "Tham dự" | "Bài hát" | "Thời gian",
  string | number
>;

export type GHeader = (keyof GRowValue)[];
