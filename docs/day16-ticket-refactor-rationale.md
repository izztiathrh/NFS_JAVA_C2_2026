# Day 16 Ticket Refactor Rationale

## Files changed
- [frontend/asset-tracker-ui/src/components/AssetFormWizard.jsx](frontend/asset-tracker-ui/src/components/AssetFormWizard.jsx)
- [frontend/asset-tracker-ui/src/utils/assetFormValidation.js](frontend/asset-tracker-ui/src/utils/assetFormValidation.js)
- [frontend/asset-tracker-ui/src/utils/assetFormValidation.test.js](frontend/asset-tracker-ui/src/utils/assetFormValidation.test.js)

## Behaviour preserved
- The UI layout and CSS class names remain unchanged.
- The same form fields and labels are still shown to the user.
- The wizard still advances through the same three steps.
- The submit payload still uses the same field names and values.
- The existing route paths and component wiring were not altered.

## Logic extracted
- The step-by-step validation rules were moved out of the component and into a dedicated utility.
- Validation for step 1, step 2, and the review checkbox now lives in one reusable place.
- The component now delegates validation to the utility while keeping the same user experience.

## Why the new version is easier to maintain
- Validation rules are now easier to find and update in one file.
- The component is slimmer and focuses on rendering and form state.
- Unit tests can target the validation logic directly without exercising the whole wizard UI.

## Tests or HTTP requests run
- Ran the frontend test suite with `npm test` in the asset tracker UI project.
- Result: 5 test files passed and 12 tests passed.
- The tests that proved the refactor preserved behaviour were:
  - the existing wizard component tests covering empty-field validation and successful form submission
  - the new utility tests covering step 1 validation, step 2 validation, and review-step validation

## Risks that still remain
- Manual UI verification is still useful for confirming inline error placement and timing during step navigation.
- The review-step checkbox behavior should be checked in the browser to ensure the same interaction remains smooth for users.
- If future validation rules expand, the utility may need additional structure to keep the logic readable.
