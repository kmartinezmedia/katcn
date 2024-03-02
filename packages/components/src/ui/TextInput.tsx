import type { UniversalTextInputProps } from '../types/props';

type HtmlTextInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'height' | 'size' | 'width' | 'color'
>;

interface TextInputProps extends HtmlTextInputProps, UniversalTextInputProps {}

function TextInput(props: TextInputProps) {
  return <input type="text" data-1p-ignore {...props} />;
}

TextInput.displayName = 'TextInput';

export { TextInput, type TextInputProps, type HtmlTextInputProps };
