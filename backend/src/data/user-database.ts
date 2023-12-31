import { PRISMA } from "@/database/prisma";
import { Prisma, User } from "@prisma/client";
import moment from 'moment-timezone';


interface CreateUserRequest extends Prisma.UserCreateInput { course_id: number }

export class USER_DATABASE {

    async create( data: CreateUserRequest, code: string ): Promise<void> {
        const user = await PRISMA.user.create( {
            data: {
                name: data.name,
                username: data.username,
                password: data.password,
                email: data.email,
                course: {
                    connect: {
                        id: data.course_id
                    }
                }
            }
        } )

        await PRISMA.authenticateAccount.create( {
            data: {
                user_id: user.id,
                code
            }
        } )

        await PRISMA.userInfos.create( {
            data: {
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        } )


    }

    async getValidationCode( userId: string ) {
        const code = await PRISMA.authenticateAccount.findFirst( {
            where: { user_id: userId }
        } )

        return code
    }

    async refreshCode( userId: string, code: string ) {
        const auth = await PRISMA.authenticateAccount.findFirst( {
            where: { user_id: userId }
        } )

        if ( !auth ) throw new Error( "código de validação não encontrado" )
        const expires_at = moment().utcOffset( -180 ).add( 5, 'minutes' ).toDate();

        await PRISMA.authenticateAccount.update( {
            where: { id: auth.id },
            data: { expires_at, code }
        } )
    }

    async validateAccount( userId: string ) {
        await PRISMA.user.update( {
            where: { id: userId },
            data: { is_verified: true }
        } )

        await PRISMA.authenticateAccount.deleteMany( { where: { user_id: userId } } )
    }

    async profile( userId: string ) {

        const user = await PRISMA.user.findUnique( {
            where: { id: userId },
            include: {
                course: true,
                UserInfos: {
                    select: {
                        headline: true,
                        address: true,
                        birthday: true,
                        gender: true,
                        phone: true,
                        links: true,
                        cep: true
                    }
                },
            }
        } )

        return { ...user, UserInfos: user?.UserInfos[0] ?? null }
    }

    async findByEmail( email: string ): Promise<User | null> {
        const user = await PRISMA.user.findUnique( { where: { email } } )
        return user;
    }

    async fingByUsername( username: string ): Promise<User | null> {
        const user = await PRISMA.user.findUnique( { where: { username } } )
        return user;
    }

    async findById( id: string ): Promise<User | null> {
        const user = await PRISMA.user.findUnique( { where: { id } } )
        return user;
    }

    async update( userId: string, data: { username?: string, name?: string, title?: string, address?: string, cep?: string, phone?: string, links?: { linkedin?: string, github?: string, site?: string } } ) {

        await PRISMA.user.update( {
            where: { id: userId }, data: {
                username: data.username,
                name: data.name,
            }
        } )

        const currentInfos = await PRISMA.userInfos.findFirst( { where: { user_id: userId } } )

        if ( !currentInfos?.links ) throw new Error( "userInfos não encontradas" )



        const currentLinks = currentInfos.links
        const convertedLinks = JSON.stringify( currentLinks as string )
        const updateLinks = ( { ...JSON.parse( convertedLinks ), ...data.links } )

        if ( updateLinks.linkedin === "" ) delete updateLinks.linkedin
        if ( updateLinks.github === "" ) delete updateLinks.github
        if ( updateLinks.site === "" ) delete updateLinks.site

        await PRISMA.userInfos.update( {
            where: { user_id: userId }, data: {
                headline: data.title,
                address: data.address,
                phone: data.phone,
                cep: data.cep,
                links: updateLinks
            }
        } )

    }

    async getUserPosts( userId: string ) {
        const posts = await PRISMA.post.findMany( {
            where: { author_id: userId, its_published: true },
            include: {
                author: {
                    select: {
                        id: true, username: true, email: true, avatar: true,
                        course: { select: { name: true } }
                    }
                },
                comments: {
                    include: {
                        author: {
                            select: {
                                id: true, username: true, email: true, avatar: true,

                            }
                        },
                        likes: { select: { user_id: true } },
                    }
                },
                likes: {
                    select: {
                        user_id: true,
                    }
                }
            }
        } )

        const postsWithLikesInArrayOfIds = posts.map( post => ( {
            ...post,
            comments: post.comments.map( comment => ( {
                ...comment,
                likes: comment.likes.map( like => like.user_id )
            } ) ),
            likes: post.likes.map( like => like.user_id )
        } ) )

        return postsWithLikesInArrayOfIds
    }

    async upsertUserInfos( userId: string, data: Prisma.UserInfosCreateInput ) {

        if ( !userId ) {
            throw new Error( "userId não informado" );
        }

        const userData = {
            ...data,
            user: {
                connect: { id: userId },
            },
        };

        const user = await PRISMA.userInfos.upsert( {
            where: { user_id: userId },
            create: userData,
            update: userData
        } )

        return user
    }
}
