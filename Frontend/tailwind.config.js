/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "D:\Projects\Frontend/**/*.{ts,js,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#4EA685',
        'secondary-color': '#57B894',
        '--black': '#000000;',
        '--white': '#ffffff',
        '--gray': '#efefef',
        '--gray-2': '#757575',

        '--facebook-color': '#4267B2',
        '--google-color': '#DB4437',
        '--twitter-color': '#1DA1F2',
        '--insta-color': ' #E1306C',
        primary: { "50": "#fef2f2", "100": "#fee2e2", "200": "#fecaca", "300": "#fca5a5", "400": "#f87171", "500": "#ef4444", "600": "#dc2626", "700": "#b91c1c", "800": "#991b1b", "900": "#7f1d1d", "950": "#450a0a" }
      },
      fontFamily: {
        'body': [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ],
        'sans': [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ],
        jakarta: ['Plus Jakarta Sans', 'sans-serif',],
        cursive: ['cursive']
      },
    },
  },
  plugins: [],
}