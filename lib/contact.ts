// Datos de contacto oficiales de CHENEK BALAM.
// Para cambiar un dato en toda la página, edítalo aquí.

export const CONTACT = {
  phoneDisplay: '961 154 4298',
  phoneTel: '+529611544298',
  // Formato internacional sin "+" ni espacios (52 = México)
  whatsapp: '529611544298',
  email: 'chenekbalam1@gmail.com',
  location: 'TecNM Campus Tuxtla Gutiérrez, Chiapas, México',
  // TODO: reemplazar por la URL directa del perfil (p. ej. https://www.instagram.com/usuario)
  instagram: 'https://www.instagram.com/explore/search/keyword/?q=chenek%20balam',
  instagramLabel: 'Chenek Balam',
  // TODO: reemplazar por la URL directa de la página (p. ej. https://www.facebook.com/pagina)
  facebook: 'https://www.facebook.com/search/top?q=chenek%20balam%20robot%20ambiental',
  facebookLabel: 'Chenek Balam Robot Ambiental',
};

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${CONTACT.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
