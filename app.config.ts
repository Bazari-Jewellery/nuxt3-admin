export default defineAppConfig({
  ui: {
    primary: 'purple',
    gray: 'neutral',
    button:{
      default: {
        variant: "outline",
        size:"md"
      }
    },
    input:{
      padding:{
        sm: 'px-3 py-2.5'
      }
    },
    avatar:{
      background: 'bg-gray-300 dark:bg-gray-800'
    },
    // card:{
    //   base:'overflow-auto'
    // }

    table:{
      td:{
        padding: 'px-3 py-2.5'
      }
    },
    card: {
      "base": "",
      "background": "bg-white dark:bg-gray-900",
      "divide": "divide-y divide-gray-200 dark:divide-gray-800",
      "ring": "ring-1 ring-gray-200 dark:ring-gray-800",
      "rounded": "rounded-lg",
      "shadow": "shadow",
      "body": {
        "base": "",
        "background": "",
        "padding": "px-4 py-5 sm:p-6"
      },
      "header": {
        "base": "",
        "background": "",
        "padding": "px-4 py-5 sm:px-6"
      },
      "footer": {
        "base": "",
        "background": "",
        "padding": "px-4 py-4 sm:px-6"
      }
    }
    
    
  }
})
