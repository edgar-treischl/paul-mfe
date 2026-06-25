# Copilot Instructions for ReportMaster MFE

This is a React 19 + TypeScript micro-frontend application for data visualization and report generation within the ReportMaster ecosystem.

## Build, Test & Lint

### Installation & Development
```bash
# Install dependencies (uses yarn)
yarn install

# Start development server on localhost:5174
yarn dev

# Build for production
yarn build

# Lint code (ESLint + TypeScript)
yarn lint

# Preview production build
yarn preview
```

**Build includes TypeScript compilation**: `yarn build` runs `tsc -b` before vite build, so type errors will fail the build.

## Architecture

### Module Federation
This is a **remote micro-frontend** exposing `./PaulApp` via Module Federation (@originjs/vite-plugin-federation). 
- Entry point: `src/App.tsx` 
- Shared dependencies: React, React-DOM
- Build output includes `remoteEntry.js` for integration into host applications
- Base URL: Development = `http://localhost:5174/`, Production = `/paul-mfe/` (GitHub Pages)

### Page Structure
The app uses a **single-page router** pattern (no React Router) with three main pages managed in `App.tsx`:

```
App (main router & state manager)
├── LandingPage (initial view with CTA button)
├── GroupSelectorPage (select dataset: Ganztag, SchoolType, Audience)
└── DataViewerPage (plot viewer, data visualization, report generation)
```

**Navigation**: 
- Landing → Group Selector: `handleLoadData()`
- Group Selector → Data Viewer: `handleGroupSelected(groupId)`
- Data Viewer → Group Selector: `handleBackToGroups()`

### Data Flow
1. **Initialization**: `src/data/example_data.json` loaded at startup (mock data for development)
2. **Processing**: `dataProcessor.ts` transforms raw JSON into plot-ready format using `meta_headers.json` and `meta_sets.json`
3. **Selection**: User selects group → `loadProcessedGroupData()` retrieves plot data from `groupRegistry.ts`
4. **Visualization**: `StackedBarChart.tsx` renders chart; `ReportSection.tsx` handles report generation UI states

### Key Data Structures (see `types.ts`)
- **FormData**: User form selection (snr, audience, ganztag, stype)
- **SchoolData**: Contains plots and metadata
- **PlotDataWithMeta**: Chart data with headers and grouping information
- **AppState**: Centralized state (schoolData, selectedPlot, selectedGroup, loading states)

### Configuration
- `src/config.ts`: Centralized config (API_BASE_URL overridable via `VITE_API_BASE_URL` env var)
- `src/groupRegistry.ts`: Defines available groups and their configurations
- Authentication: Set `AUTH_ENABLED` in config to toggle login flow (documented in AUTH_CONFIG.md)

## Code Conventions

### Component Organization
- **Pages** (`src/pages/`): Top-level page components handling full-screen layouts
- **Components** (`src/components/`): Reusable UI components (cards, charts, headers, sections)
- **Utils** (`src/utils/`, `src/assets/`): Utility functions and icon/asset exports
- **Data** (`src/data/`): JSON data files (mock data, metadata)

### React Patterns
- **Functional components** with hooks (useState, useEffect)
- **TypeScript interfaces** for all props and data structures (see `types.ts` and `iqb.ts`)
- **Type-first approach**: Define interfaces before implementing components
- **Colocation**: Styles (CSS) co-located with components (e.g., `StackedBarChart.tsx` + `StackedBarChart.css`)

### Naming Conventions
- **Components**: PascalCase (e.g., `GroupCard.tsx`, `PlotList.tsx`)
- **Pages**: PascalCase with "Page" suffix (e.g., `GroupSelectorPage.tsx`, `DataViewerPage.tsx`)
- **Files**: Match export name (e.g., component `GroupCard` in `GroupCard.tsx`)
- **Handlers**: `handle*` prefix for event callbacks (e.g., `handleLoadData`, `handleGroupSelected`)
- **Selectors/Getters**: `get*` or `*Sorted` prefix for data transformation (e.g., `getGroupsSorted()`, `getAvailablePlots()`)

