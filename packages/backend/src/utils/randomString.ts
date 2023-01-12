export default function generateRandomString(length = 5) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return Array(length)
    .fill(null)
    .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
    .join('');
}
