'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Ellipsis } from 'lucide-react';
import { useRef, useState } from 'react';
import { ButtonGroup } from '../ui/button-group';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { MarkdownEditor } from '../MarkdownEditor';

export function ManagePostForm() {
  const inputRefImg = useRef<HTMLInputElement>(null);

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
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="form-image">Imagem</FieldLabel>
            <ButtonGroup>
              <Input id="form-image" type="file" className="cursor-pointer" ref={inputRefImg} />
              <Button
                variant="outline"
                className="bg-slate-100"
                size="icon"
                onClick={() => inputRefImg.current?.click()}
              >
                <Ellipsis />
              </Button>
            </ButtonGroup>
            <FieldDescription>Escolha sua imagem.</FieldDescription>
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="form-content">Conteúdo</FieldLabel>
          <MarkdownEditor
            textAreaName="content"
            disabled={false}
            value={contentValue}
            setValue={setContentValue}
          />
        </Field>
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
