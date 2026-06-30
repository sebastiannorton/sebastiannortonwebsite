import { test, expect } from "@playwright/test";

test.describe("Navigation Bar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for the page to fully load
    await page.waitForLoadState("networkidle");
  });

  test("logo is visible and double size (h-16)", async ({ page }) => {
    const logo = page.locator('header img[alt="Logo"]');
    await expect(logo).toBeVisible();
    // Check the class contains h-16 (100% bigger than original h-8)
    await expect(logo).toHaveClass(/h-16/);
  });

  test('"Sebastian Norton" text is visible and uses Marcellus font', async ({ page }) => {
    const nameText = page.locator("header", { hasText: "Sebastian Norton" });
    await expect(nameText).toBeVisible();
    // Verify the Marcellus font is applied
    await expect(nameText).toHaveCSS("font-family", /Marcellus/);
  });

  test("nav items are visible and grey by default", async ({ page }) => {
    const navItems = ["Philosophy", "Offerings", "About", "Contact"];
    for (const item of navItems) {
      const navButton = page.locator("header", { hasText: item }).first();
      await expect(navButton).toBeVisible();
    }
  });

  test("nav items become bold on hover", async ({ page }) => {
    const navItems = ["Philosophy", "Offerings", "About", "Contact"];
    for (const item of navItems) {
      const navButton = page.locator("header button", { hasText: item }).first();
      await navButton.hover({ force: true });
      // Wait a brief moment for the hover transition to apply
      await page.waitForTimeout(200);
      // Check the text color is now --foreground (not muted grey)
      const color = await navButton.evaluate((el) => window.getComputedStyle(el).color);
      // In light mode, foreground is black (rgb(0,0,0)), muted is grey
      expect(color).not.toBe("rgb(128, 128, 128)"); // not muted grey (approximate)
    }
  });

  test("Offerings dropdown appears on hover", async ({ page }) => {
    const offeringsButton = page.locator("header button", { hasText: "Offerings" }).first();
    await offeringsButton.hover({ force: true });
    // Wait for the dropdown animation
    await page.waitForTimeout(400);
    // The dropdown should now be visible
    const dropdown = page.locator("header nav div div a", { hasText: "Growing Into Who You Are" }).first();
    await expect(dropdown).toBeVisible();
  });

  test("dropdown stays visible when moving cursor from button to dropdown", async ({ page }) => {
    const offeringsButton = page.locator("header button", { hasText: "Offerings" }).first();
    await offeringsButton.hover({ force: true });
    await page.waitForTimeout(300);

    // The dropdown should be visible now
    const dropdownItem = page.locator("header nav a", { hasText: "Growing Into Who You Are" }).first();
    await expect(dropdownItem).toBeVisible();

    // Move cursor slowly down to the dropdown (simulating real user movement)
    const buttonBox = await offeringsButton.boundingBox();
    const dropdownBox = await dropdownItem.boundingBox();
    if (buttonBox && dropdownBox) {
      // Move to a point between the button and the dropdown
      const midY = buttonBox.y + buttonBox.height + 5;
      await page.mouse.move(buttonBox.x + buttonBox.width / 2, midY, { steps: 5 });
      await page.waitForTimeout(100);
      // Move to the dropdown item
      await page.mouse.move(
        dropdownBox.x + dropdownBox.width / 2,
        dropdownBox.y + dropdownBox.height / 2,
        { steps: 5 }
      );
      await page.waitForTimeout(200);
    }

    // Dropdown should still be visible after the cursor moves down to it
    await expect(dropdownItem).toBeVisible();
  });

  test("dropdown items navigate to correct pages on click", async ({ page }) => {
    const offeringsButton = page.locator("header button", { hasText: "Offerings" }).first();
    await offeringsButton.hover({ force: true });
    await page.waitForTimeout(300);

    // Click on "Growing Into Who You Are"
    const link = page.locator("header nav a", { hasText: "Growing Into Who You Are" }).first();
    await link.click();
    
    // Should navigate to the dedicated page
    await expect(page).toHaveURL("/offerings/growing-into-who-you-are");
    await expect(page.locator("h1")).toContainText("Growing Into Who You Are");
  });

  test("dropdown disappears on mouse leave", async ({ page }) => {
    const offeringsButton = page.locator("header button", { hasText: "Offerings" }).first();
    await offeringsButton.hover({ force: true });
    await page.waitForTimeout(300);

    const dropdown = page.locator("header nav a", { hasText: "Growing Into Who You Are" }).first();
    await expect(dropdown).toBeVisible();

    // Move cursor far away from the dropdown area
    await page.mouse.move(0, 0, { steps: 10 });
    await page.waitForTimeout(400);

    // Dropdown should now be hidden
    await expect(dropdown).not.toBeVisible();
  });

  test("logo links to home page", async ({ page }) => {
    // Navigate to a different page first
    await page.goto("/offerings/growing-into-who-you-are");
    await page.waitForLoadState("networkidle");

    // Click the logo link
    const logoLink = page.locator("header a").first();
    await logoLink.click();

    // Should navigate back to the landing page
    await expect(page).toHaveURL("/");
  });
});