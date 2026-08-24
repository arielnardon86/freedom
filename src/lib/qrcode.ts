import QRCode from "qrcode";

export async function generateQrDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    margin: 1,
    width: 400,
    color: { dark: "#000000", light: "#ffffff" },
  });
}
