import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';

const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
const firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

initializeApp({
  projectId: firebaseConfig.projectId
});

const db = getFirestore(firebaseConfig.firestoreDatabaseId || '(default)');

const books = [
  {
    title: "Mastering React 19",
    author: "Jane Smith",
    description: "The ultimate guide to modern React development. Learn about server components, hooks, and performance optimization.",
    price: 499,
    category: "Development",
    coverUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
    fileUrl: "https://example.com/books/mastering-react-19.pdf"
  },
  {
    title: "Minimalist Typography",
    author: "Leo Kraft",
    description: "Design beautiful interfaces using just text and white space. A masterclass for aspiring digital designers.",
    price: 299,
    category: "Design",
    coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
    fileUrl: "https://example.com/books/minimalist-typography.pdf"
  },
  {
    title: "The Solopreneur Way",
    author: "Marcus Aurelius",
    description: "How to build a $100k/year business as a single founder. Practical systems and psychological endurance.",
    price: 899,
    category: "Business",
    coverUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    fileUrl: "https://example.com/books/solopreneur-way.pdf"
  },
  {
    title: "Python for Data Titans",
    author: "Alice Wong",
    description: "From print('Hello') to complex machine learning pipelines. The comprehensive course for data scientists.",
    price: 699,
    category: "Development",
    coverUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    fileUrl: "https://example.com/books/python-titans.pdf"
  }
];

async function seed() {
  console.log('Seeding books to projectId:', firebaseConfig.projectId, 'database:', firebaseConfig.firestoreDatabaseId);
  const batch = db.batch();
  
  for (const book of books) {
    const ref = db.collection('books').doc();
    batch.set(ref, book);
  }

  await batch.commit();
  console.log('Successfully seeded 4 books!');
}

seed().catch(console.error);
