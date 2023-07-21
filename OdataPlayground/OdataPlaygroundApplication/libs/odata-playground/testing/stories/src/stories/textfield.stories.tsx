import { Textfield } from '@odata-playground/odata/common';
import type { Meta, StoryObj } from '@storybook/react';
import {
  CenterWithMaxWidthDecorator,
  ReactHookFormDecorator,
} from '../../../decorators/src';
import {
  FilterQueryOperators,
  FilterVariants,
} from '@odata-playground/odata/config';
import { HttpMethod } from '@odata-playground/common';

export default {
  component: Textfield,
  title: 'Textfield',
  decorators: [
    ReactHookFormDecorator({
      httpMethod: HttpMethod.GET,
      url: 'http://localhost:3000',
    }),
    CenterWithMaxWidthDecorator(),
  ],
} as Meta<typeof Textfield>;

type Story = StoryObj<typeof Textfield>;

export const Default: Story = {
  render: () => <Textfield name="url" />,
};

export const WithAutocomplete: Story = {
  render: () => (
    <Textfield
      name="url"
      autoComplete={[...FilterVariants, ...FilterQueryOperators]}
    />
  ),
};

export const WithDropdown: Story = {
  render: () => (
    <Textfield
      name="url"
      autoComplete={[...FilterVariants, ...FilterQueryOperators]}
      dropdownProps={[
        {
          name: 'httpMethod',
          handleChange: () => {},
          values: [
            { key: HttpMethod.GET, value: 'GET' },
            { key: HttpMethod.POST, value: 'POST' },
            { key: HttpMethod.PUT, value: 'PUT' },
            { key: HttpMethod.PATCH, value: 'PATCH' },
            { key: HttpMethod.DELETE, value: 'DELETE' },
          ],
        },
      ]}
    />
  ),
};
