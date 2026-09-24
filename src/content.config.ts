import { defineCollection, reference } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

// Bilinmeyen değer her zaman null'dır, asla false değildir.
const unknownBool = z.boolean().nullable();

const companies = defineCollection({
  loader: file('src/data/companies.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    website: z.url().nullable(),
    people: z.array(
      z.object({
        name: z.string(),
        role: z.enum(['kurucu', 'maker']),
      }),
    ),
    headquarters: z.string().nullable(),
    connection: z.object({
      turkishFounder: unknownBool,
      turkeyHeadquartered: unknownBool,
      turkeyOperations: unknownBool,
      makerTurkeyLink: unknownBool,
    }),
    // dogrulandi: en az bir Türkiye bağlantısı kaynakla doğrulandı ve sınıflama tamamlandı.
    // kismi: bir bağlantı doğrulandı, diğer alanlar açık.
    status: z.enum(['dogrulandi', 'kismi']),
    evidence: z
      .array(
        z.object({
          url: z.url(),
          title: z.string(),
          supports: z.array(z.string()),
          summary: z.string(),
          checkedAt: z.iso.date(),
        }),
      )
      .min(1),
  }),
});

const launches = defineCollection({
  loader: file('src/data/launches.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    phUrl: z.url().nullable(),
    image: z.string().nullable(),
    launchDate: z.iso.date().nullable(),
    launchYear: z.number().int(),
    datePrecision: z.enum(['day', 'year']),
    company: reference('companies').nullable(),
    // arsiv: 2018–2020 sitesinden gelen, Türkiye bağlantısı yeniden doğrulanmamış kayıt.
    // pilot: kaynaklı araştırmayla eklenen kayıt.
    origin: z.enum(['arsiv', 'pilot']),
    dailyRankObserved: z.number().int().nullable(),
    notes: z.string().nullable(),
  }),
});

export const collections = { companies, launches };
