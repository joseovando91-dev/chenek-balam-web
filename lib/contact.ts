// Datos de contacto oficiales de CHENEK BALAM.
// Para cambiar un dato en toda la página, edítalo aquí.

export const CONTACT = {
  phoneDisplay: '961 154 4298',
  phoneTel: '+529611544298',
  // Formato internacional sin "+" ni espacios (52 = México)
  whatsapp: '529611544298',
  email: 'chenekbalam1@gmail.com',
  location: 'TecNM Campus Tuxtla Gutiérrez, Chiapas, México',
  whatsappGreeting: 'Hola, equipo CHENEK BALAM. Me gustaría recibir información sobre el robot.',
  instagram: 'https://www.instagram.com/chenekbalam/',
  instagramLabel: '@chenekbalam',
  facebook: 'https://www.facebook.com/profile.php?id=61576361922860',
  facebookLabel: 'Chenek Balam Robot Ambiental',
};

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${CONTACT.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
