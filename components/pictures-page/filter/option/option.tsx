interface OptionPropTypes {
  value: string;
  text: string;
}

export default function Option({ value, text }: OptionPropTypes) {
  return <option value={value}>{text}</option>;
}
