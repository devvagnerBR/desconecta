export interface Course {

    id: string,
    name: string,
    status: boolean,
    created_at: Date,
    updated_at: Date,

}

export interface PostAuthor {
    avatar: string;
    username: string;
    id: string;
    email: string;
    course: { name: string }
}

enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

enum Genders {
    MALE = "MALE",
    FEMALE = "FEMALE",
    NON_BINARY = "NON_BINARY",
    OTHER = "OTHER",
    NOT_INFORMED = "NOT_INFORMED"
}

export interface User {

    id: string,
    name: string,
    username: string,
    role: Role,
    avatar: string
    course_id: string,
    created_at: Date,
    email: string,
    is_verified: boolean,
    course: Course,
    UserInfos: {
        address: string,
        birthday: string,
        gender: Genders,
        headline: string
        links: string[]
        phone: string
    }

}
