import { Control, FieldValues, Path, useController } from "react-hook-form";
import {
  TextInput as BaseTextInput,
  TextInputProps,
} from "@/components/ui/Input/Base/TextInput";
import { useTheme } from "@react-navigation/native";

type Props<T extends FieldValues> = TextInputProps & {
  name: Path<T>;
  control: Control<T>;
};

export const TextInput = <T extends FieldValues>({
  name,
  control,
  ...props
}: Props<T>) => {
  const { colors } = useTheme();
  const { field, fieldState: fieldState } = useController({
    control,
    name,
  });
  const errorStyle = { borderColor: colors.error };
  const appendStyle = { backgroundColor: colors.error };

  return (
    <BaseTextInput
      style={fieldState.invalid ? errorStyle : {}}
      appendStyle={fieldState.invalid ? appendStyle : {}}
      prependStyle={fieldState.invalid ? appendStyle : {}}
      onChange={field.onChange}
      onBlur={field.onBlur}
      editable={!field.disabled}
      {...props}
    />
  );
};
