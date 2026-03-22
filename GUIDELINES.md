### Coding Guidelines & Best Practices

This document lists the coding standards and best practices established for this project.

#### React Components

- **Single Root Return**: When a component returns a single root element, omit the parentheses and place the opening tag
  on the same line as the `return` keyword.
  ```tsx
  // ✅ Preferred
  return <div>
      ...
  </div>;

  // ❌ Avoid
  return (
      <div>
          ...
      </div>
  );
  ```
- **Component Separation**: Extracted complex logic into custom hooks (e.g., `useMenuModal.ts`) and sub-components (
  e.g., `MenuIcon.tsx`).
- **Client Components**: Use `'use client';` directive only when necessary (interactivity, hooks).

#### Formatting & Style

- **Indentation**: Use **Tabs** for all indentation.
- **Tailwind CSS**: Use Tailwind utility classes for styling. Use `em` units for responsive spacing, font sizes, and
  rounding to maintain proportions (e.g., `p-[1em]`, `rounded-[1.5em]`).
- **Long Lines**: Use `// noinspection LongLine` to suppress linting warnings on intentionally long lines (e.g., complex
  Tailwind classes).

#### Accessibility (A11y)

- **Keyboard Navigation**: Ensure all interactive elements are reachable and usable via keyboard.
- **Focus Management**: Implement focus trapping in modals and dialogs.
- **ARIA**: Use appropriate ARIA roles and labels (e.g., `role="dialog"`, `aria-modal="true"`, `aria-labelledby`).
- **Semantic HTML**: Use semantic tags like `<main>`, `<header>`, `<footer>`, `<h1-h6>`, etc.

#### Project Structure

- **Component Folders**: Organize components into feature-based directories (e.g., `app/components/Menu/`).
- **Data Co-location**: Place component-specific data files (e.g., `menu-data.ts`) within the same directory as the
  component.

#### Performance & Security

- **Dynamic Imports**: Use `next/dynamic` for heavy client-side components to improve initial load time.
- **Security Headers**: Implement strict CSP, Trusted Types, and other security headers where possible.
