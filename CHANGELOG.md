# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.2] - 2026-03-12

### Added
- Comprehensive README with usage examples and testing instructions
- Professional changelog following Keep a Changelog format

### Changed
- **BREAKING**: Simplified API - `generateVersion()` now takes no parameters
- **BREAKING**: CLI requires no arguments - simply run `generate-version-info`
- **BREAKING**: Simplified output - only 4 fields: `appVersion`, `gitShortSha`, `buildDate`, `releaseDate`
- Removed all environment detection and configuration complexity

### Removed
- Environment type detection (`envType`, `envName` fields)
- Configuration system and `VersionConfig` interface
- All command line arguments and function parameters

## [0.0.1] - 2026-03-12

### Added
- Initial release of generate-version-info CLI tool
- Support for generating version.json files with environment metadata
- Environment type detection (regular, feature, personal)
- Git integration for SHA and commit date information
- Build timestamp generation
- CLI interface with environment name parameter
- Programmatic API for Node.js projects
- TypeScript support with full type definitions
- Configuration system for environment classification

### Features
- **CLI Tool**: Global installation with `generate-version-info` command
- **Environment Detection**: Automatic classification of environment types
- **Git Integration**: Extracts commit SHA and date information
- **Flexible Output**: Configurable output paths and package.json locations
- **TypeScript**: Full TypeScript support with declarations

### Supported Fields
- `envType`: Environment classification (regular/feature/personal)
- `envName`: User-provided environment name
- `appVersion`: Version from package.json
- `gitShortSha`: Short Git commit SHA (7 characters)
- `buildDate`: ISO timestamp when version file was generated
- `releaseDate`: ISO timestamp of Git commit (regular environments only in v0.0.1)

[0.0.2]: https://github.com/MarceloBuenoMartinez/generate-version-info/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/MarceloBuenoMartinez/generate-version-info/releases/tag/v0.0.1