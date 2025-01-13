import {Faculty} from "./faculty";
import {Department} from "./department";

export const Organization = {
    Graduate: "大学院",
    Faculty: "学部",
    Junior_Collage: "短期大学部",
    Staff: "教職員",
    Other: "教職員・システムなど",
    Unknown: "不明"
} as const;
export type Organization = (typeof Organization)[keyof typeof Organization];
