export interface Book {
  title: string;
  author: string;
}

export const currentlyReading = {
  title: 'A History of Western Philosophy',
  author: 'Bertrand Russell',
  href: 'https://hardcover.app/@NaufalFahrozi',
} as const;

/** Five that survived the culling. */
export const favourites: Book[] = [
  { title: 'Discourses and Selected Writings', author: 'Epictetus' },
  { title: 'Children of Dune', author: 'Frank Herbert' },
  { title: 'Animal Farm', author: 'George Orwell' },
  { title: 'The Iliad', author: 'Homer' },
  { title: 'Also sprach Zarathustra', author: 'Friedrich Nietzsche' },
];

export const readingEpigraph = {
  text: 'He has the most who is most content with the least.',
  source: 'Diogenes of Sinope, allegedly',
};

export const hardcoverUrl = 'https://hardcover.app/@NaufalFahrozi';
export const hardcoverHandle = '@NaufalFahrozi';
