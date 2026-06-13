import { FormEvent, useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  AtSign,
  BookMarked,
  BookOpen,
  CalendarDays,
  Clapperboard,
  Facebook,
  Feather,
  History,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Music2,
  Play,
  ScrollText,
  Send,
  Sparkles,
  Twitter,
  X,
  Youtube,
} from 'lucide-react'
import { motion } from 'motion/react'

type NavItem = {
  id: string
  label: string
}

type Feature = {
  icon: typeof Feather
  label: string
  title: string
  copy: string
  image: string
}

type Publication = {
  category: string
  title: string
  meta: string
  note: string
}

type Post = {
  title: string
  date: string
  copy: string
  image: string
  tag: string
}

const navItems: NavItem[] = [
  { id: 'roman', label: 'Roman' },
  { id: 'bio', label: 'Bio' },
  { id: 'publications', label: 'Publications' },
  { id: 'videos', label: 'Vidéos' },
  { id: 'journal', label: 'Journal' },
  { id: 'contact', label: 'Contact' },
]

const features: Feature[] = [
  {
    icon: BookOpen,
    label: 'Roman historique',
    title: "La fiction comme chambre noire de l'Histoire",
    copy: 'Adieu, liberté redonne chair à la genèse de La Liberté guidant le peuple, entre atelier enfumé, rues insurgées et attachements contraires.',
    image: '/assets/adieu-liberte.png',
  },
  {
    icon: History,
    label: 'Vulgarisation',
    title: 'Le Moyen Âge, les femmes, les angles oubliés',
    copy: 'Historienne de formation, Justine transforme les archives en récits accessibles, vifs, et toujours habités par une question de transmission.',
    image: '/assets/jenny-delacroix.jpg',
  },
  {
    icon: Clapperboard,
    label: 'La Prof',
    title: 'Des vidéos qui font bouger les statues',
    copy: "Sur YouTube, elle explore l'histoire médiévale, culturelle et féminine avec le ton d'une prof qui aurait gardé le plaisir du plateau.",
    image: '/assets/rosa-bonheur.png',
  },
]

const novelCharacters = [
  {
    name: 'Eugène',
    role: 'Le peintre',
    copy: 'Un artiste au bord du symbole, pris entre ambition, doute et vertige politique.',
  },
  {
    name: 'Jenny',
    role: 'La présence',
    copy: 'La domestique fidèle, discrète dans l’Histoire officielle, essentielle dans l’atelier.',
  },
  {
    name: 'Charlotte',
    role: 'Le visage',
    copy: 'Une lavandière farouche qui donne corps à l’allégorie et refuse d’être seulement regardée.',
  },
]

const publications: Publication[] = [
  {
    category: 'Roman',
    title: 'Adieu, liberté',
    meta: '05 février 2026 - Istya & Cie',
    note: 'Premier roman historique autour de Delacroix, Jenny et Charlotte.',
  },
  {
    category: 'Histoire',
    title: 'La vie quotidienne au Moyen Âge',
    meta: '2020 - Nouveau Monde éditions',
    note: "Une porte d'entrée vivante vers les gestes, croyances et rythmes du médiéval.",
  },
  {
    category: 'Histoire',
    title: 'Les precurseuses',
    meta: '2023 - Nouveau Monde éditions',
    note: 'Un panorama de femmes qui ont avancé avant que leur siècle ne les rattrape.',
  },
  {
    category: 'Collectif',
    title: "Les chroniques de Kin, Coeur d'ambre",
    meta: '2021 - Héros en stock',
    note: 'Contribution fantasy dans une aventure collective.',
  },
]

const posts: Post[] = [
  {
    title: "Les épigraphes d'Adieu, liberté",
    date: '5 mai 2026',
    copy: "Trois citations comme trois clefs posées à l'entrée du roman.",
    image: '/assets/adieu-cover.png',
    tag: 'Atelier',
  },
  {
    title: "Qui est enterré à côté d'Eugène Delacroix ?",
    date: '23 avril 2026',
    copy: 'Jenny, Jeanne-Marie Le Guillou, et une présence discrètement essentielle.',
    image: '/assets/jenny-delacroix.jpg',
    tag: 'Archive',
  },
  {
    title: 'Adieu, liberté : calendrier de dédicaces',
    date: '9 avril 2026',
    copy: 'Les rencontres en librairie autour du premier roman.',
    image: '/assets/dedicaces.png',
    tag: 'Rencontres',
  },
  {
    title: 'Nouvelle vidéo : quel âge a ma mappemonde ?',
    date: '16 mars 2026',
    copy: 'Un objet, des pays disparus, et un peu de géopolitique du XXe siècle.',
    image: '/assets/mappemonde.jpg',
    tag: 'Video',
  },
]

