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
export interface User {

    id: string,
    username: string,
    avatar: string
    course_id: string,
    created_at: Date,
    email: string,
    is_verified: boolean,
    course: Course,

}
