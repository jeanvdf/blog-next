'use client';

import { createPostAction } from '@/actions/post/create-post-action';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { makePartialPublicPost, PublicPost } from '@/models/PostModel';
import { useActionState, useEffect, useState } from 'react';
import { ImageUploadField } from '../ImageUploadField';
import { MarkdownEditor } from '../MarkdownEditor';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { toast } from 'react-toastify';

type ManagePostFormProps = {
  publicPost?: PublicPost;
};

export function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const initialState = { formState: makePartialPublicPost(publicPost), errors: [] };
  const [state, action, isPending] = useActionState(createPostAction, initialState);
  const [prevState, setPrevState] = useState(state);
  const [form, setForm] = useState(state.formState);
  const [contentValue, setContentValue] = useState(state.formState?.content || '');

  if (state !== prevState) {
    setPrevState(state);
    setForm(state.formState);
    setContentValue(state.formState.content);
    console.log(state);
  }

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach((e) => toast.error(e));
    }
  }, [state.errors]);

  return (
    <form action={action} className="w-full mb-16">
      <FieldGroup>
        <Field orientation="horizontal">
          <FieldLabel htmlFor="id">ID</FieldLabel>
          <FieldLabel htmlFor="slug">Slug</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Input
            id="id"
            name="id"
            type="text"
            readOnly
            value={form.id}
            onChange={(e) => setForm((p) => ({ ...p, id: e.target.value }))}
          />
          <Input
            id="slug"
            name="slug"
            type="text"
            readOnly
            value={form.slug}
            onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
          />
        </Field>
        <FieldLabel htmlFor="author">Autor</FieldLabel>
        <Field orientation="horizontal">
          <Input
            id="author"
            name="author"
            type="text"
            placeholder="João Augusto"
            value={form.author}
            onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
          />
          <Checkbox
            id="published"
            name="published"
            checked={form.published}
            onCheckedChange={(checked) => setForm((p) => ({ ...p, published: checked }))}
          />
          <Label htmlFor="published">Publicado</Label>
        </Field>
        <Field>
          <FieldLabel htmlFor="title">Título</FieldLabel>
          <Input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            placeholder="Digite o título do post"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="excerpt">Excerto</FieldLabel>
          <Input
            id="excerpt"
            name="excerpt"
            type="text"
            placeholder="Digite um fragmento do post"
            value={form.excerpt}
            onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
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
            value={form.coverImageUrl}
            onChange={(e) => setForm((p) => ({ ...p, coverImageUrl: e.target.value }))}
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
