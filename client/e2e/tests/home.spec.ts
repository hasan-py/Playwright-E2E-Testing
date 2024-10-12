import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("page rendered successfully", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator("text=Find your next captivating gaming moment")
    ).toBeVisible();
  });

  test("Game List: should display game cards with images, titles, and review counts", async ({
    page,
  }) => {
    await page.goto("/");

    // Check that the grid exists
    await expect(page.locator(".grid")).toBeVisible();

    const gameCards = page.locator(".grid .col-span-1");
    const cardCount = await gameCards.count(); // Get the number of game cards

    // Check if the count is greater than 1
    expect(cardCount).toBeGreaterThan(1);

    // Check the first game card
    const firstGameCard = gameCards.first();
    await expect(firstGameCard.locator("img")).toHaveAttribute(
      "src",
      /thumbnail\.jpg/
    );
    await expect(firstGameCard.locator("img")).toHaveAttribute(
      "alt",
      /Game Image/
    );

    // Check game card details
    await expect(firstGameCard.locator("p.text-lg")).toBeVisible();
    await expect(firstGameCard.locator("p.text-lg")).not.toBeEmpty();

    await expect(firstGameCard.locator("p.text-sm")).toBeVisible();
    await expect(firstGameCard.locator("p.text-sm")).not.toBeEmpty();

    await expect(firstGameCard.locator("p.text-xs")).toContainText("Reviews");
  });
});