const videoSpotlights = [
  {
    title: 'Rosa Bonheur',
    label: 'Gentes Dames Badass',
    copy: 'Une peintre du XIXe siècle libre, célèbre, indépendante, et bien plus politique qu’un simple portrait animalier.',
    image: '/assets/rosa-bonheur.png',
  },
  {
    title: 'Quel âge a ma mappemonde ?',
    label: 'Enquête d’objet',
    copy: 'Une carte, des pays disparus, et une façon très concrète de faire parler la géopolitique.',
    image: '/assets/mappemonde.jpg',
  },
  {
    title: 'Rosalind Franklin',
    label: 'Figure invisibilisée',
    copy: 'Une histoire de science, d’effacement, de sexisme et de mémoire à remettre au centre.',
    image: '/assets/jenny-delacroix.jpg',
  },
]

const bioRoles = [
  {
    icon: History,
    label: 'Historienne',
    text: 'Master Recherche SHS, mémoire sur les astrologues de cour au XVe siècle.',
  },
  {
    icon: Clapperboard,
    label: 'Vulgarisatrice',
    text: 'Créatrice de La Prof, entre Moyen Âge, histoire des femmes et culture visuelle.',
  },
  {
    icon: Feather,
    label: 'Autrice',
    text: 'De la vulgarisation au roman historique, avec un goût net pour les voix oubliées.',
  },
]

const bioMilestones = [
  {
    year: '2015',
    title: 'La Prof',
    text: 'Une chaîne YouTube pour raconter l’histoire sans l’assécher.',
  },
  {
    year: '2020',
    title: 'Nouveau Monde',
    text: 'Premiers livres de vulgarisation historique en librairie.',
  },
  {
    year: '2026',
    title: 'Adieu, liberté',
    text: 'Premier roman, entre Delacroix, Jenny, Charlotte et la fabrique d’un symbole.',
  },
]

