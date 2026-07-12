'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PublicPost } from '@/models/PostModel';
import { useActionState, useEffect, useState } from 'react';
import { ImageUploadField } from '../ImageUploadField';
import { MarkdownEditor } from '../MarkdownEditor';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { createPostAction } from '@/actions/post/create-post-action';

type ManagePostFormProps = {
  post?: PublicPost;
};

export function ManagePostForm({ post: publicPost }: ManagePostFormProps) {
  const [contentValue, setContentValue] = useState(publicPost?.content || '');
  const initialState = { numero: 0 };
  const [state, action, isPending] = useActionState(createPostAction, initialState);

  useEffect(() => {
    console.log(state.numero);
  }, [state.numero]);

  return (
    <form action={action} className="w-full mb-16">
      <FieldGroup>
        <Field orientation="horizontal">
          <FieldLabel htmlFor="id">ID</FieldLabel>
          <FieldLabel htmlFor="slug">Slug</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Input id="id" name="id" type="text" readOnly defaultValue={publicPost?.id || ''} />
          <Input id="slug" name="slug" type="text" readOnly defaultValue={publicPost?.slug || ''} />
        </Field>
        <FieldLabel htmlFor="author">Autor</FieldLabel>
        <Field orientation="horizontal">
          <Input
            id="author"
            type="text"
            placeholder="João Augusto"
            defaultValue={publicPost?.author || ''}
          />
          <Checkbox
            id="published"
            name="published"
            defaultChecked={publicPost?.published || false}
          />
          <Label htmlFor="published">Publicado</Label>
        </Field>
        <Field>
          <FieldLabel htmlFor="title">Título</FieldLabel>
          <Input
            id="title"
            name="title"
            type="text"
            defaultValue={publicPost?.title || ''}
            placeholder="Digite o título do post"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="excerpt">Excerto</FieldLabel>
          <Input
            defaultValue={publicPost?.excerpt || ''}
            id="excerpt"
            name="excerpt"
            type="text"
            placeholder="Digite um fragmento do post"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="content">Conteúdo</FieldLabel>
          <MarkdownEditor
            textAreaName="content"
            disabled={false}
            value={contentValue}
            setValue={setContentValue}
          />
        </Field>
        <Field>
          <ImageUploadField />
        </Field>
        <Field>
          <FieldLabel htmlFor="coverImageUrl">URL da imagem de capa</FieldLabel>
          <Input
            name="coverImageUrl"
            type="text"
            placeholder="Digite um fragmento do post"
            defaultValue={publicPost?.coverImageUrl || ''}
          />
        </Field>
        <Field orientation="horizontal">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
