# Bike Marketplace App

This is a responsive bike marketplace application built with **React**, **Redux Toolkit**, **Firebase**, and **Sass**. It allows users to filter and browse bikes based on various criteria such as category, retailer, location, and price. The project is styled using **SCSS modules**, global CSS variables, and MUI components. Data is persisted across sessions using **localStorage**.

## Tech Stack

* React 19
* Redux Toolkit 2
* Firebase (data source)
* SCSS Modules with BEM
* Material UI (MUI) v7
* Emotion Styled & Emotion React
* React Redux 9
* rc-slider & react-range for sliders
* react-icons for UI icons
* react-spinners for loading UI
* normalize.css for browser consistency

## Features

* Responsive design (mobile, tablet, desktop)
* Lazy loading of the main page using `React.lazy` and `Suspense`
* Filters by:

  * Category
  * Retailer
  * Location
  * Price Range (Histogram + Slider)
  * Only New Bikes (added within last 14 days)
  * Sort by Price

* Filters can be used independently or in combination
* Reset Filters button with animated icon
* Dark/Light Theme Toggle via context
* Dynamic SCSS styling based on theme mode using CSS variables
* Firebase-hosted bike data
* Filtering logic centralized using reusable selectors
* Filtered data paginated with remembered page number and count via `useLocalStorage`
* When filters are reset, local storage is cleared and filters are reset in Redux
* Pagination auto-adjusts to valid page if filters reduce visible items
* MUI-based components customized for theme, histogram and slider.

## Styling

* Uses **SCSS modules** for component isolation
* Global styles and design tokens defined in `_variables.scss`, `_mixins.scss`, and `_globals.scss`
* Mixins for text, button, layout and media queries help ensure consistency
* All blocks/components are styled within their folders to avoid conflicts
* Theme color tokens implemented via CSS custom properties (`:root` and `.dark-theme`)

## State Management

* Redux slices:

  * `bikesSlice` — fetching bikes from Firebase
  * `filtersSlice` — handling filters (retailer, category, location, sorting, newest)
  * `priceSliderSlice` — min-max range for price slider

* Selectors:

  * `selectFilteredBikes` combines all logic in a pipeline: price -> retailer -> category -> date -> location
  * `createSelector` is used throughout for memoized filtering

## Hooks and Contexts

* `useLocalStorage` — persists pagination and filters (items per page, range, etc.)
* `resetFilterStorage` - reset local storage for filters
* `usePagination` — manages current page, items per page, and page transitions
* `ThemeContext` — tracks theme and syncs it with `document.body`

## Additional Notes

* Filtering is flexible and modular — you can easily add or remove filters
* Some styling files can have styles for few components of same block
* Filter files include local SCSS logic per block
* Loader has its own global spinner styles
* The price slider limits prevent overlap (right < left and vice versa)
* If filtered result has fewer pages than current one, pagination resets to first

## Installation

```bash
npm install
npm start
```

---

This project is a demonstration of modular UI, reusable Redux logic, responsive and theme-aware design, and scalable filter architecture.
