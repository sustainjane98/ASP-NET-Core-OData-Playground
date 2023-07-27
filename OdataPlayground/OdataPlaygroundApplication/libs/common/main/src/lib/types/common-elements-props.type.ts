export type CommonElementProps = {
  dataTestId: string;
  id: string;
};

export type CommonElementPropsWithName = {
  name: string;
} & CommonElementProps;
