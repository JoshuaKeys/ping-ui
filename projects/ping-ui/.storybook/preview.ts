import type { Preview } from "@storybook/angular";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      values: [
          { name: 'red', value: '#f00' },
          { name: 'green', value: '#0f0' },
          { name: 'blue', value: '#00f' }
      ]
    }
  },
};

export default preview;
