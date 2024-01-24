export function cyAvatarColorHue(name: string) {
  const hash = ref(0);
  const hName = ref(name.split(" ").join(""));
  for (const letter of hName.value) {
    hash.value = letter.charCodeAt(0) + ((hash.value << 5) - hash.value);
    hash.value = hash.value & hash.value;
  }
  hash.value = hash.value % 360;
  return hash.value;
}

export const backgroundColor = (input_text:string) => {
  // const { $isDark } = useNuxtApp();
  if(process.server) return
  const isDark = useNuxtApp().$theme.isDark
  const name = ref( input_text );
  let a = 1;
  // if(showOverlay.value){a = 0.6}
  const col = cyAvatarColorHue(name.value || "Cybandy");

  const res = isDark.value
    ? { backgroundColor: `hsla(${col}, 70%, 65%, ${a})` }
    : { backgroundColor: `hsla(${col}, 90%, 50%, ${a})` };

  return res;
};


function convertToDecimal(amount:number){
  return Math.floor(amount)/100
}

export function priceFormatter(amount:number|undefined|null, currency='EUR'){
  // const userStore = useUserStore()
  const nu_price = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: currency //? currency : userStore.getUserCurrency
  }).format(convertToDecimal(amount? amount : 0))
  return nu_price
}

export function priceFormatterNoSymbol(amount:number|undefined|null, currency=''){
  const value = convertToDecimal(Number(amount))
  return value
}

export function parseCurrencyString(currencyString: string): number {
  const formattedValue = currencyString.replace(/[^\d.-]/g, ''); // Remove non-numeric characters
  const numericValue = parseFloat(formattedValue);
  return isNaN(numericValue) ? 0 : numericValue;
}

// export function dateFormatter1(dateString:string|Date){
//   const inputDate = typeof(dateString)=='string' ? new Date(dateString): dateString
//   const options = {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//     hour12: true,
//   };
  
//   const formatter = new Intl.DateTimeFormat('en-US', options as any);
//   const formattedDate = formatter.format(inputDate);
//   return formattedDate
// }

export function dateFormatter(dateString:string|Date) {
  const date = typeof(dateString)=='string' ? new Date(dateString): dateString
  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
    
  });
  const parts = formatter.formatToParts(date);
  const filteredParts = parts.filter(
    (part) => !(part.type === "literal" && part.value === "at")
  );
  const formattedDate = filteredParts.map((part) => part.value).join("");
  return formattedDate;
  // return date.toLocaleDateString('en-us', {
  //   day:'numeric', month: 'long', year:'numeric', hour:'numeric', minute:'numeric', hour12:true
  // })
}

export function toastNotification(title='', description='', timeout=3000, icon='', color=''){
  
  const toast = useToast()

  function success(){
    const my_title = title ? title : 'Success'
    const my_desc = description
    const my_timeout = timeout
    const my_icon = icon ? icon : 'i-heroicons-check-badge-20-solid'
    const my_color = color ? color : 'emerald'

    toast.add({
      title: my_title,
      description: my_desc,
      color: my_color as any,
      timeout: my_timeout,
      icon : my_icon
    })

  }

  function error(){

    const my_title = title ? title : 'Oops!!!'
    const my_desc = description ? description : 'Something unexpected occurred'
    const my_timeout = timeout
    const my_icon = icon ? icon : 'i-heroicons-exclamation-triangle-20-solid'
    const my_color = color ? color : 'red'

    toast.add({
      title: my_title,
      description: my_desc,
      color: my_color as any,
      timeout: my_timeout,
      icon : my_icon
    })

  }

  function default_toast(){
    const my_title = title ? title : 'Notification'
    const my_desc = description
    const my_timeout = timeout
    const my_icon = icon ? icon : 'i-heroicons-bell-20-solid'
    const my_color = color ? color : 'primary'

    toast.add({
      title: my_title,
      description: my_desc,
      color: my_color as any,
      timeout: my_timeout,
      icon : my_icon
    })
  }

  return {success, error, default_toast}
}


