const DEFAULT_WHATSAPP_MESSAGE = 'Olá, vim pelo site e gostaria de mais informações.';

export function digitsOnly(value = '') {
  return String(value).replace(/\D/g, '');
}

export function getWhatsappUrl(number, message = DEFAULT_WHATSAPP_MESSAGE) {
  const cleanNumber = digitsOnly(number);
  if (!cleanNumber) return null;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function getPhoneUrl(phone) {
  const cleanPhone = digitsOnly(phone);
  return cleanPhone ? `tel:${cleanPhone}` : null;
}

export function getEmailUrl(email) {
  return email ? `mailto:${email}` : null;
}

export function getMapsUrl(address) {
  return address ? `https://maps.google.com/?q=${encodeURIComponent(address)}` : null;
}
