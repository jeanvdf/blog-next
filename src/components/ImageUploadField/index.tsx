'use client';

import { Ellipsis } from 'lucide-react';
import { Button } from '../ui/button';
import { ButtonGroup } from '../ui/button-group';
import { Field, FieldDescription, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import { uploadImageAction } from '@/actions/upload/upload-image-action';

type ImageUploadFieldProps = {
  disabled?: boolean;
};

export function ImageUploadField({ disabled = false }: ImageUploadFieldProps) {
  const inputRefImg = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState('');

  function handleChange() {
    if (isUploading) return;
    const fileRef = inputRefImg?.current?.files;
    if (!fileRef) {
      setImgUrl('');
      return;
    }
    const [file] = fileRef;
    if (!file) {
      setImgUrl('');
      return;
    }

    const maxSizeUploadImage = Number(process.env.NEXT_PUBLIC_FILE_UPLOADER_MAX_SIZE) || 900 * 1024;

    if (file.size > maxSizeUploadImage) {
      const fileSizeCalculated = maxSizeUploadImage / 1024;
      toast.error(`Selecione um arquivo de até ${fileSizeCalculated} KB.`);
      setImgUrl('');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(result.error);
        setImgUrl('');
        return;
      }

      setImgUrl(result.url);
      toast.success(`Imagem enviada com sucesso ${result.url}`);
    });
  }
  return (
    <Field>
      <FieldLabel htmlFor="form-image">Imagem</FieldLabel>
      <Input
        onChange={handleChange}
        id="form-image"
        name="file"
        accept="image/*"
        type="file"
        className="cursor-pointer hidden"
        ref={inputRefImg}
        disabled={disabled}
      />
      <ButtonGroup>
        <Button
          variant="outline"
          onClick={() => inputRefImg.current?.click()}
          disabled={isUploading || disabled}
        >
          Selecione uma imagem
        </Button>
        <Button
          variant="outline"
          className="bg-slate-100"
          size="icon"
          onClick={() => inputRefImg.current?.click()}
          disabled={isUploading || disabled}
        >
          <Ellipsis />
        </Button>
      </ButtonGroup>
      <FieldDescription>Escolha sua imagem.</FieldDescription>
      {!!imgUrl && (
        <div className="flex flex-col gap-4">
          <p>
            <b>URL:</b> {imgUrl}
          </p>

          {/* eslint-disable-next-line */}
          <img className="rounded-lg" src={imgUrl} />
        </div>
      )}
    </Field>
  );
}
