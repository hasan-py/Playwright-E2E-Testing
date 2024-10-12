// import { test, expect, Page } from "@playwright/test";
// import { API_ROUTES } from "../support/constants";

// test.describe("Moderator Authentication", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto("/login");
//   });

//   const interceptCheckModerator = async (page: Page, fixtureName: string) => {
//     await page.route(API_ROUTES.CHECK_MODERATOR, async (route) => {
//       const jsonResponse = await route.fetch();
//       await jsonResponse.json();
//       route.fulfill({
//         status: 200,
//       });
//     });
//   };

//   test("should display login or create account based on user existence", async ({
//     page,
//   }) => {
//     await interceptCheckModerator(page, "moderatorExists.json");

//     // Visit the login page or trigger the action that sends the request
//     await page.goto("/login"); // Ensure the page that triggers the API call is visited

//     // Now wait for the response
//     const response = await page.waitForResponse(API_ROUTES.CHECK_MODERATOR);
//     const data = response.json();
//     const userExists = data;

//     // Expectation based on the response
//     if (!!userExists) {
//       await expect(page.locator("text=Login")).toBeVisible();
//     } else {
//       await expect(page.locator("text=Create")).toBeVisible();
//     }
//   });

//   test("should show error on login validations", async ({ page }) => {
//     await interceptCheckModerator(page, "moderatorExists.json");

//     await page.click("button");
//     await expect(page.locator("text=Invalid email address")).toBeVisible();
//     await expect(
//       page.locator("text=Password must be at least 6 characters")
//     ).toBeVisible();
//   });

//   test("should show error on create moderator validations", async ({
//     page,
//   }) => {
//     await interceptCheckModerator(page, "moderatorNotExists.json");

//     await page.click("button");
//     await expect(page.locator("text=Invalid email address")).toBeVisible();
//     await expect(
//       page.locator("text=Password must be at least 6 characters")
//     ).toBeVisible();
//     await expect(page.locator("text=Name is required")).toBeVisible();
//   });

//   test("should toggle the password visibility", async ({ page }) => {
//     await interceptCheckModerator(page, "moderatorExists.json");

//     await page.fill('input[placeholder="Password"]', "password123");
//     await page.click("#toggle-password");
//     await expect(page.locator('input[placeholder="Password"]')).toHaveAttribute(
//       "type",
//       "text"
//     );
//     await expect(page.locator('input[placeholder="Password"]')).toHaveValue(
//       "password123"
//     );
//     await page.click("#toggle-password");
//     await expect(page.locator('input[placeholder="Password"]')).toHaveAttribute(
//       "type",
//       "password"
//     );
//   });

//   test("should create an account for new users", async ({ page }) => {
//     await interceptCheckModerator(page, "moderatorNotExists.json");

//     await page.route(API_ROUTES.CREATE_MODERATOR, (route) =>
//       route.fulfill({
//         status: 200,
//         body: JSON.stringify({
//           success: true,
//           message: "Moderator created! Please login!",
//         }),
//       })
//     );

//     const response = await page.waitForResponse(API_ROUTES.CHECK_MODERATOR);
//     const data = await response.json();
//     const userExists = data.userExists;

//     if (!userExists) {
//       await expect(page.locator("text=Create Account")).toBeVisible();
//       await page.fill('input[placeholder="Name"]', "John Doe");
//       await page.fill('input[placeholder="Email"]', "john@example.com");
//       await page.fill('input[placeholder="Password"]', "password123");
//       await page.click("button");

//       const createModeratorResponse = await page.waitForResponse(
//         API_ROUTES.CREATE_MODERATOR
//       );
//       const createModeratorData = await createModeratorResponse.json();

//       expect(createModeratorData.success).toBeTruthy();
//       await expect(
//         page.locator("text=Moderator created! Please login!")
//       ).toBeVisible();
//     }
//   });

//   test("should login an existing user", async ({ page }) => {
//     await interceptCheckModerator(page, "moderatorExists.json");

//     await page.route(API_ROUTES.LOGIN, (route) =>
//       route.fulfill({
//         status: 200,
//         body: JSON.stringify({ token: "mockToken" }),
//       })
//     );

//     await page.fill('input[placeholder="Email"]', "john@example.com");
//     await page.fill('input[placeholder="Password"]', "password123");
//     await page.click("button");

//     const loginResponse = await page.waitForResponse(API_ROUTES.LOGIN);
//     const loginData = await loginResponse.json();

//     expect(loginData.token).toBe("mockToken");
//     await expect(page.locator("text=Login successfully")).toBeVisible();

//     await expect(page).toHaveURL("/admin");
//   });
// });
