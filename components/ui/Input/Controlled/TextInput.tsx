import { Control, FieldValues, Path, useController } from "react-hook-form";
import {
  TextInput as BaseTextInput,
  TextInputProps,
} from "@/components/ui/Input/Base/TextInput";

type Props<T extends FieldValues> = TextInputProps & {
  name: Path<T>;
  control: Control<T>;
};

export const TextInput = <T extends FieldValues>({
  name,
  control,
  ...props
}: Props<T>) => {
  const { field, fieldState: _fieldState } = useController({
    control,
    name,
  });

  return (
    <BaseTextInput
      onChange={field.onChange}
      onBlur={field.onBlur}
      editable={!field.disabled}
      {...props}
    />
  );
};
