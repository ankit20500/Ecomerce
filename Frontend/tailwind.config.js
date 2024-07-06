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
            '--insta-color':' #E1306C'
          },
          fontFamily: {
            jakarta: ['Plus Jakarta Sans', 'sans-serif',],
            cursive:['cursive']
          },
      },
    },
    plugins: [],
  }