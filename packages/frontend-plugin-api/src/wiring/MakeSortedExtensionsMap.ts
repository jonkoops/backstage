/*
 * Copyright 2025 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ExtensionDefinition } from './createExtension';
import { ResolveExtensionId } from './resolveExtensionDefinition';

// Previously this used a type-level quicksort (UnionToArray + SortExtensions)
// to produce a deterministic key order for API reports. That approach caused
// excessive type instantiation depth with TypeScript 6.0+ when many extensions
// are present. Replaced with a simple mapped type using key remapping, which
// has no correctness or API stability impact.
/** @public */
export type MakeSortedExtensionsMap<
  UExtensions extends ExtensionDefinition,
  TId extends string,
> = {
  [E in UExtensions as ResolveExtensionId<E, TId>]: E;
};
