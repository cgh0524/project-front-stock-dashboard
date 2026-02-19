import { NEWS_CATEGORIES, type NewsCategory } from "@/entities/news";

type NewsCategoryActionsProps = {
  selectedCategory: NewsCategory;
  onSelectCategory: (category: NewsCategory) => void;
};

const toCategoryLabel = (category: NewsCategory) =>
  category.charAt(0).toUpperCase() + category.slice(1);

export function NewsCategoryActions({
  selectedCategory,
  onSelectCategory,
}: NewsCategoryActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {NEWS_CATEGORIES.map((category) => {
        const isSelected = selectedCategory === category;
        return (
          <button
            key={category}
            className={`rounded-md border px-3 py-1 text-sm font-semibold transition-colors ${
              isSelected
                ? "border-positive bg-positive-subtle text-positive"
                : "border-border-default text-text-secondary hover:bg-surface-alt"
            }`}
            type="button"
            onClick={() => onSelectCategory(category)}
          >
            {toCategoryLabel(category)}
          </button>
        );
      })}
    </div>
  );
}
