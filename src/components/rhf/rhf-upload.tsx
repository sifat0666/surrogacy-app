'use client'
import { UploadSingleFile } from "../upload";
import { Controller, useFormContext } from "react-hook-form";
import {
  ButtonBase,
  FormHelperText,
  FormLabel,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRef } from "react";
import { fData } from "@/utils/format-number";

export function RHFUploadSingleFileWithPreview({
  name,
  outerLabel,
  supportedFormats,
  ...other
}: any): JSX.Element {
  const { control } = useFormContext();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const hasError = Boolean(error) && !field.value;

        return (
          <Stack gap="0.6rem">
            {outerLabel && <FormLabel>{outerLabel}</FormLabel>}
            <UploadSingleFile
              file={field.value}
              error={hasError}
              onChange={field.onChange}
              supportedFormats={supportedFormats}
              {...other}
            />
            <FormHelperText error sx={{ px: 2 }}>
              {error?.message}
            </FormHelperText>
          </Stack>
        );
      }}
    />
  );
}

export function RHFUploadSingleFileWithoutPreview({
  name,
  label = "Upload File",
  accept,
  required = true,
}: any): JSX.Element {
  const {
    register,
    setValue,
    watch,
    trigger,
    formState: { errors },
  }: any = useFormContext();
  const fileInputRef: any = useRef(null);

  const file = watch(name);

  const handleClickAttachFile = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <Stack direction="column" alignItems="start" spacing={1.6}>
        <ButtonBase
          disableRipple
          sx={{ display: "flex", gap: 1.4 }}
          onClick={handleClickAttachFile}
        >
          <Typography variant="body2">
            {label}{" "}
            {required && (
              <Typography component="span" variant="body2" color="error.main">
                *
              </Typography>
            )}
          </Typography>
          {/* <AttachFileIcon sx={{ color: "error.main" }} /> */}
        </ButtonBase>

        {file && (
          <div>
            {file?.name && (
              <Typography variant="subtitle2">{file.name}</Typography>
            )}
            {file?.size && (
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {fData(file.size)}
              </Typography>
            )}
          </div>
        )}

        <input
          {...register(name)}
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={(event) => {
            const selectedFile: any = event.target.files?.[0];
            setValue(name, selectedFile);
            trigger(name);
          }}
          style={{ display: "none" }}
        />
      </Stack>

      {Boolean(errors[name]) && (
        <FormHelperText sx={{ px: 2, display: "block" }} error>
          {errors[name].message}
        </FormHelperText>
      )}
    </div>
  );
}
