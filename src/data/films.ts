export interface Film {
  title: string;
  year: number;
  director: string;
}

/** Ten films, in order. Directors verified; one entry was rescued from a clerical error. */
export const topTen: Film[] = [
  { title: 'The Social Network', year: 2010, director: 'David Fincher' },
  { title: 'Interstellar', year: 2014, director: 'Christopher Nolan' },
  { title: 'Jagten', year: 2012, director: 'Thomas Vinterberg' },
  { title: 'Stalker', year: 1979, director: 'Andrei Tarkovsky' },
  { title: 'Whisper of the Heart', year: 1995, director: 'Yoshifumi Kondō' },
  { title: 'The Good, the Bad and the Ugly', year: 1966, director: 'Sergio Leone' },
  { title: 'The Irishman', year: 2019, director: 'Martin Scorsese' },
  { title: 'The Godfather Part II', year: 1974, director: 'Francis Ford Coppola' },
  { title: 'Blade Runner', year: 1982, director: 'Ridley Scott' },
  { title: 'Call Me by Your Name', year: 2017, director: 'Luca Guadagnino' },
];

/** Epigraph for the films page — the author's own words, from his notes on Fitzcarraldo. */
export const filmsEpigraph = {
  text: 'We as the audience here is the really one who lose the faith and being the antagonist the whole time. And guess what, he did it. He moved the earth. We lost.',
  source: 'from my own notes on Fitzcarraldo',
  href: '/notes/the-audience-is-the-antagonist',
};
