# generate-version-info

[![npm version](https://badge.fury.io/js/generate-version-info.svg)](https://www.npmjs.com/package/generate-version-info)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A CLI tool and Node.js library for generating version information files with git information and build details.

## 🚀 What it does

`generate-version-info` creates a `version.json` file containing:

- **Application version** (from package.json)
- **Git metadata** (short SHA, commit date)
- **Build timestamp** (when the version file was generated)

Perfect for deployment pipelines, monitoring, and debugging in production environments.

## 📦 Installation

### Global installation (recommended for CLI usage)
```bash
npm install -g generate-version-info
```

### Project dependency
```bash
npm install generate-version-info
```

## 🎯 Usage

### CLI Usage

```bash
# Generate version.json in current directory
generate-version-info
```

### Programmatic Usage

```javascript
import { generateVersion } from 'generate-version-info';

// Generate version.json in current directory
await generateVersion();
```

## 📄 Output Example

```json
{
  "appVersion": "1.2.3",
  "gitShortSha": "a1b2c3d",
  "buildDate": "2026-03-12T17:46:54.164Z",
  "releaseDate": "2026-03-12T15:11:59.000Z"
}
```

## 🔧 Configuration

The tool generates version information by reading your project's `package.json` and git metadata. No additional configuration is required.

## ⚙️ API Reference

### `generateVersion()`

Generates a `version.json` file in the current directory using the local `package.json` and git metadata.

**Parameters:** None

**Returns:** Promise<VersionInfo>

## 🧪 Testing

### Test the CLI locally

1. **Clone and build:**
   ```bash
   git clone https://github.com/MarceloBuenoMartinez/generate-version-info.git
   cd generate-version-info
   pnpm install
   pnpm build
   ```

2. **Test the CLI:**
   ```bash
   # Test version generation
   node dist/bin/cli.js
   cat version.json
   ```

3. **Test programmatically:**
   ```bash
   node -e "
   const { generateVersion } = require('./dist/src/index.js');
   generateVersion().then(result => 
     console.log('Generated:', result)
   );
   "
   ```

### Integration Testing

**Test in your project:**
```bash
# Install globally and test
npm install -g generate-version-info
cd /path/to/your/project
generate-version-info
```

**Expected behavior:**
- ✅ Creates `version.json` in current directory
- ✅ Includes all 4 fields (appVersion, gitShortSha, buildDate, releaseDate)
- ✅ Works in any project with a package.json
- ✅ Consistent output format

## 📁 File Structure

```
generate-version-info/
├── bin/cli.ts          # CLI entry point
├── src/index.ts        # Main library code
├── dist/               # Compiled JavaScript
└── version.json        # Generated output (when testing)
```

## 🔄 Development Workflow

```bash
# Install dependencies
pnpm install

# Development mode
pnpm dev

# Build TypeScript
pnpm build

# Clean build artifacts  
pnpm clean

# Test locally
node dist/bin/cli.js
```

## 📝 Common Use Cases

- **CI/CD pipelines**: Add version info to build artifacts
- **Deployment tracking**: Know exactly what version is deployed
- **Debugging**: Correlate issues with specific builds/commits
- **Monitoring**: Display version info in health check endpoints
- **Documentation**: Embed version details in generated docs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test: `pnpm build && node dist/bin/cli.js`
4. Commit: `git commit -m "feat: add amazing feature"`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [npm package](https://www.npmjs.com/package/generate-version-info)
- [GitHub repository](https://github.com/MarceloBuenoMartinez/generate-version-info)
- [Issues & Feature requests](https://github.com/MarceloBuenoMartinez/generate-version-info/issues)
