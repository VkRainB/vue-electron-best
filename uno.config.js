
import theme from 'daisyui/functions/variables.js';
// import colors from 'daisyui/src/theming/index.js';
import { defineConfig, presetIcons, presetUno } from 'unocss';
// import { presetDaisy } from '@ameinhardt/unocss-preset-daisy'; // '@ameinhardt/unocss-preset-daisy';

const { rules, ...preset } = presetUno();

export default defineConfig({
  // presets: [presetDaisy(), {
  //   ...preset,
  //   rules: rules.filter(([selector]) => selector !== 'table')
  // }, presetIcons()],
  separators: [':'],
  theme:{
    ...theme
  }
});