### State Management
- **Centralized state** in `App.tsx` using `useState`
- **State passed down** as props to child components (no context or Redux)
- **Callbacks lifted** to App for navigation and state updates
- **No async state updates** in components; data loading happens at App level

### TypeScript
- **Strict mode enabled**: All values must be typed
- **Import type syntax**: Use `import type { TypeName }` for type imports to enable tree-shaking
- **Union types for variants**: E.g., `PageType = 'landing' | 'group-selector' | 'data-viewer'`
- **Const assertions for options**: Audience/Ganztag/SchoolType defined as `as const` arrays in `types.ts`

### Styling
- **CSS Modules not used**: Global + component-scoped CSS
- **File naming**: `ComponentName.css` paired with `ComponentName.tsx`
- **CSS variables**: Not heavily used; inline colors in components for now
- **Responsive**: Mobile-first approach with media queries as needed

### ESLint & TypeScript Rules
- **Config file**: `eslint.config.js` (flat config format, ESLint v9)
- **Enabled**: ESLint recommended rules, TypeScript plugin, React Hooks plugin, React Refresh plugin
- **No auto-fix on save**: Manual linting required (`yarn lint`)
- **Type-checking**: ESLint config does NOT enable type-aware rules; rely on `tsc` for type checking

## Common Tasks

### Adding a New Component
1. Create `src/components/ComponentName.tsx` with TypeScript interface for props
2. Create `src/components/ComponentName.css` if styling needed
3. Export from component file
4. Import and use in parent component or page

### Adding a New Page
1. Create `src/pages/PageName.tsx` following page patterns in existing pages
2. Add `'page-name'` to `PageType` union in `App.tsx`
3. Add rendering logic in App's JSX (e.g., `currentPage === 'page-name' && <PageName ... />`)
4. Add navigation handlers to move between pages

### Handling State Updates
- Dispatch updates through `setState()` callback handlers in App.tsx
- Pass update functions down as props to child components
- Avoid local state in child components for data that affects sibling components

### Debugging Data Issues
- Check `dataProcessor.ts` for transformation logic
- Verify `meta_headers.json` and `meta_sets.json` structure matches expected format
- Use browser DevTools to inspect `schoolData` in AppState
- Check `groupRegistry.ts` for available group definitions

## Module Federation Integration

When consumed by a host application:
- Import: `const App = React.lazy(() => import('paul-mfe/PaulApp'))`
- The micro-frontend handles its own routing and state
- Ensure React versions align (shared dependency in federation config)
- Port 5174 reserved for local development; adjust in `vite.config.ts` if needed

## Backend Integration (TODO)

Three API endpoints need implementation in your backend:

1. **POST /api/load-data** - Load school data given form parameters
   - Expected payload: `{ snr, audience, ganztag, stype }`
   - Expected response: School metadata and available plot names

2. **POST /api/generate-report** - Generate report from selected data
   - Expected payload: Form data + selected plot ID
   - Expected response: Report ID or file URL

3. **GET /api/download-report/:id** - Download generated report
   - Expected response: PDF file

Update `dataLoader.ts` and API call sites in `App.tsx` and `ReportSection.tsx` when backend is ready.

## Environment Variables

- `VITE_API_BASE_URL`: Override API base URL (defaults to `http://localhost:8000`)
- Create `.env.local` to set during development

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main router, state manager, page rendering |
| `src/pages/` | Full-page components (LandingPage, GroupSelectorPage, DataViewerPage) |
| `src/components/` | Reusable UI components (GroupCard, PlotList, StackedBarChart, etc.) |
| `src/types.ts` | TypeScript interfaces (FormData, SchoolData, AppState, etc.) |
| `src/dataProcessor.ts` | Transforms raw JSON data into visualization format |
| `src/dataLoader.ts` | Loads and processes group data (mock for now) |
| `src/groupRegistry.ts` | Defines available group configurations |
| `src/config.ts` | App-wide configuration (API URL, auth settings) |
| `src/iqb.ts` | IQB-specific data structures (ChartGroup, etc.) |
| `vite.config.ts` | Vite config + Module Federation setup |
| `eslint.config.js` | ESLint rules (flat config) |
