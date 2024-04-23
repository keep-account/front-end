/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // 兼容小程序，将 : 替换成 __
  separator: '__',
  theme: {
    // 兼容小程序，将默认配置里带 .和/ 清除
    extend: {
      colors: {
        main: '#f9a01f',
        primary: '#1ea6fd',
        patch: '#5ff1b6',
      },
      backgroundColor: {
        main: '#f9a01f',
        primary: '#1ea6fd',
        patch: '#5ff1b6',
        last: '#ff8155',
        payType: '#f8f8f8',
        mainLast: '#ffb242',
      },
      backgroundImage: {
        mainImg: 'linear-gradient(180deg, #f9a01f 0%, #ffb242 100%)',
        primaryImg: 'linear-gradient(180deg, #1ea6fd 0%, #6fc6fd 100%)',
        patchImg: 'linear-gradient(180deg, #5ff1b6 5%, #8ff68b 100%)',
        lastImg: 'linear-gradient(180deg, #ff8155 5%, #ff9671 100%)',
      },
      height: {
        18: '4.5rem',
        70: '17.5rem',
        84: '21rem',
        88: '22rem',
        92: '23rem',
      },
      textColor: {
        primaryOne: '#111111',
        primaryThree: '#333333',
        primarySix: '#666666',
        primaryNine: '#999999',
        main: '#f9a01f',
        primary: '#1ea6fd',
        patch: '#5ff1b6',
        fontMain: '#1a1a1a',
        fontMajor: '#484848',
        fontPatch: '#a4a6a6',
        fontLast: '#e1e1e1',
      },
    },
  },
  corePlugins: {
    // 兼容小程序，将带有 * 选择器的插件禁用
    preflight: false,
    space: false,
    divideColor: false,
    divideOpacity: false,
    divideStyle: false,
    divideWidth: false,
  },
}
