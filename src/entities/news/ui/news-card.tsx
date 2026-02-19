import dayjs from "dayjs";

import { Tile } from "@/shared/components/layout";

import type { NewsItem } from "../types";

export type NewsCardProps = {
  news: NewsItem;
};

const formatPublishedAt = (datetime: number) => {
  const normalizedTimestamp = datetime > 1_000_000_000_000
    ? dayjs(datetime)
    : dayjs.unix(datetime);

  return normalizedTimestamp.isValid()
    ? normalizedTimestamp.format("YYYY-MM-DD HH:mm")
    : "-";
};

export function NewsCard({ news }: NewsCardProps) {
  const publishedAt = formatPublishedAt(news.datetime);
  const hasImage = news.image.trim().length > 0;

  return (
    <Tile className="p-4">
      <article className="flex gap-4">
        <div className="w-28 shrink-0">
          {hasImage ? (
            <div
              aria-label={`${news.headline} thumbnail`}
              className="h-28 w-28 rounded-md bg-center bg-cover bg-surface-alt"
              role="img"
              style={{
                backgroundImage: `url(${news.image})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          ) : (
            <div className="h-28 w-28 rounded-md bg-surface-alt" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-2 text-xs text-text-secondary flex-wrap">
            <span className="rounded-full bg-surface-alt px-2 py-1 font-semibold text-text-primary">
              {news.category.toUpperCase()}
            </span>
            <span>{news.source}</span>
            <span>{publishedAt}</span>
          </div>

          <a
            className="block truncate text-base font-bold text-text-primary hover:underline"
            href={news.url}
            rel="noreferrer"
            target="_blank"
            title={news.headline}
          >
            {news.headline}
          </a>

          <p className="mt-2 truncate text-sm text-text-secondary">
            {news.summary}
          </p>
        </div>
      </article>
    </Tile>
  );
}
