import toast, { Toaster } from 'react-hot-toast';

export const useToasts = () => {

    const copyPostToClipBoardNotify = () => toast.success( 'Link copiado com sucesso!' );

    const savePostNofity = () => toast.success( 'Postagem salva com sucesso!' );

    const deletePostNotify = () => toast.promise(
        new Promise( ( resolve, reject ) => {
            setTimeout( () => {
                resolve( 'Postagem deletada com sucesso!' );
            }, 2000 );
        } ),
        {
            loading: 'Deletando postagem...',
            success: 'Postagem deletada com sucesso!',
            error: 'Ocorreu um erro ao deletar a postagem!',
        }
    );

    const cretePostNotify = () => toast.promise(
        new Promise( ( resolve, reject ) => {
            setTimeout( () => {
                resolve( 'Postagem criada com sucesso!' );
            }, 2000 );
        } ),
        {
            loading: 'Criando postagem...',
            success: 'Postagem criada com sucesso!',
            error: 'Ocorreu um erro ao criar a postagem!',
        }
    );

    const deleteCommentNotify = () => toast.promise(
        new Promise( ( resolve, reject ) => {
            setTimeout( () => {
                resolve( 'Comentário deletado com sucesso!' );
            }, 1000 );
        } ),
        {
            loading: 'Deletando comentário...',
            success: 'Comentário deletado com sucesso!',
            error: 'Ocorreu um erro ao deletar o comentário!',
        }
    );

    const logOutNotify = () => toast.promise(
        new Promise( ( resolve, reject ) => {
            setTimeout( () => {
                resolve( 'Saindo...' );
            }, 1500 );
        } ),
        {
            loading: 'Saindo...',
            success: 'Você foi deslogado com sucesso!',
            error: 'Ocorreu um erro ao sair!',
        }
    );

    const updateProfileNotify = () => toast.promise(
        new Promise( ( resolve, reject ) => {
            setTimeout( () => {
                resolve( 'Atualizando...' );
            }, 1500 );
        } ),
        {
            loading: 'Atualizando...',
            success: 'Perfil atualizado com sucesso!',
            error: 'Ocorreu um erro ao atualizar o perfil!',
        }
    );

    return {
        copyPostToClipBoardNotify,
        savePostNofity,
        deletePostNotify,
        cretePostNotify,
        deleteCommentNotify,
        logOutNotify,
        updateProfileNotify
    }

}