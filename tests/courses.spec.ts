import { expect, test, type Page } from "@playwright/test";

const amc8 = "/courses/amc-8/permutations-definition";
const amc8Mid = "/courses/amc-8/factorials";
const amc1012 =
  "/courses/amc-10-12/polynomial-roots-and-symmetric-relationships";

async function openLesson(page: Page, url = amc8) {
  const response = await page.goto(url, { waitUntil: "domcontentloaded" });
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { name: "What you will learn" }),
  ).toBeVisible();
  await expect(page.locator(".course-acknowledge input").first()).toBeEnabled();
}

test("catalog, module order, course routes, and navigation are accessible", async ({
  page,
}, testInfo) => {
  await page.goto("/courses", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".course-card")).toHaveCount(2);
  await expect(
    page.getByRole("heading", { name: "AMC 8 Preparation", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "AMC 10/12 Preparation", exact: true }),
  ).toBeVisible();
  await page
    .locator(".course-card")
    .first()
    .getByRole("link", { name: "Explore course" })
    .click();
  await expect(page).toHaveURL(/\/courses\/amc-8$/);
  await expect(page.locator(".course-module")).toHaveCount(30);
  await expect(page.locator(".course-lesson-row")).toHaveCount(98);
  await expect(
    page.getByRole("heading", { name: "65 hr 20 min · 98 lessons" }),
  ).toBeVisible();
  await page
    .locator(".course-lesson-row")
    .filter({ hasText: "Factorials" })
    .click();
  await expect(page).toHaveURL(new RegExp(`${amc8Mid}$`));
  await expect(
    page.getByRole("navigation", { name: "Lesson contents" }),
  ).toBeVisible();
  const adjacent = page.getByRole("navigation", { name: "Lesson navigation" });
  await expect(adjacent.getByRole("link").first()).toHaveAttribute(
    "href",
    "/courses/amc-8/permutations-definition",
  );
  await expect(adjacent.getByRole("link").last()).toHaveAttribute(
    "href",
    "/courses/amc-8/permutations-fundamentals",
  );
  await page.goto("/courses/amc-10-12", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByText(/Shared lessons: 0 \/ \d+ complete/),
  ).toBeVisible();
  await expect(
    page.getByText(/AMC 12 extensions: 0 \/ \d+ complete/),
  ).toBeVisible();
  if (testInfo.project.name === "mobile") {
    const mobileNav = page.getByRole("navigation", {
      name: "Platform (mobile)",
    });
    await expect(mobileNav.getByRole("link")).toHaveCount(7);
    await mobileNav
      .getByRole("link", { name: "AI Coach" })
      .scrollIntoViewIfNeeded();
    await expect(
      mobileNav.getByRole("link", { name: "AI Coach" }),
    ).toBeVisible();
  }
});

test("hints are deliberate, fractions grade correctly, and practice state persists", async ({
  page,
}) => {
  await openLesson(page);
  const example = page.locator(".course-example").first();
  await expect(example.locator(".course-solution-steps li")).toHaveCount(1);
  await example.getByRole("button", { name: /Reveal step 2/ }).click();
  await expect(example.locator(".course-solution-steps li")).toHaveCount(2);
  const first = page.locator(".course-exercise").nth(0);
  await expect(first.locator(".course-hints")).toHaveCount(0);
  await expect(first.locator(".course-answer")).toHaveCount(0);
  await expect(
    first.getByRole("button", { name: "Check answer" }),
  ).toBeDisabled();
  await first.getByLabel("Your answer").fill("1/0");
  await first.getByRole("button", { name: "Check answer" }).click();
  await expect(
    first.getByText(/A fraction’s denominator must be nonzero/),
  ).toBeVisible();
  await first.getByRole("button", { name: "Hint 1 of 3" }).click();
  await expect(first.locator(".course-hints > div")).toHaveCount(1);
  await first.getByLabel("Your answer").fill("23");
  await first.getByRole("button", { name: "Check answer" }).click();
  await expect(first.getByText(/Try again/)).toBeVisible();
  await first.getByLabel("Your answer").fill("24");
  await first.getByRole("button", { name: "Check answer" }).click();
  await expect(
    first.getByText("Correct. You have solved this problem."),
  ).toBeVisible();
  const rational = page.locator(".course-exercise").nth(1);
  await rational.getByLabel("Your answer").fill("12");
  await rational.getByRole("button", { name: "Check answer" }).click();
  await expect(
    rational.getByText("Correct. You have solved this problem."),
  ).toBeVisible();
  const multipleChoice = page.locator(".course-exercise").nth(4);
  await multipleChoice.getByRole("radio").nth(1).check();
  await multipleChoice.getByRole("button", { name: "Check answer" }).click();
  await expect(
    multipleChoice.getByText("Correct. You have solved this problem."),
  ).toBeVisible();
  const reveal = page.locator(".course-exercise").nth(2);
  await reveal
    .getByRole("button", { name: "Reveal answer", exact: true })
    .click();
  await expect(reveal.locator(".course-answer")).toContainText("120");
  await expect(reveal.locator(".course-full-solution")).toHaveCount(0);
  await expect(reveal.getByLabel("Your answer")).toBeDisabled();
  await reveal.getByRole("button", { name: "Read full solution" }).click();
  await reveal
    .getByLabel("I have worked through and understood the solution")
    .check();
  await expect(
    page.getByRole("button", { name: "Complete lesson", exact: true }),
  ).toBeDisabled();
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(first.getByLabel("Your answer")).toHaveValue("24");
  await expect(rational.getByLabel("Your answer")).toHaveValue("12");
  await expect(first.locator(".course-hints > div")).toHaveCount(1);
  await expect(example.locator(".course-solution-steps li")).toHaveCount(2);
  await expect(
    reveal.getByLabel("I have worked through and understood the solution"),
  ).toBeChecked();
});

