interface Props {
    message: string;
}
export const ErrorMessage = ({ message }: Props) => {
  return <span className="text-xs text-red-600">{message}</span>;
};
