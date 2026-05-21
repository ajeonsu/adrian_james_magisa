export type KaggleBadge = {
  slug: string;
  title: string;
  url: string;
  year: string;
  detail: string;
};

/** Portfolio paths → Kaggle certification badge pages */
export const kaggleBadges: KaggleBadge[] = [
  {
    slug: "dataset-creator",
    title: "Dataset Creator",
    url: "https://www.kaggle.com/certification/badges/adrianjamesmagisaa/17",
    year: "2025",
    detail: "Published and shared datasets on Kaggle.",
  },
  {
    slug: "code-forker",
    title: "Code Forker",
    url: "https://www.kaggle.com/certification/badges/adrianjamesmagisaa/38",
    year: "2025",
    detail: "Forked and extended community notebooks on Kaggle.",
  },
  {
    slug: "python-coder",
    title: "Python Coder",
    url: "https://www.kaggle.com/certification/badges/adrianjamesmagisaa/30",
    year: "2025",
    detail: "Python notebooks and analysis on Kaggle.",
  },
];

export function kaggleBadgePath(slug: string) {
  return `/cert/kaggle/${slug}`;
}
