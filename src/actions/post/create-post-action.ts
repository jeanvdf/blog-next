type CreatePostActionType = {
  numero: number;
};

export async function createPostAction(
  prevState: CreatePostActionType,
): Promise<CreatePostActionType> {
  return {
    numero: prevState.numero + 1,
  };
}