test("review completion requires all sections, examples, and problems and saves once", async ({
  page,
}) => {
  await openLesson(page);
  const complete = page.getByRole("button", {
    name: "Complete lesson",
    exact: true,
  });
  await expect(complete).toBeDisabled();
  for (const checkbox of await page
    .locator(".course-reading-section > .course-acknowledge input")
    .all())
    await checkbox.check();
  for (const example of await page.locator(".course-example").all()) {
    const reveal = example.getByRole("button", { name: /Reveal step/ });
    while (await reveal.count()) await reveal.click();
    await expect(example.locator(".course-example-takeaway")).toBeVisible();
  }
  await expect(complete).toBeDisabled();
  for (const problem of await page.locator(".course-exercise").all()) {
    await problem.getByRole("button", { name: "Read full solution" }).click();
    await problem
      .getByLabel("I have worked through and understood the solution")
      .check();
  }
  await expect(complete).toBeEnabled();
  await complete.click();
  await expect(
    page.getByRole("heading", { name: "Lesson complete.", exact: true }),
  ).toBeVisible();
  const savedXP = await page.evaluate(
    () => JSON.parse(localStorage.getItem("lucid-progress-v1") ?? "{}").xp,
  );
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("heading", { name: "Lesson complete.", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Complete lesson", exact: true }),
  ).toHaveCount(0);
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("lucid-progress-v1") ?? "{}").xp,
    ),
  ).toBe(savedXP);
  await page.goto("/courses/amc-8", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByText("1 / 98 lessons complete", { exact: true }),
  ).toBeVisible();
});

test("AMC 10/12 pilot renders mathematics, examples, and solutions without errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await openLesson(page, amc1012);
  await expect(
    page.locator(".course-lesson-head").getByText("AMC 10", { exact: true }),
  ).toBeVisible();
  await expect(
    page.locator(".course-lesson-head").getByText("AMC 12", { exact: true }),
  ).toBeVisible();
  await expect(page.locator(".course-example")).toHaveCount(3);
  await expect(page.locator(".course-exercise")).toHaveCount(6);
  expect(await page.locator(".katex").count()).toBeGreaterThan(30);
  const example = page.locator(".course-example").first();
  const reveal = example.getByRole("button", { name: /Reveal step/ });
  while (await reveal.count()) await reveal.click();
  await expect(example.locator(".course-example-takeaway")).toBeVisible();
  const problem = page.locator(".course-exercise").last();
  await problem.getByRole("radio").nth(1).check();
  await problem.getByRole("button", { name: "Check answer" }).click();
  await expect(
    problem.getByText("Correct. You have solved this problem."),
  ).toBeVisible();
  await problem.getByRole("button", { name: "Read full solution" }).click();
  await expect(problem.locator(".course-full-solution li")).toHaveCount(3);
  await expect(page.locator(".katex-error")).toHaveCount(0);
  expect(errors).toEqual([]);
  const widths = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  expect(widths.document).toBeLessThanOrEqual(widths.viewport);
});

test("invalid course URLs have a useful recovery route", async ({ page }) => {
  for (const url of ["/courses/not-a-course", "/courses/amc-8/not-a-lesson"]) {
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("heading", { name: "Let’s find your next lesson." }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Explore courses", exact: true }),
    ).toHaveAttribute("href", "/courses");
  }
});

test("legacy worked examples remain available and reveal steps", async ({
  page,
}) => {
  await page.goto("/lesson/ratios-proportional-reasoning", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Ratios");
  for (
    let step = 0;
    step < 5 && !(await page.locator(".lp-example").count());
    step += 1
  ) {
    await page.getByRole("button", { name: "Continue", exact: true }).click();
  }
  const example = page.locator(".lp-example").first();
  await expect(example).toBeVisible();
  await expect(example.locator(".lp-steps li")).toHaveCount(1);
  await example.getByRole("button", { name: /Reveal step 2/ }).click();
  await expect(example.locator(".lp-steps li")).toHaveCount(2);
});
