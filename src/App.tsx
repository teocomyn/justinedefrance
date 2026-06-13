import { FormEvent, useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clapperboard,
  Feather,
  History,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Newspaper,
  Play,
  Send,
  Sparkles,
  X,
  Youtube,
} from 'lucide-react'

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

const socials = [
  { label: 'YouTube', href: 'https://www.youtube.com/laprof', icon: Youtube },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: Linkedin },
]

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
            <span className="grid size-10 place-items-center rounded-full bg-gold text-ink shadow-lg shadow-gold/20">
              <Feather size={19} />
            </span>
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

        <section id="roman" className="section-shell bg-linen text-ink">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-32">
            <div className="sticky top-28 self-start">
              <p className="eyebrow text-rust">Roman phare</p>
              <h2 className="section-title mt-4">Avant d'être un symbole, la Liberté fut une femme.</h2>
              <p className="mt-6 text-lg leading-8 text-ink/68">
                Paris, 1830. Delacroix cherche l'inspiration. Jenny accompagne ses doutes. Charlotte donne chair à une
                allégorie. Le roman explore ce que signifie incarner, ou trahir, la Liberté.
              </p>
              <a
                href="https://www.placedeslibraires.fr/livre/9782889443154-adieu-liberte-justine-defrance/"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-6 py-4 font-semibold text-linen transition hover:-translate-y-1 hover:bg-rust"
              >
                Commander le roman
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="grid gap-5">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <article key={feature.title} className="reveal-card group grid gap-5 overflow-hidden rounded-2xl border border-ink/10 bg-white p-4 shadow-xl shadow-ink/5 md:grid-cols-[13rem_1fr]">
                    <div className="relative min-h-56 overflow-hidden rounded-xl bg-ink">
                      <img src={feature.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                      <span className="absolute left-3 top-3 rounded-full bg-linen/90 px-3 py-1 text-xs font-bold text-ink">
                        0{index + 1}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center p-2">
                      <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-gold/20 text-rust">
                        <Icon size={22} />
                      </div>
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-rust">{feature.label}</p>
                      <h3 className="mt-3 font-display text-3xl font-black leading-tight">{feature.title}</h3>
                      <p className="mt-4 leading-7 text-ink/64">{feature.copy}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="bio" className="relative overflow-hidden bg-forest text-linen">
          <div className="absolute inset-0 opacity-20">
            <img src="/assets/justine-book.jpg" alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-forest/80" />
          </div>
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8 lg:py-32">
            <div>
              <p className="eyebrow text-gold">Bio</p>
              <h2 className="section-title mt-4">Une autrice à plusieurs casquettes, et aucune envie de rentrer dans une seule case.</h2>
            </div>
            <div className="space-y-6 text-lg leading-9 text-linen/78">
              <p>
                Historienne de formation, titulaire d'un Master Recherche SHS consacré aux astrologues de cour au XVe
                siècle, Justine a enseigné l'histoire-géographie avant de créer en 2015 la chaîne YouTube La Prof.
              </p>
              <p>
                Ses vidéos explorent surtout l'histoire médiévale, l'histoire des femmes, l'histoire culturelle et les
                sensibilités. Ses premiers livres de vulgarisation sont parus chez Nouveau Monde éditions.
              </p>
              <p>
                Elle se tourne aujourd'hui de plus en plus vers la fiction avec Adieu, liberté, tout en poursuivant ses
                projets de transmission, de scène, d'écriture et de curiosité joyeusement dispersée.
              </p>
            </div>
          </div>
        </section>

        <section id="publications" className="section-shell bg-ink text-linen">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="eyebrow text-gold">Bibliothèque</p>
                <h2 className="section-title mt-4 max-w-4xl">Des livres pour ouvrir des mondes, puis y faire entrer des voix.</h2>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-linen/68 lg:max-w-sm">
                Nouveau projet de vulgarisation annoncé pour l'automne 2026.
              </div>
            </div>
            <div className="mt-14 grid gap-4 md:grid-cols-2">
              {publications.map((publication) => (
                <article key={publication.title} className="group rounded-2xl border border-white/10 bg-linen/[0.04] p-6 transition hover:-translate-y-1 hover:bg-linen/[0.08]">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">{publication.category}</p>
                  <h3 className="mt-4 font-display text-3xl font-black">{publication.title}</h3>
                  <p className="mt-2 text-sm text-linen/50">{publication.meta}</p>
                  <p className="mt-5 leading-7 text-linen/68">{publication.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="videos" className="bg-linen text-ink">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-32">
            <div>
              <p className="eyebrow text-rust">Vidéos</p>
              <h2 className="section-title mt-4">La Prof, l'histoire avec du rythme et du mordant.</h2>
              <p className="mt-6 text-lg leading-8 text-ink/68">
                Chroniques de Prof, Gentes Dames Badass, Moyen Âge, peintres, cartes et figures invisibilisées :
                l'histoire devient un terrain de jeu exigeant.
              </p>
              <a
                href="https://www.youtube.com/laprof"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-rust px-6 py-4 font-semibold text-linen transition hover:-translate-y-1 hover:bg-ink"
              >
                <Youtube size={19} />
                Ouvrir YouTube
              </a>
            </div>
            <div className="grid gap-5">
              <article className="video-tile min-h-[22rem] overflow-hidden rounded-3xl">
                <img src="/assets/rosa-bonheur.png" alt="Miniature de vidéo sur Rosa Bonheur" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/18 to-transparent" />
                <div className="absolute bottom-0 left-0 p-7 text-linen">
                  <Play className="mb-5 rounded-full bg-gold p-3 text-ink" size={52} />
                  <p className="text-sm uppercase tracking-[0.24em] text-gold">Nouvelle vidéo</p>
                  <h3 className="mt-2 font-display text-4xl font-black">Rosa Bonheur</h3>
                </div>
              </article>
              <article className="video-tile min-h-[18rem] overflow-hidden rounded-3xl">
                <img src="/assets/mappemonde.jpg" alt="Miniature de vidéo sur une mappemonde" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/12 to-transparent" />
                <div className="absolute bottom-0 left-0 p-7 text-linen">
                  <p className="text-sm uppercase tracking-[0.24em] text-gold">Enquête d'objet</p>
                  <h3 className="mt-2 font-display text-3xl font-black">Quel âge a ma mappemonde ?</h3>
                </div>
              </article>
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
              <h2 className="section-title mt-4">Recevoir les nouvelles publications, proposer une rencontre, parler d'écriture.</h2>
              <div className="mt-8 space-y-4 text-lg leading-8 text-ink/68">
                <p>
                  Pour l'écriture : <a className="font-semibold text-rust" href="mailto:justine.defrance@protonmail.com">justine.defrance@protonmail.com</a>
                </p>
                <p>
                  Pour la vulgarisation historique : <a className="font-semibold text-rust" href="mailto:chroniques.deprof@gmail.com">chroniques.deprof@gmail.com</a>
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
                      className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-3 font-semibold transition hover:-translate-y-1 hover:bg-ink hover:text-linen"
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

      <footer className="border-t border-white/10 bg-ink px-5 py-10 text-linen/55">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <p>Justine Defrance - Autrice, vulgarisatrice en histoire</p>
          <p className="flex items-center gap-2">
            <Newspaper size={16} />
            Site conceptuel React + Vite
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
