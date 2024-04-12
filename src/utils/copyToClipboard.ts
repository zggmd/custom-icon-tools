/**
 * copyToClipboard
 * @author songsz
 * @date 2024-04-12
 */

export function copyToClipboard(text: string, cb = () => {}) {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log('Text copied to clipboard:', text);
      cb?.();
    })
    .catch(err => {
      console.error('Unable to copy text to clipboard:', err);
    });
}
