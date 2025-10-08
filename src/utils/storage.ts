// utils/storage.ts
// export const saveToStorage = (key: string, value: any, ttl: number) => {
//     const item = {
//       value,
//       expiry: new Date().getTime() + ttl, // current time + ttl in ms
//     };
//     sessionStorage.setItem(key, JSON.stringify(item));
//   };
  
//   export const loadFromStorage = (key: string) => {
//     const itemStr = sessionStorage.getItem(key);
//     if (!itemStr) return null;
  
//     try {
//       const item = JSON.parse(itemStr);
//       if (new Date().getTime() > item.expiry) {
//         // expired
//         sessionStorage.removeItem(key);
//         return null;
//       }
//       return item.value;
//     } catch {
//       sessionStorage.removeItem(key);
//       return null;
//     }
//   };
  
//   export const removeFromStorage = (key: string) => {
//     sessionStorage.removeItem(key);
//   };
  