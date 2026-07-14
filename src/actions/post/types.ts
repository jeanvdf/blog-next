import { PublicPost } from '@/models/PostModel';

export type PostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: true;
};