const socials = [
  { label: 'YouTube', href: 'https://www.youtube.com/laprof', icon: Youtube },
  { label: 'Instagram', href: 'https://www.instagram.com/justine_defrance', icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/justinedefrance/', icon: Linkedin },
  { label: 'Facebook', href: 'https://www.facebook.com/ChroniquesdeProf', icon: Facebook },
  { label: 'Bluesky', href: 'https://bsky.app/profile/justinedefrance.bsky.social', icon: Twitter },
]

const footerColumns = [
  {
    title: 'Explorer',
    links: [
      { label: 'Bio', href: '#bio' },
      { label: 'Publications', href: '#publications' },
      { label: 'Vidéos', href: '#videos' },
      { label: 'Journal', href: '#journal' },
    ],
  },
  {
    title: 'Univers',
    links: [
      { label: 'Adieu, liberté', href: '#roman' },
      { label: 'La Prof', href: 'https://www.youtube.com/laprof' },
      { label: 'Histoire des femmes', href: '#videos' },
      { label: 'Rencontres', href: 'https://justinedefrance.fr/blog/' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Écriture', href: 'mailto:justine.defrance@protonmail.com' },
      { label: 'Vulgarisation', href: 'mailto:chroniques.deprof@gmail.com' },
      { label: 'Newsletter', href: 'https://justinedefrance.fr/newsletter/' },
      { label: 'Site officiel', href: 'https://justinedefrance.fr/' },
    ],
  },
]

const footerSocials = [
  { label: 'YouTube', href: 'https://www.youtube.com/laprof', icon: Youtube },
  { label: 'Instagram', href: 'https://www.instagram.com/justine_defrance', icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/justinedefrance/', icon: Linkedin },
  { label: 'Facebook', href: 'https://www.facebook.com/ChroniquesdeProf', icon: Facebook },
  { label: 'Bluesky', href: 'https://bsky.app/profile/justinedefrance.bsky.social', icon: Twitter },
]

function BrandMark({ className = '' }: { className?: string }) {
  return (
    <span className={`brand-mark-shell ${className}`} aria-hidden="true">
      <span className="brand-mark-initials">JD</span>
      <span className="brand-mark-rule" />
    </span>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('accueil')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [sent, setSent] = useState(false)

  const allSections = useMemo(() => ['accueil', ...navItems.map((item) => item.id)], [])

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrollable > 0 ? window.scrollY / scrollable : 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) {
          setActiveSection(visible.target.id)
        }
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0.08, 0.25, 0.5] },
    )

    allSections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [allSections])

  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-linen selection:bg-gold selection:text-ink">
      <div
        className="fixed left-0 top-0 z-50 h-1 bg-gold transition-[width] duration-150"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <header className="fixed left-0 right-0 top-0 z-40 px-4 py-4 sm:px-6 lg:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-ink/70 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-2xl">
          <a href="#accueil" className="group flex items-center gap-3" aria-label="Accueil Justine Defrance">
            <BrandMark className="size-11 shrink-0" />
            <span className="leading-tight">
              <span className="block font-display text-base font-semibold tracking-wide">Justine Defrance</span>
              <span className="hidden text-xs uppercase tracking-[0.28em] text-linen/55 sm:block">Autrice histoire</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  activeSection === item.id ? 'bg-linen text-ink' : 'text-linen/70 hover:bg-white/10 hover:text-linen'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="mailto:justine.defrance@protonmail.com"
            className="hidden items-center gap-2 rounded-full bg-rust px-4 py-2 text-sm font-semibold text-linen shadow-lg shadow-rust/20 transition hover:-translate-y-0.5 hover:bg-coral md:flex"
          >
            <Mail size={16} />
            Écrire
          </a>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-white/10 text-linen lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-label="Ouvrir la navigation"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/10 bg-ink/95 p-3 shadow-2xl backdrop-blur-2xl lg:hidden">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className="block rounded-2xl px-4 py-3 text-linen/80 hover:bg-white/10 hover:text-linen"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        <section id="accueil" className="relative min-h-screen overflow-hidden pt-28">
          <div className="absolute inset-0">
            <img src="/assets/justine-portrait.jpg" alt="" className="h-full w-full object-cover opacity-45" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,16,11,0.95)_0%,rgba(23,16,11,0.82)_42%,rgba(23,16,11,0.34)_100%)]" />
            <div className="paper-grain absolute inset-0 opacity-35" />
          </div>

          <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-12 px-5 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.78fr)] lg:gap-8 lg:px-8">
            <div className="relative z-20 max-w-3xl">
              <div className="mb-6 inline-flex max-w-full items-center gap-3 rounded-full border border-gold/25 bg-ink/45 px-4 py-2 text-xs uppercase tracking-[0.28em] text-gold shadow-2xl shadow-black/20 backdrop-blur-xl">
                <Sparkles size={15} />
                Roman historique - vulgarisation - scène
              </div>
              <h1 className="hero-title font-display font-black uppercase text-linen">
                <span className="hero-title-first">Justine</span>
                <span className="hero-title-last">Defrance</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-linen/78 sm:text-xl">
                Autrice, vulgarisatrice en histoire et comédienne. Une voix qui traverse les archives, les plateaux et
                les romans pour raconter les vies qui résistent à l'oubli.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#roman"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold px-6 py-4 font-semibold text-ink shadow-2xl shadow-gold/20 transition hover:-translate-y-1"
                >
                  Découvrir Adieu, liberté
                  <ArrowRight className="transition group-hover:translate-x-1" size={18} />
                </a>
                <a
                  href="#videos"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-linen/20 bg-linen/8 px-6 py-4 font-semibold text-linen backdrop-blur transition hover:-translate-y-1 hover:bg-linen/14"
                >
                  <Play size={18} />
                  Voir La Prof
                </a>
              </div>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[31rem] lg:mr-0 xl:translate-x-7">
              <div className="absolute -left-4 top-10 z-20 hidden rounded-full border border-gold/35 bg-ink/76 px-5 py-3 text-sm text-linen/80 shadow-2xl backdrop-blur-xl sm:block">
                Crédit photo : Marie-Hélène Tercafs
              </div>
              <div className="hero-object relative aspect-[0.78] overflow-hidden rounded-[2rem] border border-white/14 bg-linen/10 p-3 shadow-[0_40px_120px_rgba(0,0,0,0.42)]">
                <img
                  src="/assets/profil.jpg"
                  alt="Portrait de Justine Defrance"
                  className="h-full w-full rounded-[1.45rem] object-cover"
                />
              </div>
              <div className="absolute -bottom-8 right-0 z-30 w-40 rotate-[5deg] rounded-2xl border border-white/15 bg-linen p-2 shadow-2xl sm:w-52 lg:-right-8">
                <img src="/assets/adieu-liberte.png" alt="Couverture du roman Adieu, liberté" className="w-full rounded-xl" />
              </div>
            </div>
          </div>
        </section>

        <section id="roman" className="relative overflow-hidden bg-linen text-ink">
          <div className="absolute inset-0">
            <img src="/assets/adieu-cover.png" alt="" className="h-full w-full object-cover opacity-12" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(245,234,216,0.98)_0%,rgba(245,234,216,0.92)_48%,rgba(245,234,216,0.78)_100%)]" />
            <div className="paper-grain absolute inset-0 opacity-30 mix-blend-multiply" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
            >
              <div>
                <p className="eyebrow text-rust">Roman phare</p>
                <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.65rem,5.25vw,5.8rem)] font-black leading-[0.94]">
                  Avant le symbole,
                  <span className="block text-rust">une femme.</span>
                </h2>
              </div>
              <div className="max-w-2xl border-l border-rust/25 pl-6 text-lg leading-8 text-ink/68">
                Paris, 1830. Eugène Delacroix cherche l’inspiration pour peindre La Liberté guidant le peuple. À ses
                côtés, Jenny veille, Charlotte surgit, et la fiction s’empare de ce que l’Histoire ne peut pas prouver.
              </div>
            </motion.div>

            <div className="mt-14 grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
              <motion.article
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative overflow-hidden rounded-[1.75rem] bg-ink p-4 text-linen shadow-[0_35px_110px_rgba(23,16,11,0.22)] sm:p-5"
              >
                <div className="absolute inset-0">
                  <img src="/assets/adieu-cover.png" alt="" className="h-full w-full object-cover opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/84 to-ink/36" />
                </div>
                <div className="relative grid gap-6 sm:gap-8 md:grid-cols-[minmax(9rem,14rem)_minmax(0,1fr)] md:items-center">
                  <div className="mx-auto w-full max-w-[11.5rem] sm:max-w-[13rem] md:max-w-[14rem]">
                    <img
                      src="/assets/adieu-liberte.png"
                      alt="Couverture du roman Adieu, liberté"
                      className="w-full rotate-[-4deg] rounded-xl border border-white/20 shadow-2xl shadow-black/50"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold sm:text-xs sm:tracking-[0.26em]">
                      Istya & Cie - 05 février 2026
                    </p>
                    <h3 className="mt-4 font-display text-[clamp(2.25rem,8vw,3.75rem)] font-black leading-[0.95]">Adieu, liberté</h3>
                    <p className="mt-6 text-lg leading-8 text-linen/72">
                      Une histoire de révoltes, d’amour, de jalousie et de quête de liberté autour de la naissance d’un
                      tableau mythique.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-2.5 text-sm">
                      {['Paris', '1830', 'Atelier', 'Insurrection'].map((item) => (
                        <span key={item} className="max-w-full rounded-full border border-gold/25 bg-gold/10 px-3 py-2 text-center font-semibold text-gold">
                          {item}
                        </span>
                      ))}
                    </div>
                    <a
                      href="https://www.placedeslibraires.fr/livre/9782889443154-adieu-liberte-justine-defrance/"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-flex w-full max-w-[22rem] items-center justify-center gap-3 rounded-full bg-gold px-5 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-1 hover:bg-linen sm:w-auto sm:max-w-none sm:px-6 sm:py-4 sm:text-base"
                    >
                      <span>Commander le roman</span>
                      <ArrowRight size={18} />
                    </a>
                  </div>
                </div>
              </motion.article>

              <div className="grid gap-5">
                <div className="grid gap-3 sm:grid-cols-3">
                  {novelCharacters.map((character, index) => (
                    <motion.article
                      key={character.name}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
                      className="min-w-0 border-l border-rust/30 bg-white/70 p-5 shadow-xl shadow-ink/5 backdrop-blur"
                    >
                      <p className="text-xs font-black uppercase tracking-[0.24em] text-rust">{character.role}</p>
                      <h3 className="mt-3 font-display text-[clamp(1.7rem,4vw,2rem)] font-black leading-tight">{character.name}</h3>
                      <p className="mt-4 text-sm leading-6 text-ink/62">{character.copy}</p>
                    </motion.article>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {features.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <motion.article
                        key={feature.title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
                        className="group min-w-0 overflow-hidden rounded-2xl border border-ink/10 bg-white p-4 shadow-xl shadow-ink/5"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink">
                          <img src={feature.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink/74 to-transparent" />
                          <Icon className="absolute bottom-4 left-4 text-gold" size={26} />
                        </div>
                        <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-rust">{feature.label}</p>
                        <h3 className="mt-3 font-display text-2xl font-black leading-tight">{feature.title}</h3>
                        <p className="mt-4 text-sm leading-6 text-ink/64">{feature.copy}</p>
                      </motion.article>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="bio" className="relative overflow-hidden bg-forest text-linen">
          <div className="absolute inset-0">
            <img src="/assets/justine-book.jpg" alt="" className="h-full w-full object-cover opacity-16" />
            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(23,53,44,0.98)_0%,rgba(23,53,44,0.9)_48%,rgba(23,53,44,0.72)_100%)]" />
            <div className="paper-grain absolute inset-0 opacity-20" />
          </div>
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-28">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow text-gold">Bio</p>
              <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.15rem,3.35vw,3.8rem)] font-black leading-[1]">
                Plusieurs vies d’histoire.
                <span className="block text-gold">Une même voix.</span>
              </h2>
              <p className="mt-7 max-w-xl text-lg leading-8 text-linen/72">
                Justine avance entre archives, caméra, scène et fiction avec la même obsession : rendre visibles les
                présences que le récit officiel laisse souvent dans l’ombre.
              </p>
              <div className="mt-9 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {bioRoles.map((role) => {
                  const Icon = role.icon
                  return (
                    <article key={role.label} className="border-l border-gold/40 bg-linen/[0.04] p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-3 text-gold">
                        <Icon size={19} />
                        <h3 className="text-sm font-bold uppercase tracking-[0.22em]">{role.label}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-linen/64">{role.text}</p>
                    </article>
                  )
                })}
              </div>
            </div>

            <div className="grid gap-5">
              <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
                <div className="border-y border-white/12 bg-linen/[0.035] px-5 py-6 backdrop-blur-sm">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">Trajectoire</p>
                  <p className="mt-4 text-lg leading-8 text-linen/84">
                    D’abord historienne de formation, elle a enseigné, vulgarisé, écrit des livres d’histoire, puis
                    ouvert plus largement la porte de la fiction.
                  </p>
                </div>

                <div className="bg-gold p-5 text-ink shadow-2xl shadow-black/20 sm:p-6">
                  <p className="font-display text-2xl font-black leading-tight">
                    “Être dispersée me convient aussi très bien.”
                  </p>
                  <p className="mt-3 text-sm font-semibold text-ink/62">
                    Une bio qui assume la pluralité comme moteur, pas comme détour.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {bioMilestones.map((item) => (
                  <article key={item.year} className="grid min-w-0 grid-cols-[4rem_minmax(0,1fr)] gap-4 border-b border-white/10 bg-linen/[0.03] p-4 last:border-b-0">
                    <p className="font-display text-[clamp(1.8rem,4vw,2rem)] font-black text-gold">{item.year}</p>
                    <div className="min-w-0">
                      <h3 className="font-display text-[clamp(1.45rem,3vw,1.65rem)] font-black leading-tight">{item.title}</h3>
                      <p className="mt-2 leading-7 text-linen/64">{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="publications" className="relative overflow-hidden bg-ink text-linen">
          <div className="absolute inset-0">
            <img src="/assets/adieu-cover.png" alt="" className="h-full w-full object-cover opacity-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(228,187,103,0.18),transparent_34%),linear-gradient(180deg,rgba(23,16,11,0.96),rgba(23,16,11,1))]" />
            <div className="paper-grain absolute inset-0 opacity-18" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <p className="eyebrow text-gold">Bibliothèque</p>
                <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.55rem,4.95vw,5.35rem)] font-black leading-[0.96]">
                  Des livres comme
                  <span className="block text-gold">des portes dérobées.</span>
                </h2>
              </div>
              <div className="max-w-2xl border-l border-gold/40 pl-6 text-lg leading-8 text-linen/70">
                De la vulgarisation historique au roman, les publications de Justine font circuler les mêmes obsessions :
                rendre le passé vivant, déplacer le regard, et laisser entrer celles et ceux qu’on avait oubliés hors
                champ.
              </div>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              <article className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-linen/[0.06] p-4 shadow-[0_35px_110px_rgba(0,0,0,0.32)] sm:p-5">
                <div className="grid gap-7 md:grid-cols-[minmax(10rem,16rem)_minmax(0,1fr)] md:items-center">
                  <div className="relative mx-auto w-full max-w-[15rem]">
                    <div className="absolute -inset-5 rounded-full bg-gold/18 blur-3xl" />
                    <img
                      src="/assets/adieu-liberte.png"
                      alt="Couverture du roman Adieu, liberté"
                      className="relative w-full rotate-[-3deg] rounded-xl border border-white/20 shadow-2xl shadow-black/45"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold sm:tracking-[0.26em]">Roman historique</p>
                    <h3 className="mt-4 font-display text-[clamp(2.25rem,8vw,3.75rem)] font-black leading-[0.95]">Adieu, liberté</h3>
                    <p className="mt-3 text-xs uppercase tracking-[0.16em] text-linen/48 sm:text-sm sm:tracking-[0.2em]">
                      05 février 2026 - Istya & Cie
                    </p>
                    <p className="mt-6 text-lg leading-8 text-linen/72">
                      Paris, 1830. Delacroix cherche l’inspiration, Jenny accompagne ses doutes, Charlotte donne chair à
                      une allégorie. Un premier roman sur la fabrique d’un tableau, d’un mythe et d’une liberté.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-2.5">
                      {['Delacroix', 'Jenny', 'Charlotte', '1830'].map((tag) => (
                        <span key={tag} className="max-w-full rounded-full border border-gold/30 bg-gold/10 px-3 py-2 text-sm font-semibold text-gold sm:px-4">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href="https://www.placedeslibraires.fr/livre/9782889443154-adieu-liberte-justine-defrance/"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-flex w-full max-w-[22rem] items-center justify-center gap-3 rounded-full bg-gold px-5 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-1 hover:bg-linen sm:w-auto sm:max-w-none sm:px-6 sm:py-4 sm:text-base"
                    >
                      <BookOpen size={18} />
                      Trouver le roman
                    </a>
                  </div>
                </div>
              </article>

              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-gold p-5 text-ink">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-ink/55">À venir</p>
                    <p className="mt-4 font-display text-3xl font-black leading-tight">Vulgarisation historique</p>
                    <p className="mt-4 leading-7 text-ink/68">Nouveau projet annoncé pour l’automne 2026.</p>
                  </div>
                  <div className="border border-white/12 bg-white/[0.04] p-5">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">Fil rouge</p>
                    <p className="mt-4 font-display text-3xl font-black leading-tight">Histoire, femmes, mentalités</p>
                    <p className="mt-4 leading-7 text-linen/62">Des livres pour relier savoir, récit et incarnation.</p>
                  </div>
                </div>

                {publications.slice(1).map((publication) => (
                  <article
                    key={publication.title}
                    className="group grid min-w-0 gap-4 border-b border-white/10 bg-linen/[0.03] p-5 transition hover:bg-linen/[0.07] sm:grid-cols-[8.5rem_minmax(0,1fr)]"
                  >
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">{publication.category}</p>
                      <p className="mt-3 text-sm text-linen/45">{publication.meta}</p>
                    </div>
                    <div>
                      <h3 className="font-display text-[clamp(1.75rem,4vw,2rem)] font-black leading-tight">{publication.title}</h3>
                      <p className="mt-3 leading-7 text-linen/64">{publication.note}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="videos" className="relative overflow-hidden bg-linen text-ink">
          <div className="absolute inset-0">
            <img src="/assets/rosa-bonheur.png" alt="" className="h-full w-full object-cover opacity-12" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,234,216,0.96),rgba(245,234,216,0.9))]" />
            <div className="paper-grain absolute inset-0 opacity-25 mix-blend-multiply" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <p className="eyebrow text-rust">La Prof</p>
                <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.55rem,5.05vw,5.45rem)] font-black leading-[0.94]">
                  Des vidéos qui
                  <span className="block text-rust">déplacent le regard.</span>
                </h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                className="max-w-2xl border-l border-rust/25 pl-6"
              >
                <p className="text-lg leading-8 text-ink/68">
                  Moyen Âge, femmes artistes, sciences oubliées, objets à dater : la vulgarisation devient un format
                  vivant, précis, accessible, avec le plaisir très net de raconter.
                </p>
                <a
                  href="https://www.youtube.com/laprof"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex w-full max-w-[20rem] items-center justify-center gap-3 rounded-full bg-rust px-5 py-3.5 text-sm font-semibold text-linen transition hover:-translate-y-1 hover:bg-ink sm:w-auto sm:max-w-none sm:px-6 sm:py-4 sm:text-base"
                >
                  <Youtube size={19} />
                  Ouvrir YouTube
                </a>
              </motion.div>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.article
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.75, ease: 'easeOut' }}
                className="video-tile min-h-[28rem] overflow-hidden rounded-[1.75rem] sm:min-h-[32rem] lg:min-h-[34rem]"
              >
                <img src="/assets/rosa-bonheur.png" alt="Miniature de vidéo sur Rosa Bonheur" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/28 to-transparent" />
                <div className="absolute left-0 right-0 top-0 flex flex-wrap items-center justify-between gap-2 p-4 sm:p-5">
                  <span className="rounded-full bg-gold px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.16em] text-ink sm:px-4 sm:text-xs sm:tracking-[0.2em]">
                    Épisode phare
                  </span>
                  <span className="rounded-full border border-white/20 bg-ink/35 px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-linen backdrop-blur-xl sm:px-4 sm:text-xs sm:tracking-[0.18em]">
                    Gentes Dames Badass
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 max-w-2xl p-5 text-linen sm:p-8">
                  <Play className="mb-5 rounded-full bg-gold p-3 text-ink shadow-2xl shadow-black/25 sm:p-4" size={58} />
                  <h3 className="font-display text-[clamp(2.35rem,8vw,3.8rem)] font-black leading-[0.95]">Rosa Bonheur</h3>
                  <p className="mt-5 max-w-xl text-base leading-7 text-linen/70 sm:text-lg sm:leading-8">
                    Une peintre libre, célèbre, indépendante, et une parfaite passerelle vers les figures féminines du
                    XIXe siècle.
                  </p>
                </div>
              </motion.article>

              <div className="grid gap-4">
                {videoSpotlights.map((video, index) => (
                  <motion.article
                    key={video.title}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
                    className="group grid min-w-0 gap-4 overflow-hidden rounded-2xl border border-ink/10 bg-white/76 p-3 shadow-xl shadow-ink/5 backdrop-blur sm:grid-cols-[10rem_minmax(0,1fr)]"
                  >
                    <div className="relative min-h-40 overflow-hidden rounded-xl bg-ink">
                      <img src={video.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/65 to-transparent" />
                      <Play className="absolute bottom-3 left-3 rounded-full bg-gold p-2 text-ink" size={38} />
                    </div>
                    <div className="flex flex-col justify-center p-2">
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-rust">{video.label}</p>
                      <h3 className="mt-3 font-display text-[clamp(1.75rem,4vw,2rem)] font-black leading-tight">{video.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-ink/62">{video.copy}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-4">
              {['Moyen Âge', 'Femmes oubliées', 'Objets & cartes', 'Histoire culturelle'].map((theme, index) => (
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
                  className="border border-ink/10 bg-white/65 p-5 text-center shadow-xl shadow-ink/5"
                >
                  <p className="font-display text-[clamp(1.35rem,4vw,1.55rem)] font-black leading-tight">{theme}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="journal" className="bg-copper text-linen">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
            <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="eyebrow text-gold">Journal</p>
                <h2 className="section-title mt-4 max-w-4xl">Les dernières nouvelles depuis l'atelier, les archives et les librairies.</h2>
              </div>
              <a href="https://justinedefrance.fr/blog/" className="inline-flex items-center gap-3 text-linen/80 hover:text-gold">
                Tout lire
                <ArrowRight size={18} />
              </a>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {posts.map((post) => (
                <article key={post.title} className="group overflow-hidden rounded-2xl border border-white/10 bg-ink/22 shadow-xl shadow-black/10">
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                    <img src={post.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink">
                      {post.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="flex items-center gap-2 text-sm text-linen/50">
                      <CalendarDays size={15} />
                      {post.date}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-black leading-tight">{post.title}</h3>
                    <p className="mt-4 leading-7 text-linen/62">{post.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-linen text-ink">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-32">
            <div>
              <p className="eyebrow text-rust">Contact & newsletter</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,3.1vw,3.35rem)] font-black leading-[1.08]">
                Recevoir les nouvelles publications, proposer une rencontre, parler d'écriture.
              </h2>
              <div className="mt-8 space-y-4 text-lg leading-8 text-ink/68">
                <p>
                  Pour l'écriture : <a className="break-all font-semibold text-rust" href="mailto:justine.defrance@protonmail.com">justine.defrance@protonmail.com</a>
                </p>
                <p>
                  Pour la vulgarisation historique : <a className="break-all font-semibold text-rust" href="mailto:chroniques.deprof@gmail.com">chroniques.deprof@gmail.com</a>
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {socials.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex max-w-full items-center gap-2 rounded-full border border-ink/10 px-4 py-3 font-semibold transition hover:-translate-y-1 hover:bg-ink hover:text-linen"
                    >
                      <Icon size={18} />
                      {social.label}
                    </a>
                  )
                })}
              </div>
            </div>

            <form onSubmit={handleContact} className="rounded-3xl border border-ink/10 bg-white p-5 shadow-2xl shadow-ink/10 sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="field-label">
                  Nom
                  <input required className="field-input" placeholder="Votre nom" />
                </label>
                <label className="field-label">
                  E-mail
                  <input required type="email" className="field-input" placeholder="vous@email.fr" />
                </label>
              </div>
              <label className="field-label mt-4">
                Message
                <textarea required className="field-input min-h-44 resize-y" placeholder="Bonjour Justine..." />
              </label>
              <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-ink px-6 py-4 font-semibold text-linen transition hover:-translate-y-1 hover:bg-rust">
                <Send size={18} />
                {sent ? 'Message prêt à envoyer' : 'Envoyer le message'}
              </button>
              {sent && (
                <p className="mt-4 rounded-2xl bg-gold/20 p-4 text-sm leading-6 text-ink/70">
                  Prototype local : le formulaire confirme l'intention. En production, il faut le connecter à un service
                  d'envoi ou au formulaire WordPress existant.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <div className="relative overflow-hidden bg-ink px-5 py-16 text-linen sm:px-6 lg:px-8 lg:py-20">
        <div className="absolute inset-0">
          <img src="/assets/jenny-delacroix.jpg" alt="" className="h-full w-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,16,11,0.98),rgba(23,16,11,0.9)_42%,rgba(23,16,11,1))]" />
          <div className="paper-grain absolute inset-0 opacity-16" />
        </div>

        <motion.footer
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="liquid-glass relative mx-auto mt-0 w-full max-w-7xl rounded-3xl p-6 text-linen/70 md:p-10"
        >
          <div className="grid grid-cols-1 gap-10 md:mb-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <a href="#accueil" className="group inline-flex max-w-full items-center gap-4 text-linen" aria-label="Retour à l'accueil">
                <BrandMark className="size-14 shrink-0 transition group-hover:-translate-y-1" />
                <span className="min-w-0">
                  <span className="block font-display text-[clamp(1.45rem,6vw,1.5rem)] font-black leading-none">Justine Defrance</span>
                  <span className="mt-2 block text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.28em]">
                    Autrice - Histoire - Fiction
                  </span>
                </span>
              </a>

              <p className="mt-7 max-w-sm text-sm leading-7 text-linen/62">
                Romans historiques, vulgarisation, vidéos et carnets d’atelier : un lieu pour suivre les livres, les
                archives et les voix que Justine remet en lumière.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3 md:max-w-md">
                <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <BookMarked className="text-gold" size={20} />
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-linen/45">Roman</p>
                  <p className="mt-1 font-display text-xl font-black text-linen">Adieu, liberté</p>
                </div>
                <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <ScrollText className="text-gold" size={20} />
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-linen/45">Projet</p>
                  <p className="mt-1 font-display text-xl font-black text-linen">Automne 2026</p>
                </div>
                <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <Music2 className="text-gold" size={20} />
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-linen/45">Chaîne</p>
                  <p className="mt-1 font-display text-xl font-black text-linen">La Prof</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                {footerColumns.map((column) => (
                  <div key={column.title}>
                    <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-linen">{column.title}</h3>
                    <ul className="mt-5 space-y-3">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <a href={link.href} className="text-sm text-linen/55 transition hover:text-gold">
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-3xl border border-white/10 bg-ink/42 p-5 backdrop-blur-xl">
                <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-gold">
                      <AtSign size={16} />
                      Rester dans la boucle
                    </p>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-linen/60">
                      Pour une invitation, une dédicace, une question d’écriture ou une collaboration autour de
                      l’histoire.
                    </p>
                  </div>
                  <a
                    href="mailto:justine.defrance@protonmail.com"
                    className="inline-flex w-full max-w-[20rem] items-center justify-center gap-3 rounded-full bg-gold px-5 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-1 hover:bg-linen sm:w-auto sm:max-w-none sm:px-6 sm:py-4 sm:text-base"
                  >
                    Écrire
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between md:gap-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-linen/42 sm:tracking-[0.28em]">
              © 2026 Justine Defrance - Crédit photo : Marie-Hélène Tercafs
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <span className="text-[10px] uppercase tracking-[0.18em] text-linen/42 sm:tracking-[0.28em]">Suivre le fil :</span>
              <div className="flex flex-wrap gap-2">
                {footerSocials.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-linen/62 transition hover:-translate-y-1 hover:border-gold/40 hover:text-gold"
                    >
                      <Icon size={17} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}

export default App
