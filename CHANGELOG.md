# Changelog

## Unreleased

## 1.0.2 - 2026-04-15

### Release Alignment

- Updated compatibility to Foundry VTT v13-14 (minimum: 13, verified: 14).
- Adjusted validation to target the v14 verified compatibility path.
- Prepared the new release artifact and removed stale zip packaging.

## 1.0.1 - 2026-03-31

### Fixed

- Corrected the manifest for a free release with GitHub release asset URLs.
- Corrected Foundry compatibility to v13, which matches the ApplicationV2 picker implementation.
- Replaced the brittle v13 render hook path with a generic ApplicationV2 render hook filter.
- Reworked header button injection to refresh the button state instead of leaving stale markup behind.
- Added permission feedback when a user cannot execute the assigned macro.
- Passed active token context into macro execution when available.
- Removed stray `desktop.ini` noise from the repository.

### Changed

- Cleaned and shortened the README.
- Added a local validation script and package metadata for release checks.
- Standardized module naming to `RNK™ Macro Button` in release-facing metadata.

## 1.0.0 - 2026-03-01

### Added

- Initial release of `RNK™ Macro Button`.
- Actor-sheet macro button injection.
- Per-actor macro assignment storage.
- Macro picker dialog for assignment changes.
