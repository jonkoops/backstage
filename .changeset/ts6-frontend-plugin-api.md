---
'@backstage/frontend-plugin-api': patch
---

Replaced the type-level quicksort in `MakeSortedExtensionsMap` with a simpler mapped type to fix excessive type instantiation depth with TypeScript 6.0. The `MakeSortedExtensionsMap` and `ResolveExtensionId` types are now exported from the package.
