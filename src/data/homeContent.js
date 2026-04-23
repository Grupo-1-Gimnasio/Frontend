import lorzas8 from '../assets/lorzas8.jpg'
import lorzas9 from '../assets/lorzas9.jpg'
import lorzas10 from '../assets/lorzas10.jpg'
import lorzas11 from '../assets/lorzas11.jpg'
import testimonial1 from '../assets/testimonial-1.png'
import testimonial2 from '../assets/testimonial-2.png'
import testimonial3 from '../assets/testimonial-3.png'

export const values = [
  {
    title: 'Sin Juzgar',
    description:
      'Tu viaje es único y respetamos cada paso del camino',
  },
  {
    title: 'Espacio Seguro',
    description:
      'Un ambiente protegido donde puedes ser tú mismo sin miedo',
  },
  {
    title: 'Comunidad Real',
    description:
      'Personas auténticas que se apoyan mutuamente',
  },
  {
    title: 'Bienestar Integral',
    description:
      'Salud física, mental y emocional en armonía',
  },
]



export const featuredProfessors = [
  {
    name: 'María González',
    specialty: 'Instructora de Yoga Adaptado',
    experience: 'Especializada en movilidad reducida y cuerpos diversos',
    image: lorzas8,
  },
  {
    name: 'Michael Johnson',
    specialty: 'Entrenador de Fuerza',
    experience: 'Fuerza funcional y body positive masculino',
    image: lorzas9,
  },
  {
    name: 'Aisha Williams',
    specialty: 'Coach de Bienestar',
    experience: 'Salud en todas las tallas y empoderamiento',
    image: lorzas10,
  },
  {
    name: 'Carlos Ramírez',
    specialty: 'Instructor de Deportes Adaptados',
    experience: 'Atletismo adaptado y comunidad inclusiva',
    image: lorzas11,
  },
]

export const testimonials = [
  {
    image: testimonial1,
    alt: 'Imagen testimonial 1',
  },
  {
    image: testimonial2,
    alt: 'Imagen testimonial 2',
  },
  {
    image: testimonial3,
    alt: 'Imagen testimonial 3',
  },
]

export const footerLinks = {
  navigation: [
    { label: 'Inicio', href: '/' },
    { label: 'Actividades', href: '/#activities' },
    { label: 'Profesores', href: '/#team' },
    { label: 'Gestión', href: '/dashboard' },
  ],
  community: [
    { label: 'Instagram', href: 'https://www.instagram.com/lorzasfitness' },
    { label: 'YouTube', href: 'https://www.youtube.com/@lorzasfitness' },
    { label: 'Events', href: '/events' },
  ],
  legal: [
    { label: 'Política de privacidad', href: '/coming-soon' },
    { label: 'Términos del servicio', href: '/coming-soon' },
    { label: 'Cookies', href: '/coming-soon' },
  ],
}

export const contactInfo = {
  phone: '+34 600 123 456',
  email: 'hello@lorzasfitness.com',
  address: 'Barcelona, Spain',
  schedule: 'Mon-Fri 07:00 - 22:00 | Sat 09:00 - 14:00',
}
