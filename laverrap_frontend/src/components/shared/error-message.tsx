interface Props {
    message: string;
}
export const ErrorMessage = ({ message }: Props) => {
  return <span className="text-sm text-red-600">{message}</span>;
};
