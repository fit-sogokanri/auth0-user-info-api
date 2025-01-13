import {Belong} from "./belong";

export interface MemberObject{
    uid: string;
    mail: string;
    given_name: string;
    family_name: string;

    user_name: string;
    domain: string;
    belong: Belong;
    start_year: Number|undefined
}

export class Member {
    public readonly uid: string;
    public readonly mail: string;
    public readonly given_name: string;
    public readonly family_name: string;

    public readonly user_name: string = ""
    public readonly domain: string = ""
    public readonly belong: Belong;
    public readonly start_year: Number|undefined;


    constructor(uid: string, mail: string, given_name: string, family_name: string ) {
        this.uid = uid
        this.mail = mail
        this.given_name = given_name
        this.family_name = family_name

        this.user_name = this.get_mail_user_name()
        this.domain = this.get_mail_domain()
        this.belong = Belong.parse(mail)
        this.start_year = this.get_start_year()
    }

    public toJSON(): MemberObject{
        return{
            uid: this.uid,
            family_name: this.family_name,
            given_name: this.given_name,
            mail: this.mail,
            user_name: this.user_name,
            domain: this.domain,
            belong: this.belong,
            start_year: this.start_year
        }
    }

    private get_mail_user_name(){
        const regex = new RegExp("@([a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]\.)+[a-zA-Z]{2,}$", "g")
        const user_name = this.mail.replace(regex, "");
        if(!user_name){
            throw new Error("メールにユーザ部がありません")
        }

        return user_name;
    }

    private get_mail_domain(){
        const regex = new RegExp("@([a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]\.)+[a-zA-Z]{2,}$", "g")
        const mail_domain_match_array:  RegExpMatchArray | null = this.mail.match(regex)
        if(!mail_domain_match_array || mail_domain_match_array.length===0){
            throw new Error("メールにドメイン部がありません")
        }

        return mail_domain_match_array[0].replace(/@/g, "");
    }

    private get_start_year(): Number|undefined{
        const graduate_regex = new RegExp("m(am|bm|cm|em|fm|gm|hm|jm|km|ad|bd)([0-9]{2})[0-9]{3}@bene.fit.ac.jp$", "");
        const faculty_and_junior_collage_regex = new RegExp("s([0-9]{2})[fge5abcmhkxy8][0-9]{4}@bene.fit.ac.jp$", "");

        if(graduate_regex.test(this.mail)) {
            const match: RegExpMatchArray = <RegExpMatchArray>this.mail.match(graduate_regex)
            const partof_start_year: string = match[2];
            return parseInt("20"+partof_start_year)
        }else if(faculty_and_junior_collage_regex.test(this.mail)) {
            const match: RegExpMatchArray = <RegExpMatchArray>this.mail.match(faculty_and_junior_collage_regex)
            const partof_start_year: string = match[1];
            return parseInt("20"+partof_start_year)
        }else {
            return undefined
        }
    }
}