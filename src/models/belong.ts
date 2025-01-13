import {Faculty} from "./types/faculty";
import {Department} from "./types/department";
import {Organization} from "./types/organization";

export interface BelongObject {
    organization: Organization,
    faculty: Faculty|undefined
    department: Department|undefined
}

 export class Belong{
    public readonly organization: Organization;
    public readonly faculty: Faculty|undefined
    public readonly department: Department|undefined

    constructor(organization: Organization, faculty?: Faculty, department?: Department) {
        this.organization = organization;
        this.faculty = faculty;
        this.department = department;
    }

    public toJSON(): BelongObject{
        return {
            organization: this.organization,
            faculty: this.faculty,
            department: this.department
        }
    }

    public static parse(mail: string): Belong{
        const graduate_regex = new RegExp("m(am|bm|cm|em|fm|gm|hm|jm|km|ad|bd)([0-9]{2})[0-9]{3}@bene.fit.ac.jp$", "");
        const faculty_regex = new RegExp("s([0-9]{2})([fge5abcmhkxy])[0-9]{4}@bene.fit.ac.jp$", "");
        const junior_collage_regex = new RegExp("s([0-9]{2})(8)[0-9]{4}@bene.fit.ac.jp$", "");

        if(graduate_regex.test(mail)){
            const match: RegExpMatchArray = <RegExpMatchArray>mail.match(graduate_regex)
            const department_code: string = match[1]
            switch (department_code){
                case "am":
                    return new Belong(Organization.Graduate, Faculty.G_Engineering, Department.M_A);
                case "bm":
                    return new Belong(Organization.Graduate, Faculty.G_Engineering, Department.M_B);
                case "cm":
                    return new Belong(Organization.Graduate, Faculty.G_Engineering, Department.M_C);
                case "fm":
                    return new Belong(Organization.Graduate, Faculty.G_Engineering, Department.M_F);
                case "gm":
                    return new Belong(Organization.Graduate, Faculty.G_Engineering, Department.M_G);
                case "hm":
                    return new Belong(Organization.Graduate, Faculty.G_Engineering, Department.M_H);
                case "jm":
                    return new Belong(Organization.Graduate, Faculty.G_Engineering, Department.M_J);
                case "km":
                    return new Belong(Organization.Graduate, Faculty.G_Socio_Environmental_Studies, Department.M_K);
                case "ad":
                    return new Belong(Organization.Graduate, Faculty.G_Engineering, Department.D_A);
                case "bd":
                    return new Belong(Organization.Graduate, Faculty.G_Engineering, Department.D_B);
                default:
                    return new Belong(Organization.Unknown, undefined, undefined);
            }
        }else if(faculty_regex.test(mail)){
            const match: RegExpMatchArray = <RegExpMatchArray>mail.match(faculty_regex)
            const department_code: string = match[2]
            switch (department_code){
                case "f":
                    return new Belong(Organization.Faculty, Faculty.F_Engineering, Department.F_F);
                case "g":
                    return new Belong(Organization.Faculty, Faculty.F_Engineering, Department.F_G);
                case "e":
                    return new Belong(Organization.Faculty, Faculty.F_Engineering, Department.F_E);
                case "5":
                    return new Belong(Organization.Faculty, Faculty.F_Engineering, Department.F_5);
                case "a":
                    return new Belong(Organization.Faculty, Faculty.F_Information_Engineering, Department.F_A);
                case "b":
                    return new Belong(Organization.Faculty, Faculty.F_Information_Engineering, Department.F_B);
                case "c":
                    return new Belong(Organization.Faculty, Faculty.F_Information_Engineering, Department.F_C);
                case "m":
                    return new Belong(Organization.Faculty, Faculty.F_Information_Engineering, Department.F_M);
                case "h":
                    return new Belong(Organization.Faculty, Faculty.F_Information_Engineering, Department.F_H);
                case "k":
                    return new Belong(Organization.Faculty, Faculty.F_Socio_Environmental_Studies, Department.F_K);
                case "x":
                    return new Belong(Organization.Faculty, undefined, Department.F_X);
                case "y":
                    return new Belong(Organization.Faculty, undefined, Department.F_Y);
                default:
                    return new Belong(Organization.Unknown, undefined, undefined);
            }
        }else if(junior_collage_regex.test(mail)){
            return new Belong(Organization.Junior_Collage, undefined, Department.J_8);
        }else{
            return new Belong(Organization.Other, undefined, undefined);
        }
    }
}
