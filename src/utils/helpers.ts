export function generateId(): string {
  let letters = '0123456789ABCDEF';
  let output = ""
  for (let i = 0; i < 6; i++) {
    output += letters[Math.floor(Math.random() * 16)];
  }
  return output;
}
