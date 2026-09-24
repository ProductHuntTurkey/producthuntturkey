import type { CollectionEntry } from 'astro:content';

type Launch = CollectionEntry<'launches'>['data'];
type Company = CollectionEntry<'companies'>['data'];

const dateFormat = new Intl.DateTimeFormat('tr-TR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(iso: string): string {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`));
}

export function launchDateLabel(launch: Launch): string {
  return launch.launchDate ? formatDate(launch.launchDate) : `${launch.launchYear} (gün bilinmiyor)`;
}

export type Status = 'dogrulandi' | 'kismi' | 'arsiv';

export const statusLabels: Record<Status, string> = {
  dogrulandi: 'Doğrulandı',
  kismi: 'Kısmen doğrulandı',
  arsiv: 'Arşiv — doğrulanmadı',
};

export const statusHints: Record<Status, string> = {
  dogrulandi: 'Türkiye bağlantısı kaynaklarla doğrulandı.',
  kismi: 'Bir Türkiye bağlantısı doğrulandı; diğer alanlar açık.',
  arsiv: '2018–2020 listesinden geliyor; Türkiye bağlantısı yeniden kontrol edilmedi.',
};

export function launchStatus(company: Company | undefined): Status {
  return company ? company.status : 'arsiv';
}

export const connectionFields: { key: keyof Company['connection']; label: string }[] = [
  { key: 'turkishFounder', label: 'Türk kurucu' },
  { key: 'turkeyHeadquartered', label: 'Merkez Türkiye’de' },
  { key: 'turkeyOperations', label: 'Türkiye’de operasyon' },
  { key: 'makerTurkeyLink', label: 'Maker’ın Türkiye bağlantısı' },
];

export function connectionValue(value: boolean | null): string {
  if (value === null) return 'Bilinmiyor';
  return value ? 'Evet' : 'Hayır';
}

/** Filtrelerde kullanılan bağlantı türleri: yalnızca true olan alanlar sayılır. */
export function connectionKeys(company: Company | undefined): string[] {
  if (!company) return [];
  return connectionFields.filter((f) => company.connection[f.key] === true).map((f) => f.key);
}

/** En yeni lansman önce; yalnızca yılı bilinenler o yılın sonuna yerleşir. */
export function sortLaunches<T extends { data: Launch }>(launches: T[]): T[] {
  const key = (l: T) => l.data.launchDate ?? `${l.data.launchYear}-00-00`;
  return [...launches].sort((a, b) => key(b).localeCompare(key(a)) || a.data.name.localeCompare(b.data.name, 'tr'));
}
