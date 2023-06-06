import type { Meta, StoryObj } from '@storybook/angular';
import { PLButtonComponent } from './button.component';
import { userEvent, within } from '@storybook/testing-library';

const meta: Meta<PLButtonComponent> = {
    title: 'Components/Button',
    component: PLButtonComponent,
    tags: ['autodocs'],
};

export default meta;

type ButtonStory = StoryObj<PLButtonComponent>

export const Primary: ButtonStory = {
    name: 'Primary',
    args: {
        content: "Hello World"
    },
    play: async ({ canvasElement }) => {
        // const canvas = within(canvasElement);
        // await userEvent.click(canvas.getByTestId('button'))
    },
    render: (args) => ({
        props: args,
    })
};

export const Secondary: ButtonStory = {
    args: {
        content: 'Secondary Button'
    }
}