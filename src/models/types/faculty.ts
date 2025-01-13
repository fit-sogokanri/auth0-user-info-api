export const Faculty = {
    G_Engineering: "工学研究科",
    G_Socio_Environmental_Studies: "社会環境学研究科",

    F_Engineering: "工学部",
    F_Information_Engineering: "情報工学部",
    F_Socio_Environmental_Studies: "社会環境学部",

} as const;
export type Faculty = (typeof Faculty)[keyof typeof Faculty];
