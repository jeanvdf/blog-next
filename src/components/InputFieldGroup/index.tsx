'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { MarkdownEditor } from '../MarkdownEditor';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { ImageUploadField } from '../ImageUploadField';

export function ManagePostForm() {
  const [contentValue, setContentValue] = useState('Este é **um** exemplo');

  return (
    <form className="w-full max-w-sm mb-16">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-name">Título</FieldLabel>
          <Input id="form-name" type="text" placeholder="Digite o título do post" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="excerpt">Conteúdo</FieldLabel>
          <Input id="form-email" type="email" placeholder="john@exemplo.com" />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-content">Conteúdo</FieldLabel>
          <MarkdownEditor
            textAreaName="content"
            disabled={false}
            value={contentValue}
            setValue={setContentValue}
          />
        </Field>
        <ImageUploadField />
        <Field>
          <FieldLabel htmlFor="author">Autor</FieldLabel>
          <Input id="author" type="text" placeholder="João Augusto" />
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="published" name="published" defaultChecked />
          <Label htmlFor="published">Publicado</Label>
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
