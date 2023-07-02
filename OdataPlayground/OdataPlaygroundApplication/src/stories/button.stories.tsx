/* eslint-disable storybook/default-exports */
import type { Story } from "@ladle/react";
import { Button, ButtonColorVariant } from "../components/common/button";

export const Default: Story = () => (
  <Button variant={ButtonColorVariant.DEFAULT}>Default</Button>
);

export const Alternative: Story = () => (
  <Button variant={ButtonColorVariant.ALTERNATIVE}>Alternative</Button>
);

export const Light: Story = () => (
  <Button variant={ButtonColorVariant.LIGHT}>Light</Button>
);

export const Green: Story = () => (
  <Button variant={ButtonColorVariant.GREEN}>Green</Button>
);

export const Red: Story = () => (
  <Button variant={ButtonColorVariant.RED}>Red</Button>
);

export const Purple: Story = () => (
  <Button variant={ButtonColorVariant.PURPLE}>Purple</Button>
);

export const Yellow: Story = () => (
  <Button variant={ButtonColorVariant.YELLOW}>Yellow</Button>
);
