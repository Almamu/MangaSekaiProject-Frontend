import { Control, FieldValues, Path, useController } from "react-hook-form";
import {
  TextInput as BaseTextInput,
  TextInputProps,
} from "@/components/ui/Input/Base/TextInput";
import { useTheme } from "@react-navigation/native";
import { NativeSyntheticEvent } from "react-native/Libraries/Types/CoreEventTypes";
import {
  TextInputChangeEventData,
  TextInputFocusEventData,
} from "react-native/Libraries/Components/TextInput/TextInput";

type Props<T extends FieldValues> = TextInputProps & {
  name: Path<T>;
  control: Control<T>;
};

export const TextInput = <T extends FieldValues>({
  name,
  control,
  value,
  onChange,
  onBlur,
  ...props
}: Props<T>) => {
  const { colors } = useTheme();
  const { field, fieldState: fieldState } = useController({
    control,
    name,
  });
  const errorStyle = { borderColor: colors.error };
  const appendStyle = { backgroundColor: colors.error };
  const relayOnChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    field.onChange(e);
    onChange?.(e);
  };
  const relayOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    field.onBlur();
    onBlur?.(e);
  };

  return (
    <BaseTextInput
      style={fieldState.invalid ? errorStyle : {}}
      appendStyle={fieldState.invalid ? appendStyle : {}}
      prependStyle={fieldState.invalid ? appendStyle : {}}
      onChange={relayOnChange}
      onBlur={relayOnBlur}
      editable={!field.disabled}
      value={value ?? field.value}
      {...props}
    />
  );
};
